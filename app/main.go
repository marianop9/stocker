package main

import (
	"log"
	"os"
	"strings"

	_ "github.com/marianop9/stocker/app/migrations"
	"github.com/marianop9/stocker/app/stocker"
	"github.com/marianop9/stocker/app/stocker/products"
	"github.com/pocketbase/pocketbase"
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
	products.RegisterProductUnits(stocker)

	stocker.RegisterCustomHandlers()

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
