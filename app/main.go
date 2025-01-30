package main

import (
	"log"

	_ "github.com/marianop9/stocker/app/migrations"
	"github.com/marianop9/stocker/app/stocker"
	"github.com/marianop9/stocker/app/stocker/movements"
	"github.com/marianop9/stocker/app/stocker/products"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
	app := pocketbase.New()

	// loosely check if it was executed using "go run"
	// isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		// enable auto creation of migration files when making collection changes in the Admin UI
		// (the isGoRun check is to enable it only during development)
		Automigrate: false,
	})

	stocker := stocker.NewStockerApp(app)
	products.RegisterProductUnitsHandlers(stocker)
	movements.RegisterMovementsHandlers(stocker)

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

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
