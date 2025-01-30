package movements

import (
	"log"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
	"testing"

	"github.com/marianop9/stocker/app/stocker"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/tests"
	"github.com/stretchr/testify/assert"
)

func init() {
	wd, _ := os.Getwd()
	i := 0
	for !strings.HasSuffix(wd, "app") {
		if i > 10 {
			panic("test file exceeded directory nesting limits")
		}
		i++
		wd = filepath.Dir(wd)
	}

	baseDir = wd
	log.Printf("test data is under %s", getTestDataDir())
}

var baseDir string

const (
	TEST_DATA_DIR         = "test_pb_data"
	TEST_USERS_COLLECTION = "users"
	TEST_USER_EMAIL       = "testuser@stocker.com"
)

func getTestDataDir() string {
	return path.Join(baseDir, TEST_DATA_DIR)
}

// path = <module>/<action>
func customEndpointBuilder(module, action string) string {
	return path.Join("/api/custom", module, action)
}

func generateToken(collectionNameOrId string, email string) (string, error) {
	app, err := tests.NewTestApp(getTestDataDir())
	if err != nil {
		return "", err
	}
	defer app.Cleanup()

	record, err := app.FindAuthRecordByEmail(collectionNameOrId, email)
	if err != nil {
		return "", err
	}

	return record.NewAuthToken()
}

func generateDefaultUserToken() (string, error) {
	return generateToken(TEST_USERS_COLLECTION, TEST_USER_EMAIL)
}

func TestCreateStockEntry(t *testing.T) {
	userToken, err := generateDefaultUserToken()
	if err != nil {
		t.Fatal(err)
	}

	// setup the test ApiScenario app instance
	setupTestApp := func(t testing.TB) *tests.TestApp {
		testApp, err := tests.NewTestApp(getTestDataDir())
		if err != nil {
			t.Fatal(err)
		}
		// no need to cleanup since scenario.Test() will do that for us
		// defer testApp.Cleanup()

		stockerApp := stocker.NewStockerApp(testApp)
		RegisterMovementsHandlers(stockerApp)
		stockerApp.RegisterCustomHandlers()

		return testApp
	}

	scenarios := []tests.ApiScenario{
		{
			Name:    "create 2 stock entries",
			Method:  http.MethodPost,
			URL:     customEndpointBuilder(stocker.ModuleMovements, "createStockMovement"),
			Headers: map[string]string{"Authorization": userToken},
			Body: strings.NewReader(`
				{
					"movementId": "6cs1ka9bfk9r6x6",
					"isReturn": false,
					"units": [
						{
							"productUnitId": "6pvbfe4m894l680",
							"quantity": 1
						},
						{
							"productUnitId": "74x42nz242t2jay",
							"quantity": 1
						}
					]
				}`),
			ExpectedStatus:  http.StatusOK,
			ExpectedContent: []string{`"success":true`},
			TestAppFactory:  setupTestApp,
			AfterTestFunc: func(t testing.TB, app *tests.TestApp, res *http.Response) {
				count, err := app.CountRecords(stocker.CollectionStockEntries, dbx.HashExp{"movementId": "6cs1ka9bfk9r6x6"})
				if err != nil {
					t.Fatalf("failed to count: %e", err)
				}
				if count != 2 {
					t.Fatalf("expected 2 records, found %d", count)
				}
			},
		},
	}

	for _, scenario := range scenarios {
		scenario.Test(t)
	}
}

func TestAnnulStockEntry(t *testing.T) {
	userToken, err := generateDefaultUserToken()
	if err != nil {
		t.Fatal(err)
	}

	// setup the test ApiScenario app instance
	setupTestApp := func(t testing.TB) *tests.TestApp {
		testApp, err := tests.NewTestApp(getTestDataDir())
		if err != nil {
			t.Fatal(err)
		}
		// no need to cleanup since scenario.Test() will do that for us
		// defer testApp.Cleanup()

		stockerApp := stocker.NewStockerApp(testApp)
		RegisterMovementsHandlers(stockerApp)
		stockerApp.RegisterCustomHandlers()

		return testApp
	}

	movementId := "mov2annul123456"

	scenarios := []tests.ApiScenario{
		{
			Name:            "annul stock entry",
			Method:          http.MethodDelete,
			URL:             customEndpointBuilder(stocker.ModuleMovements, movementId),
			Headers:         map[string]string{"Authorization": userToken},
			ExpectedStatus:  http.StatusOK,
			ExpectedContent: []string{`"success":true`},
			TestAppFactory:  setupTestApp,
			AfterTestFunc: func(t testing.TB, app *tests.TestApp, res *http.Response) {
				// verify state
				rec, err := app.FindRecordById(stocker.CollectionMovements, movementId)
				assert.NoError(t, err)
				assert.Equal(t, MovementStateAnnulled, rec.GetString("state"))

				productUnitIds := []string{"74x42nz242t2jay", "6pvbfe4m894l680"}
				// verify product units were updated (their quantities reduced)
				units, err := app.FindRecordsByIds(stocker.CollectionProductUnits, productUnitIds)
				assert.NoError(t, err)
				for _, unit := range units {
					if unit.Id == "74x42nz242t2jay" {
						assert.Equal(t, 1, unit.GetInt("quantity"))
					} else {
						assert.Equal(t, 2, unit.GetInt("quantity"))
					}
				}
			},
		},
	}

	for _, scenario := range scenarios {
		scenario.Test(t)
	}
}
