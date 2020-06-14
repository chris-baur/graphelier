package hndlrs

import (
	"encoding/json"
	"net/http"
	"strconv"
	"github.com/gorilla/mux"
	"strings"
)

// FetchInstrumentGains : Sends one or more instruments's unit and percentage gain based on top of book
func FetchInstrumentGains(env *Env, w http.ResponseWriter, r *http.Request) (err error) {
	params := mux.Vars(r)

	instruments := strings.Split(params["instruments"], ",") // comma delimited list
	current_timestamp := params["current_timestamp"] //current time to compare with
	other_timestamp := params["other_timestamp"] //other time to look at to compare with current time

	currentTime, err := strconv.ParseUint(current_timestamp, 10, 64)
	if err != nil {
		return StatusError{400, err}
	}
	otherTime, err := strconv.ParseUint(other_timestamp, 10, 64)
	if err != nil {
		return StatusError{400, err}
	}

    instrumentGains, err := env.Datastore.GetInstrumentGains(instruments, currentTime, otherTime)
    if err != nil {
        return StatusError{400, err}
    }

	err = json.NewEncoder(w).Encode(instrumentGains)
	if err != nil {
		return StatusError{500, err}
	}

	return nil
}
