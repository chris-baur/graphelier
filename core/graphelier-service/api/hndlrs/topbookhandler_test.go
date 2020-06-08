package hndlrs_test

import (
	"testing"

	"graphelier/core/graphelier-service/api/hndlrs"
	"graphelier/core/graphelier-service/models"
	. "graphelier/core/graphelier-service/utils/test_utils"

	"github.com/stretchr/testify/assert"
)

var points []*models.Point = []*models.Point{
	&models.Point{Timestamp: 1, BestBid: 1.0, BestAsk: 2.0},
	&models.Point{Timestamp: 2, BestBid: 1.0, BestAsk: 2.0},
}

func TestFetchTopBook(t *testing.T) {
	mockedDB := MockDb(t)
	defer Ctrl.Finish()

	mockedDB.EXPECT().
		GetTopOfBookByInterval("test", uint64(1), uint64(2), int64(200)).
		Return(points, nil)

	var result []*models.Point
	err := MakeRequest(
		hndlrs.FetchTopBook, // Function under test
		mockedDB,
		"GET",
		"/topofbook/test/1/2/200",
		map[string]string{
			"instrument":      "test",
			"start_timestamp": "1",
			"end_timestamp":   "2",
			"num_points":      "200",
		},
		&result,
	)
	assert.Nil(t, err)
	assert.Equal(t, points, result)
}

func TestFetchTopBookByTimestamp(t *testing.T) {

    testPoint := points[0]
    mockedDB := MockDb(t)
    defer Ctrl.Finish()

    mockedDB.EXPECT().
        GetTopOfBookByTimestamp("test", uint64(1)).
        Return(testPoint, nil)

    var result *models.Point
    err := MakeRequest(
        hndlrs.FetchTopBookOne, // Function to test`
        mockedDB,
        "GET",
        "/topbookone/test/1",
        map[string]string{
            "instrument":       "test",
            "start_timestamp":  "1",
        },
        &result,
    )
    assert.Nil(t, err)
    assert.Equal(t, testPoint, result)
}
