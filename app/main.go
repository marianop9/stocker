package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"os"
	"slices"
	"strings"

	_ "github.com/marianop9/stocker/app/migrations"
	"github.com/marianop9/stocker/app/stocker"
	"github.com/marianop9/stocker/app/stocker/movements"
	"github.com/marianop9/stocker/app/stocker/products"
	"github.com/marianop9/stocker/app/stocker/spreadsheets"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
	app := pocketbase.New()

	// loosely check if it was executed using "go run"
	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		// enable auto creation of migration files when making collection changes in the Admin UI
		// (the isGoRun check is to enable it only during development)
		Automigrate: isGoRun,
	})

	stocker := stocker.NewStockerApp(app)
	products.RegisterProductUnitsHandlers(stocker)
	movements.RegisterMovementsHandlers(stocker)
	spreadsheets.RegisterSpreadsheetsHandlers(stocker)

	stocker.AddCustomHandler(
		"error",
		"",
		"GET",
		func(e *core.RequestEvent) error { return e.InternalServerError("error endpoint response", nil) },
	)

	stocker.RegisterCustomHandlers()

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		// serves static files from the provided public dir (if exists)
		// if requested file is not found, falls back to index.html
		se.Router.GET("/{path...}", apis.Static(os.DirFS("./pb_public/dist"), true))

		return se.Next()
	})

	app.OnServe().BindFunc(func(e *core.ServeEvent) error {
		f, err := os.Open("stocker-users.json")
		if err != nil {
			if !errors.Is(err, os.ErrNotExist) {
				e.App.Logger().Error("failed to retrieve users file", "error", err)
			}

			return e.Next()
		}

		var data struct {
			Superusers []userType `json:"superusers"`
			Users      []userType `json:"users"`
		}

		if err := json.NewDecoder(f).Decode(&data); err != nil {
			e.App.Logger().Error("failed to decode users file", "error", err)
			return e.Next()
		}

		if len(data.Superusers) > 0 {
			if err := createUsersIfNotExist(e.App, "_superusers", data.Superusers); err != nil {
				e.App.Logger().Error("failed to create superusers", "error", err)
				return e.Next()
			}
		}
		
		if len(data.Users) > 0 {
			if err := createUsersIfNotExist(e.App, "users", data.Users); err != nil {
				e.App.Logger().Error("failed to create users", "error", err)
				return e.Next()
			}
		}

		return e.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

func getEmails(recs []*core.Record) []string {
	existingEmails := make([]string, len(recs))

	for i := range recs {
		existingEmails[i] = recs[i].Email()
	}

	return existingEmails
}

type userType struct {
	Email    string `json:"email"`
	Password string `json:"password"`
    // only for regular users:
	Username string `json:"username"`
}

func createUsersIfNotExist(app core.App, collectionName string, users []userType) error {
	userEmails := make([]interface{}, 0, len(users))
	for _, u := range users {
		userEmails = append(userEmails, u.Email)
	}

	userRecords, err := app.FindAllRecords(collectionName, dbx.In("email", userEmails...))
	if err != nil {
		return fmt.Errorf("failed to query users: %w", err)
	}

	if len(userRecords) < len(users) {
		existingEmails := getEmails(userRecords)

		collection, err := app.FindCollectionByNameOrId(collectionName)
		if err != nil {
			return fmt.Errorf("failed to retrieve collection: %w", err)
		}

		numCreated := 0
		for _, u := range users {
			if !slices.Contains(existingEmails, u.Email) {
				// new := core.NewRecord(collection)
				new := core.NewRecord(collection)
				new.SetEmail(u.Email)
				new.SetPassword(u.Password)
				new.SetVerified(true)

				if collection.Fields.GetByName("username") != nil {
					new.Set("username", u.Username)
				}
				
				if err := app.Save(new); err != nil {
					return fmt.Errorf("failed to create superuser: %w", err)
				}
				numCreated++
			}
		}

		app.Logger().Info(fmt.Sprintf("added %d records to %s", numCreated, collectionName))
	}

	return nil
}
