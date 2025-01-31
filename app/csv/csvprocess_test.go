package csv

import (
	"encoding/csv"
	"strconv"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

var testString string = `ABRIGOS,LYANNA,saco,"sisa 52 cm, largo 68 cm",paño,m/l,rojo,1,Chiara,"25.000,00","0,00","52.000,00","65.000,00",,,16/05,1,0,,,,,0,0`

func getTestReader() *csv.Reader {
	return csv.NewReader(strings.NewReader(testString))
}

func getTestRecord() CSVRecord {
	rec, _ := getTestReader().Read()
	return CSVRecord(rec)
}

func TestGetNormalizedCurrencyField(t *testing.T) {
	record := getTestRecord()

	expectedUnitCost := "25000.00"
	expectedCashPrice := "52000.00"
	expectedRetailPrice := "65000.00"

	unitCost := record.getNormalizedCurrency(IdxUnitCost)
	cashPrice := record.getNormalizedCurrency(IdxCashPrice)
	retailPrice := record.getNormalizedCurrency(IdxRetailPrice)

	assert.Equal(t, expectedUnitCost, unitCost)
	assert.Equal(t, expectedCashPrice, cashPrice)
	assert.Equal(t, expectedRetailPrice, retailPrice)

	// test parsing as well
	parsedUnitCost, err := strconv.ParseFloat(unitCost, 64)

	assert.Nil(t, err)
	assert.Equal(t, float64(25000), parsedUnitCost)
}

// Color is optional, if size is empty replace with "unique"
func TestAddVariant(t *testing.T) {
	qty := 1
	p := ProductSheetDto{}

	// color
	record := getTestRecord()
	record[IdxColor] = ""

	err := p.addVariant(record, qty)
	assert.Nil(t, err)

	// size
	record = getTestRecord()
	record[IdxSize] = ""

	err = p.addVariant(record, qty)
	assert.Nil(t, err)
	assert.Equal(t, p.Variants[1].SizeName, "U")
}

func TestProcessCSV(t *testing.T) {
	input := `,NOMBRE,PRENDA,DETALLE,TELA,TALLE,COLOR,CANTIDAD,PROVEEDOR,PRECIO COSTO UNITARIO,PRECIO COSTO TOTAL,PRECIO CONTADO,PRECIO LISTA,SALE 35% EFECTIVO,SALE 15% TARJETAS,"FECHA
 VENTA","SALIDA
VENTA",DISPONIBLE,,,,,"Valor venta mercadería",
ABRIGOS,LYANNA,saco,"sisa 52 cm, largo 68 cm",paño,m/l,rojo,1,Chiara,"25.000,00","0,00","52.000,00","65.000,00",,,16/05,1,0,,,,,0,0
,LYANNA,saco,"sisa 52 cm, largo 68 cm",paño,m/l,tostado,1,Chiara,"25.000,00","0,00","52.000,00","65.000,00",,,24/04,1,0,,,,,0,0
,HELENA,saco,"sisa 54 cm, largo 68 cm",paño,m/l,negro,1,Chiara,"25.000,00","0,00","52.000,00","65.000,00",,,26/04,1,0,,,,,0,0
,LETIZIA,saco,"sisa 55 cm, largo 58 cm",paño con forro,m/l,negro,1,Chiara,"25.000,00","0,00","52.000,00","65.000,00",,,29/06,1,0,,,,,0,0
,LETIZIA,saco,"sisa 60 cm, largo 70 cm",paño con forro,L,negro,1,Chiara,"25.000,00","25.000,00","52.000,00","65.000,00","42.250,00","55.250,00",,,1,,,,,52000,0
,LETIZIA,saco,"sisa 55 cm, largo 58 cm",paño con forro,m/l,tostado,1,Chiara,"25.000,00","0,00","52.000,00","65.000,00",,,24/05,1,0,,,,,0,0
,NINA,saco,"sisa 55 cm, largo 70 cm",paño,m/l,tostado cuadrillé,1,Chiara,"25.000,00","25.000,00","52.000,00","65.000,00","42.250,00","55.250,00",,,1,,,,,52000,0
,NINA,saco,"sisa 55 cm, largo 70 cm",paño,m/l,gris cuadrillé,1,Chiara,"25.000,00","0,00","52.000,00","65.000,00",,,27/06,1,0,,,,,0,0
,BRENDA,camisaco,"sisa 60 cm, largo 71 cm",paño,unico oversize,fucsia cuadrillé,1,Chiara,"25.000,00","0,00","52.000,00","65.000,00",,,15/05,1,0,,,,,0,0
,BERLIN,blazer,"sisa 50 cm, largo 68 cm, con botón, todo forrado",crepe elastizado,m/l,rojo,1,Aura Blanca,"19.900,00","0,00","41.800,00","52.250,00",,,24/04,1,0,,,,,0,0
,OFELIA,blazer,"sisa 50 cm, largo 72 cm, con botón.",crepe sastrero,m/L,lavanda,1,Idium,"21.000,00","21.000,00","44.000,00","55.000,00",,,,,1,,,,,44000,0
,IRENE,blazer,"sisa 50 cm, largo 70 cm, forrado",tencel sastrero,m/l,blanco,1,Madava,"21.100,00","0,00","44.200,00","55.250,00",,,03/12,1,0,,,,,0,0
,HALLY,blazer,"sisa 48 cm, largo 73 cm, forrado mangas 3/4 abullonadas",lino sastrero,s/m,negro,1,Madava,"19.900,00","0,00","41.800,00","52.250,00",,,04/06,1,0,,,,,0,0
,MOSCÚ,blazer,"sisa 55 cm, largo 74, forrado",crepe sastrero,m/l,negro,1,Loise,"21.000,00","21.000,00","44.000,00","55.000,00",,,,,1,,,,,44000,0
,CALIA,blazer,"sisa 55 cm, largo 73 cm, forrado",crepe sastrero,L,negro,1,Symmetria,"22.000,00","0,00","46.000,00","57.500,00",,,30/08,1,0,,,,,0,0
,ANKARA,blazer,"sisa 50 cm, largo 70 cm, forrado",crepe sastrero,m/l,verde militar,1,Evase,"19.900,00","0,00","41.800,00","52.250,00",,,09/05,1,0,,,,,0,0
,ANKARA,blazer,"sisa 50 cm, largo 70 cm, forrado",crepe sastrero,m/l,gris,1,Evase,"19.900,00","0,00","41.800,00","52.250,00",,,28/05,1,0,,,,,0,0
,RITA,blazer,"sisa 50, largo 67, sin forro",crepe sastrero,L,beige,1,Evasé,"21.100,00","0,00","44.200,00","55.250,00",,,25/10,1,0,,,,,0,0
,RITA,blazer,"sisa 50, largo 67, sin forro",crepe sastrero,M,gris,1,Evasé,"21.100,00","21.100,00","44.200,00","55.250,00",,,,,1,,,,,44200,0
,RITA,blazer,"sisa 52, largo 70, sin forro",crepe sastrero,L,gris,1,Evasé,"21.100,00","21.100,00","44.200,00","55.250,00",,,,,1,,,,,44200,0
,OSAKA,blazer,"sisa 48 cm, largo 65 cm, sin forro",crepe sastrero,S,negro,1,Blink Ba,"21.000,00","0,00","44.000,00","55.000,00",,,02/10,1,0,,,,,0,0
,OSAKA,blazer,"sisa 54 cm, largo 70 cm, sin forro",crepe sastrero,M,negro,1,Blink Ba,"21.000,00","0,00","44.000,00","55.000,00",,,18/12,1,0,,,,,0,0
,SKY,blazer,"sisa 52, largo 42, crop sin forro",crepe sastrero,Único,blanco,1,Blink Ba,"18.000,00","18.000,00","38.000,00","47.500,00",,,,,1,,,,,38000,0
,SKY,blazer,"sisa 52, largo 42, crop sin forro",crepe sastrero,Único,beige,1,Blink Ba,"18.000,00","18.000,00","38.000,00","47.500,00",,,,,1,,,,,38000,0
,SKY,blazer,"sisa 52, largo 42, crop sin forro",crepe sastrero,Único,negro,1,Blink Ba,"18.000,00","18.000,00","38.000,00","47.500,00",,,,,1,,,,,38000,0
,NILO,blazer,"sisa 48, largo 70",crepe sastrero,S,negro,1,Audere,"21.000,00","21.000,00","44.000,00","55.000,00",,,,,1,,,,,44000,0
,NILO,blazer,"sisa 50, largo 70",crepe sastrero,M,beige,1,Audere,"21.000,00","21.000,00","44.000,00","55.000,00",,,,,1,,,,,44000,0
,NILO,blazer,"sisa 55, largo 74",crepe sastrero,L,beige,1,Audere,"21.000,00","21.000,00","44.000,00","55.000,00",,,,,1,,,,,44000,0
,MONTANA,campera,"sisa 52 cm, largo 50 cm, corta",jean rígido,unico oversize,blanco,1,Salsa,"14.900,00","0,00","31.800,00","39.750,00",,,13/04,1,0,,,,,0,0
,TALISA,campera,"sisa 59 cm, largo 48 cm, corto",cuerina,unico oversize,negro,1,Enede,"14.900,00","0,00","31.800,00","39.750,00",,,18/06,1,0,,,,,0,0
,ELLORA,campera,"sisa 51 cm, largo 45 cm",jean rigido,unico,celeste,1,Lumavi,"15.000,00","0,00","32.000,00","40.000,00",,,04/10,1,0,,,,,0,0
,ELLORA,campera,"sisa 51 cm, largo 45 cm",jean rigido,unico,negro,1,Lumavi,"15.000,00","0,00","32.000,00","40.000,00",,,06/09,1,0,,,,,0,0
,CONNIE,campera,"sisa 51 cm, largo 43 cm, corta desflecada",jean rigido,unico oversize,celeste,1,Lumavi,"14.900,00","0,00","46.000,00","57.500,00",,,,1,0,,,,,0,0
,PHOEBE,campera camisa,"sisa 56 cm, largo 63 cm",jean rigido,unico oversize,gris,1,Lumavi,"18.900,00","0,00","39.800,00","49.750,00",,,14/08,1,0,,,,,0,0
,PHOEBE,campera camisa,"sisa 56 cm, largo 63 cm",jean rigido,unico oversize,negro,1,Lumavi,"18.900,00","0,00","46.000,00","57.500,00",,,30/11,1,0,,,,,0,0
,BETHANY,campera ,"sisa 60 cm, largo 63 cm",jean rigido,unico oversize,negro,1,Lumavi,"22.000,00","0,00","46.000,00","57.500,00",,,23/12,1,0,,,,,0,0
,BETHANY,campera,"sisa 60 cm, largo 63 cm",jean rigido,unico oversize,celeste,1,Lumavi,"29.000,00","29.000,00","60.000,00","75.000,00",,,,,1,,,,,60000,0
,BETHANY,campera,"sisa 60 cm, largo 63 cm",jean rigido,unico oversize,gris ,1,Lumavi,"22.000,00","0,00","46.000,00","57.500,00",,,23/10,1,0,,,,,0,0
,LILAH,campera,"sisa 52 cm, largo 56 cm, con cinto en cintura ",eco cuero,L,negro,1,Mam Trends,"39.000,00","39.000,00","80.000,00","100.000,00",,,,,1,,,,,80000,0
,NAIA,campera,"sisa 45 cm, largo 56 cm",eco cuero,S,negro,1,Mam Trends,"36.000,00","0,00","74.000,00","92.500,00",,,12/09,1,0,,,,,0,0
,NAIA,campera,"sisa 47 cm, largo 56 cm",eco cuero,M,negro,1,Mam Trends,"36.000,00","0,00","74.000,00","92.500,00",,,27/07,1,0,,,,,0,0
,AGNES,chaqueta,"vintage, sisa, largo",cuerina,unico,gris,2,Kind,"22.000,00","0,00","46.000,00","57.500,00",,,06/07 Y 28/08,2,0,,,,,0,0
,AGNES,chaqueta,"vintage, sisa, largo",cuerina,unico,marrón,1,Kind,"22.000,00","0,00","46.000,00","57.500,00",,,12/09,1,0,,,,,0,0
,GLEN,chaqueta,"tipo piloto, sisa 52, largo 56",gabardina,S/M,verde pistacho,1,Idium,"17.000,00","0,00","36.000,00","45.000,00",,,03/10,1,0,,,,,0,0
,DERBY,campera,sisa 57 x largo 65,jean,L,blanco,1,Oli Jeans,"29.000,00","29.000,00","60.000,00","75.000,00",,,,,1,,,,,60000,0
,DERBY,campera,sisa 55 x largo 60,jean,M,óxido,1,Oli Jeans,"29.000,00","0,00","60.000,00","75.000,00",,,25/01,1,0,,,,,0,0
,RICE,campera,,jean,M,crudo,1,Salsa,"28.790,00","0,00","59.580,00","74.475,00",,,29/01,1,0,,,,,0,0
TEJIDOS,BRIDA,sweater,"sisa 55 cm, largo 58 cm, punto inglés",bremer,unico,violeta,1,Jenit ,"11.000,00","0,00","24.000,00","30.000,00",,,15/06,1,0,,,,,0,0
,BRIDA,sweater,"sisa 55 cm, largo 58 cm, punto inglés",bremer,unico,terracota,1,Jenit ,"11.000,00","0,00","24.000,00","30.000,00",,,18/05,1,0,,,,,0,0
,BRIDA,sweater,"sisa 55 cm, largo 58 cm, punto inglés",bremer,unico,azul,1,Jenit ,"11.000,00","0,00","24.000,00","30.000,00",,,10/05,1,0,,,,,0,0
,AMY,sweater,"sisa 50 cm, largo 64 cm, básico",bremer,unico,gris,1,Jenit ,"11.000,00","0,00","24.000,00","30.000,00",,,06/04,1,0,,,,,0,0
,THYRA,sweater,"sisa 55 cm ,largo 58 cm, calado",bremer,unico,gris,1,Jenit ,"11.000,00","0,00","24.000,00","30.000,00",,,18/04,1,0,,,,,0,0
,BIRMANIA,sweater,"sisa 44 cm, largo 56 cm, trenza calado",bremer,unico,crema,1,Madava,"12.500,00","0,00","27.000,00","33.750,00",,,09/04,1,0,,,,,0,0
,BIRMANIA,sweater,"sisa 44 cm, largo 56 cm, trenza calado",bremer,unico,gris,1,Madava,"12.500,00","0,00","27.000,00","33.750,00",,,18/04,1,0,,,,,0,0
,BIRMANIA,sweater,"sisa 44 cm, largo 56 cm, trenza calado",bremer,unico,negro,1,Madava,"12.500,00","12.500,00","27.000,00","33.750,00","21937,5","28687,5",,,1,,,,,27000,0
,JAPÓN,sweater,"sisa 72 cm, largo 63 cm, trenza oversize",bremer,unico,natural,1,Madava,"13.800,00","0,00","29.600,00","37.000,00",,,08/04,1,0,,,,,0,0
,JAPÓN,sweater,"sisa 72 cm, largo 63 cm, trenza oversize",bremer,unico,negro,1,Madava,"13.800,00","0,00","29.600,00","37.000,00",,,15/04,1,0,,,,,0,0
,JAPÓN,sweater,"sisa 72 cm, largo 63 cm, trenza oversize",bremer,unico,vison,1,Madava,"13.800,00","0,00","29.600,00","37.000,00",,,16/04,1,0,,,,,0,0
,ANDREW,sweater,"sisa 68 cm, largo 60 cm",bremer,unico,natural,1,Evasé,"10.000,00","0,00","22.000,00","27.500,00",,,29/06,1,0,,,,,0,0
,ANDREW,sweater,"sisa 68 cm, largo 60 cm",bremer,unico,visón,1,Evasé,"10.000,00","0,00","22.000,00","27.500,00",,,04/05,1,0,,,,,0,0
,ANDREW,sweater,"sisa 68 cm, largo 60 cm",bremer,unico,negro,1,Evasé,"10.000,00","0,00","22.000,00","27.500,00",,,26/06,1,0,,,,,0,0
,MAUI,sweater,"sisa 45 cm, largo 60 cm",lanilla,unico,natural,1,Alexa,"6.900,00","0,00","15.800,00","19.750,00",,,04/05,1,0,,,,,0,0
,MAUI,sweater,"sisa 45 cm, largo 60 cm",lanilla,unico,negro,1,Alexa,"6.900,00","0,00","15.800,00","19.750,00",,,13/05,1,0,,,,,0,0
,JOANNE,sweater,"sisa 60 cm, largo 62 cm",bremer,unico,rayado negro blanco,1,Cotton Beige,"12.500,00","0,00","27.000,00","33.750,00",,,04/05,1,0,,,,,0,0
,JOANNE,sweater,"sisa 60 cm, largo 62 cm",bremer,unico,rayado blanco negro,1,Cotton Beige,"12.500,00","0,00","27.000,00","33.750,00",,,04/05,1,0,,,,,0,0
,HILD,cardigan,"sisa 60 cm, largo 59 cm",bremer,unico,verde,1,Jenit ,"9.200,00","0,00","20.400,00","25.500,00",,,26/04,1,0,,,,,0,0
,SINGAPUR,cardigan,"sisa 45 cm, largo 52 cm ",bremer,unico,blanco,1,Evase,"9.400,00","0,00","20.800,00","26.000,00",,,08/06,1,0,,,,,0,0
,SINGAPUR,cardigan,"sisa 45 cm, largo 52 cm ",bremer,unico,negro,1,Evase,"9.200,00","0,00","20.400,00","25.500,00",,,09/04,1,0,,,,,0,0
,SINGAPUR,cardigan,"sisa 45 cm, largo 52 cm ",bremer,unico,celeste,1,Evase,"9.200,00","0,00","20.400,00","25.500,00",,,18/04,1,0,,,,,0,0
,SINGAPUR,cardigan,"sisa 45 cm, largo 52 cm ",bremer,unico,beige,1,Evase,"9.400,00","0,00","20.800,00","26.000,00",,,16/05,1,0,,,,,0,0
,SINGAPUR,cardigan,"sisa 45 cm, largo 52 cm ",bremer,unico,vison,1,Evase,"9.400,00","0,00","20.800,00","26.000,00",,,03/05,1,0,,,,,0,0
,ISRAEL,cardigan,"sisa 68 cm, largo 58 cm, rayado",bremer,unico,negro c/blanco,1,Madava,"15.700,00","0,00","33.400,00","41.750,00",,,24/05,1,0,,,,,0,0
,ISRAEL,cardigan,"sisa 68 cm, largo 58 cm, rayado",bremer,unico,blanco c/negro,1,Madava,"15.700,00","0,00","33.400,00","41.750,00",,,03/05,1,0,,,,,0,0
,HELENA,sweater,"sisa 57 cm, largo 59 cm",bremer,unico,raya beige c blanco,1,Uni,"12.000,00","12.000,00","26.000,00","32.500,00","21.125,00","27.625,00",,,1,,,,,26000,0
,EVE,sweater,"sisa 59 cm, largo 60 cm",bremer,unico,raya blanco choco,1,Uni,"11.500,00","11.500,00","25.000,00","31.250,00",,,,,1,,,,,25000,0
,EVE,sweater,"sisa 59 cm, largo 60 cm",bremer,unico,raya blanco negro,1,Uni,"11.500,00","0,00","25.000,00","31.250,00",,,03/08,1,0,,,,,0,0
,EVE,sweater,"sisa 59 cm, largo 60 cm",bremer,unico,raya negro blanco,1,Uni,"11.500,00","0,00","25.000,00","31.250,00",,,12/08,1,0,,,,,0,0
,FLOR,cardigan,"sisa 59 cm, largo 69 cm.",lanilla soft,unico,bordó,1,Pandora,"12.983,00","12.983,00","27.966,00","34.458,00","22.397,70","29.289,30",,,1,,,,,27966,0
,FLOR,cardigan,"sisa 59 cm, largo 69 cm.",lanilla soft,unico,verde,1,Pandora,"12.983,00","12.983,00","27.966,00","34.458,00","22.397,70","29.289,30",,,1,,,,,27966,0
,FLOR,cardigan,"sisa 59 cm, largo 69 cm.",lanilla soft,unico,celeste,1,Pandora,"12.983,00","0,00","27.966,00","34.957,50",,,09/08,1,0,,,,,0,0
,BRUMA,cardigan,"sisa 42 cm, largo 44 cm",bremer bastón fino,unico,blanco,1,Rudia,"15.000,00","15.000,00","32.000,00","40.000,00",,,,,1,,,,,32000,0
,BRUMA,cardigan,"sisa 42 cm, largo 44 cm",bremer bastón fino,unico,negro,1,Rudia,"15.000,00","0,00","32.000,00","40.000,00",,,07/08,1,0,,,,,0,0
,BRUMA,cardigan,"sisa 42 cm, largo 44 cm",bremer bastón fino,unico,beige,1,Rudia,"15.000,00","15.000,00","32.000,00","40.000,00",,,,,1,,,,,32000,0
,MELEYS,cardigan,"sisa 38 cm, largo 46 cm",bremer grueso,unico,blanco,1,Rudia,"13.000,00","0,00","28.000,00","35.000,00",,,14/08,1,0,,,,,0,0
,MELEYS,cardigan,"sisa 38 cm, largo 46 cm",bremer grueso,unico,negro,1,Rudia,"13.000,00","0,00","28.000,00","35.000,00",,,31/07,1,0,,,,,0,0
,MAX,cardigan,clásico,bremer,unico,beige,1,Miel,"13.500,00","0,00","29.000,00","36.250,00",,,01/08,1,0,,,,,0,0
,MAX,cardigan,clásico,bremer,unico,beige,1,Miel,"13.500,00","0,00","29.000,00","36.250,00",,,01/08,1,0,,,,,0,0
,MAX,cardigan,clásico,bremer,unico,beige,1,Miel,"13.500,00","0,00","29.000,00","36.250,00",,,01/08,1,0,,,,,0,0
,FEDORA,sweater,"sisa 50 cm, largo 52 cm, trama rayada",bremer,unico,rojo,1,Código y cosmos,"12.000,00","0,00","26.000,00","32.500,00",,,08/07,1,0,,,,,0,0
,FEDORA,sweater,"sisa 50 cm, largo 52 cm, trama rayada",bremer,unico,beige,1,Código y cosmos,"12.000,00","0,00","26.000,00","32.500,00",,,10/08,1,0,,,,,0,0
,GALA,sweater,"sisa 39 cm, largo 58 cm, al cuerpo",bremer,unico,natural,1,Código y cosmos,"12.000,00","0,00","26.000,00","32.500,00",,,13/07,1,0,,,,,0,0
,GALA,sweater,"sisa 39 cm, largo 58 cm, al cuerpo",bremer,unico,negro,1,Código y cosmos,"12.000,00","0,00","26.000,00","32.500,00",,,13/08,1,0,,,,,0,0
,GALA,sweater,"sisa 39 cm, largo 58 cm, al cuerpo",bremer,unico,verde ,1,Código y cosmos,"12.000,00","0,00","26.000,00","32.500,00",,,13/08,1,0,,,,,0,0
,GALA,sweater,"sisa 39 cm, largo 58 cm, al cuerpo",bremer,unico,gris,1,Código y cosmos,"12.000,00","0,00","26.000,00","32.500,00",,,03/08,1,0,,,,,0,0`

	process := NewProductSheetProcess(strings.NewReader(input))

	err := process.ProcessCSV()
	// process shouldn't fail
	assert.Nil(t, err)

	t.Logf("process finished - %d products", len(process.products))

	// input has 15 distinct products across 2 categories
	categoriesMap := make(map[string]int, 2)

	for _, p := range process.products {
		if count, ok := categoriesMap[p.CategoryName]; ok {
			categoriesMap[p.CategoryName] = count + 1
		} else {
			categoriesMap[p.CategoryName] = 1
		}
	}

	assert.Len(t, categoriesMap, 2)

	assert.Equal(t, categoriesMap["ABRIGOS"], 10)
	assert.Equal(t, categoriesMap["TEJIDOS"], 5)

	// check products which should have multiple variants
	assert.Len(t, process.products[4].Variants, 2)
	assert.Len(t, process.products[5].Variants, 3)
	assert.Len(t, process.products[6].Variants, 3)

	// products with only one variant
	assert.Len(t, process.products[7].Variants, 1)
	assert.Len(t, process.products[8].Variants, 1)
}
