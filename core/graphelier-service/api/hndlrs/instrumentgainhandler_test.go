package hndlrs_test

import (
	"testing"

	"graphelier/core/graphelier-service/api/hndlrs"
	"graphelier/core/graphelier-service/models"
	. "graphelier/core/graphelier-service/utils/test_utils"

	"github.com/stretchr/testify/assert"
)

var instrumentGains []*models.InstrumentGain = []*models.InstrumentGain{
	&models.InstrumentGain{Instrument: "test", Unit: 1.00, Percentage: 10.00},
	&models.InstrumentGain{Instrument: "test2", Unit: -1.00, Percentage: -10.00},
}

var instrumentGainsSingle []*models.InstrumentGain = []*models.InstrumentGain{
    &models.InstrumentGain{Instrument: "test", Unit: 1.00, Percentage: 10.00},
}

func TestFetchInstrumentGainsSingle(t *testing.T) {
	mockedDB := MockDb(t)
	defer Ctrl.Finish()

	mockedDB.EXPECT().
		GetInstrumentGains([]string{"test"}, uint64(1), uint64(2)).
		Return(instrumentGainsSingle, nil)

	var result []*models.InstrumentGain
	err := MakeRequest(
		hndlrs.FetchInstrumentGains, // Function under test
		mockedDB,
		"GET",
		"/gain/test/1/2",
		map[string]string{
			"instruments" :         "test",
			"current_timestamp":    "1",
			"other_timestamp":      "2",
		},
		&result,
	)
	assert.Nil(t, err)
	assert.Equal(t, instrumentGainsSingle, result)
}

func TestFetchInstrumentGainsMultiple(t *testing.T) {
	mockedDB := MockDb(t)
	defer Ctrl.Finish()

	mockedDB.EXPECT().
		GetInstrumentGains([]string{"test","test2"}, uint64(1), uint64(2)).
		Return(instrumentGains, nil)

	var result []*models.InstrumentGain
	err := MakeRequest(
		hndlrs.FetchInstrumentGains, // Function under test
		mockedDB,
		"GET",
		"/gain/test,test2/1/2",
		map[string]string{
			"instruments" :         "test,test2",
			"current_timestamp":    "1",
			"other_timestamp":      "2",
		},
		&result,
	)
	assert.Nil(t, err)
	assert.Equal(t, instrumentGains, result)
}