package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		isProd := false
		if isProd {
			return nil
		}

		return app.RunInTransaction(func(txApp core.App) error {
			if err := populateCategories(txApp); err != nil {
				return err
			}

			if err := populateProviders(txApp); err != nil {
				return err
			}

			if err := populateColors(txApp); err != nil {
				return err
			}

			if err := populateSizes(txApp); err != nil {
				return err
			}

			return nil
		})
	}, func(app core.App) error {
		// add down queries...

		return nil
	})
}

func populateCategories(app core.App) error {
	const collName = "categories"
	count, err := app.CountRecords(collName)
	if err != nil {
		return err
	} else if count > 0 {
		return nil
	}

	data := []map[string]any{
		{
			"name": "Buzos",
			"code": "01",
		},
		{
			"name": "Remeras",
			"code": "02",
		},
		{
			"name": "Pantalones",
			"code": "03",
		},
		{
			"name": "Accesorios",
			"code": "04",
		},
	}

	coll, err := app.FindCollectionByNameOrId(collName)
	if err != nil {
		return err
	}

	for i := range data {
		rec := core.NewRecord(coll)
		rec.Load(data[i])
		if err := app.Save(rec); err != nil {
			return err
		}
	}

	return nil
}

func populateProviders(app core.App) error {
	const collName = "providers"
	count, err := app.CountRecords(collName)
	if err != nil {
		return err
	} else if count > 0 {
		return nil
	}

	data := []map[string]any{
		{
			"name": "Adidas",
			"code": "0001",
		},
		{
			"name": "Nike",
			"code": "0002",
		},
		{
			"name": "Reebok",
			"code": "0003",
		},
		{
			"name": "Sape",
			"code": "0004",
		},
	}

	coll, err := app.FindCollectionByNameOrId(collName)
	if err != nil {
		return err
	}

	for i := range data {
		rec := core.NewRecord(coll)
		rec.Load(data[i])
		if err := app.Save(rec); err != nil {
			return err
		}
	}

	return nil
}

func populateColors(app core.App) error {
	const collName = "colors"
	count, err := app.CountRecords(collName)
	if err != nil {
		return err
	} else if count > 0 {
		return nil
	}

	data := []map[string]any{
		{
			"name":    "Rojo",
			"hexcode": "#ff0000",
			"code":    "001",
		},
		{
			"name":    "Verde",
			"hexcode": "#00ff00",
			"code":    "002",
		},
		{
			"name":    "Azul",
			"hexcode": "#0000ff",
			"code":    "003",
		},
		{
			"name":    "Negro",
			"hexcode": "#000000",
			"code":    "004",
		},
	}
	coll, err := app.FindCollectionByNameOrId(collName)
	if err != nil {
		return err
	}
	for i := range data {
		rec := core.NewRecord(coll)
		rec.Load(data[i])
		if err := app.Save(rec); err != nil {
			return err
		}
	}
	return nil
}

func populateSizes(app core.App) error {
	const collName = "sizes"
	count, err := app.CountRecords(collName)
	if err != nil {
		return err
	} else if count > 0 {
		return nil
	}

	data := []map[string]any{
		{
			"alias": "S",
			"code":  "01",
		},
		{
			"alias": "M",
			"code":  "02",
		},
		{
			"alias": "L",
			"code":  "03",
		},
		{
			"alias": "XL",
			"code":  "04",
		},
	}

	coll, err := app.FindCollectionByNameOrId(collName)
	if err != nil {
		return err
	}

	for i := range data {
		rec := core.NewRecord(coll)
		rec.Load(data[i])
		if err := app.Save(rec); err != nil {
			return err
		}
	}

	return nil
}
