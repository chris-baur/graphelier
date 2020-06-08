package models

import (
    "math"
    log "github.com/sirupsen/logrus"
)

// InstrumentGain : A struct to hold instrument gain data to send as json
type InstrumentGain struct {
	Instrument      string           `json:"instrument"`
	Unit            float64          `json:"unit"`
    Percentage      float64          `json:"percentage"`
}

// CreateInstrumentGain : Creates a single Instrument Gain given two orderbooks and an instrument
func CreateInstrumentGain(current_orderbook *Orderbook, other_orderbook *Orderbook) (ig InstrumentGain) {
	current_ask := current_orderbook.Asks[0].Price
	other_ask := other_orderbook.Asks[0].Price
	best_ask_diff := current_ask - other_ask

	ig.Instrument = current_orderbook.Instrument
	ig.Unit = math.Floor(best_ask_diff * 1000) / 1000 // 3 decimal precision

	//check for 0 divison
	if other_ask == 0 {
        if current_ask == 0 {
            other_ask = 1
        } else {
            other_ask = current_ask
        }
	}
	ig.Percentage = math.Floor(((best_ask_diff / other_ask) * 100) * 1000)/1000 // 3 decimal precision

	return ig
}

// CreateInstrumentGain : Creates a single Instrument Gain given two Points and an instrument
func CreateInstrumentGainByPoints(instrument string, current_point *Point, other_point *Point) (ig InstrumentGain) {
	current_ask := (*current_point).BestAsk
	other_ask := (*other_point).BestAsk
	best_ask_diff := current_ask - other_ask

	ig.Instrument = instrument
	ig.Unit = math.Floor(best_ask_diff * 1000)/1000 // 3 decimal precision

    //check for 0 divison
    if other_ask == 0 {
        if current_ask == 0 {
            other_ask = 1
        } else {
            other_ask = current_ask
        }
    }
	ig.Percentage = math.Floor((best_ask_diff / other_ask * 100) * 1000)/1000 // 3 decimal precision

    log.Debugf("\nBest Ask Diff: %f", best_ask_diff)
    log.Debugf("\nCurrent Ask: %f", current_ask)
    log.Debugf("\nOther Ask: %f", other_ask)
	log.Debugf("\nInstrument: %s", ig.Instrument)
	log.Debugf("\nunit: %f", ig.Unit)
	log.Debugf("\nPercentage: %f", ig.Percentage)


	return ig
}