package csv

import (
	"encoding/csv"
	"errors"
	"fmt"
	"io"
	"strconv"
	"strings"
)

const (
	IdxCategory = iota // solo lo tiene el primero de cada categoria
	IdxName            // 1
	_
	IdxDetail // 3 descripcion
	_
	IdxSize
	IdxColor
	_ //  cantidad(7) ! usar disponible
	IdxProvider
	IdxUnitCost
	IdxTotalCost
	IdxCashPrice   // 11
	IdxRetailPrice // 12
	_
	_
	_
	_
	IdxAvailable // 17
	IdxOutOfBounds
)

type CSVRecord []string

func (row CSVRecord) getField(idx int) string {
	if idx < 0 || idx >= IdxOutOfBounds {
		return ""
	}

	return row[idx]
}

// transforms "52.000,00" -> "52000.00" as per Go floating-point format specifications
func (row CSVRecord) getNormalizedCurrency(idx int) string {
	/* https://go.dev/ref/spec#Floating-point_literals

	"A decimal floating-point literal consists of an integer part (decimal digits), a decimal point,
	a fractional part (decimal digits), and an exponent part (e or E followed by an optional sign and decimal digits).
	One of the integer part or the fractional part may be elided; one of the decimal point or the exponent part may be elided."
	*/

	f := row.getField(idx)

	f = strings.ReplaceAll(f, ".", "")

	return strings.ReplaceAll(f, ",", ".")
}

type ProductSheetDto struct {
	Name         string
	Detail       string
	CategoryName string
	ProviderName string
	UnitCost     float64
	TotalCost    float64
	CashPrice    float64
	RetailPrice  float64
	Variants     []ProductSheetVariantDto
}

type ProductSheetVariantDto struct {
	ColorName    string
	SizeName     string
	AvailableQty uint
}

func (p *ProductSheetDto) addVariant(rec CSVRecord, qty int) error {
	color := rec.getField(IdxColor)
	if color == "" {
		return errors.New("empty color")
	}

	size := rec.getField(IdxSize)
	if size == "" {
		return errors.New("empty size")
	}

	variant := ProductSheetVariantDto{
		ColorName:    color,
		SizeName:     size,
		AvailableQty: uint(qty),
	}

	p.Variants = append(p.Variants, variant)
	return nil
}

type ProductSheetProcess struct {
	stream   io.Reader
	products []ProductSheetDto
}

func NewProductSheetProcess(stream io.Reader) ProductSheetProcess {
	return ProductSheetProcess{
		stream: stream,
	}
}

func (process *ProductSheetProcess) ProcessCSV() error {
	reader := csv.NewReader(process.stream)

	// skip first row (headers)
	if _, err := reader.Read(); err != nil {
		return fmt.Errorf("failed to parse first row: %w", err)
	}

	/*
		Read row then:
		1. Get category name for group
		2. Skip to next product with available qty
		3. Create a ProuductSheetDto with a unit from that row
		4. Skip to next product with available qty
			- If same product add another unit
			- Else create new ProductSheetDto
	*/
	products := make([]ProductSheetDto, 0, 50)
	var currentCategory string

	for currentRow := 1; ; currentRow++ {
		fields, err := reader.Read()

		// io.EOF or empty name indicate end of records
		if err != nil {
			if err != io.EOF {
				return NewWrappedRowError(currentRow, "failed to read record", err)
			}
			break
		} else if fields[IdxName] == "" {
			break
		}

		record := CSVRecord(fields)

		// 1. Get category name for group
		if cat := record.getField(IdxCategory); cat != "" {
			currentCategory = cat
		}
		if currentCategory == "" {
			return errors.New("failed to get category")
		}

		// 2. Skip to next product with available qty
		qty, err := strconv.Atoi(record.getField(IdxAvailable))
		if err != nil {
			return NewWrappedRowError(currentRow, "failed to parse quantity", err)
		}
		if qty == 0 {
			continue
		}

		// same product as last, only add new variant
		if productsLen := len(products); productsLen > 0 {
			lastProduct := &products[productsLen-1]

			if lastProduct.Name == record.getField(IdxName) {
				if err := lastProduct.addVariant(record, qty); err != nil {
					return NewWrappedRowError(currentRow, "failed to add unit", err)
				}

				// dont create a new product
				continue
			}
		}

		// if different product from last, create a ProuductSheetDto with a variant from that row
		product, err := newProductSheetDto(currentRow, record, currentCategory, qty)
		if err != nil {
			return NewWrappedRowError(currentRow, "failed to create product dto", err)
		}

		products = append(products, product)
	}

	process.products = products

	return nil
}

func newProductSheetDto(currentRow int, record CSVRecord, category string, quantity int) (product ProductSheetDto, err error) {
	product = ProductSheetDto{
		Name:         record.getField(IdxName),
		Detail:       record.getField(IdxDetail),
		CategoryName: category,
		ProviderName: record.getField(IdxProvider),
	}

	if product.Name == "" {
		// can't really happen
		err = errors.New("empty name")
		return
	}

	product.UnitCost, err = strconv.ParseFloat(record.getNormalizedCurrency(IdxUnitCost), 64)
	if err != nil {
		err = NewWrappedRowError(currentRow, "failed to parse UnitCost", err)
		return
	}

	product.TotalCost, err = strconv.ParseFloat(record.getNormalizedCurrency(IdxTotalCost), 64)
	if err != nil {
		err = NewWrappedRowError(currentRow, "failed to parse TotalCost", err)
		return
	}

	product.CashPrice, err = strconv.ParseFloat(record.getNormalizedCurrency(IdxCashPrice), 64)
	if err != nil {
		err = NewWrappedRowError(currentRow, "failed to parse CashPrice", err)
		return
	}

	product.RetailPrice, err = strconv.ParseFloat(record.getNormalizedCurrency(IdxRetailPrice), 64)
	if err != nil {
		err = NewWrappedRowError(currentRow, "failed to parse RetailPrice", err)
		return
	}

	if err = product.addVariant(record, quantity); err != nil {
		err = NewWrappedRowError(currentRow, "failed to add unit", err)
		return
	}

	return
}
