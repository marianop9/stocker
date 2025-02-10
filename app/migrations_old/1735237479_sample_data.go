package migrations

import (
	"database/sql"
	"fmt"

	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		// add up queries...
		type IdResult struct {
			Id string `db:"id"`
		}

		catIdName := IdResult{}
		err := app.DB().NewQuery(`SELECT id FROM categories WHERE name = 'Sample Category'`).One(&catIdName)
		if err == sql.ErrNoRows {
			if _, err := app.DB().NewQuery(`INSERT INTO categories (id, name, code) VALUES ('sampleCategory1', 'Sample Category', '033')`).Execute(); err != nil {
				return err
			}
			catIdName.Id = "sampleCategory1"
		} else if err != nil {
			return err
		}

		providerIdName := IdResult{}
		err = app.DB().NewQuery(`SELECT id FROM providers WHERE name = 'Sample Provider'`).One(&providerIdName)
		if err == sql.ErrNoRows {
			if _, err := app.DB().NewQuery(`INSERT INTO providers (id, name, code) VALUES ('sampleProvider1', 'Sample Provider', '033')`).Execute(); err != nil {
				return err
			}
			providerIdName.Id = "sampleProvider1"
		} else if err != nil {
			return err
		}

		insertTemplate := `INSERT INTO products (name, description, categoryId, providerId, sku, cost, price)
			VALUES ('SampleProduct%d', 'A sample product', '%s', '%s', 'sample-sku-%02d', 999, 1999)`

		err = app.RunInTransaction(func(txApp core.App) error {
			for i := 1; i <= 30; i++ {
				_, err := txApp.DB().NewQuery(fmt.Sprintf(insertTemplate, i, catIdName.Id, providerIdName.Id, i)).Execute()
				if err != nil {
					return err
				}
			}

			return nil
		})

		return err
	}, func(app core.App) error {
		// add down queries...
		_, err := app.DB().NewQuery("DELETE FROM products WHERE name LIKE 'SampleProduct%'").Execute()

		return err
	})
}
