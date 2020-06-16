import React, { Component } from 'react';
import {
    Chip,
    createStyles, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, MenuItem, Select, Typography,
    withStyles,
    WithStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import bigInt from 'big-integer';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import { Styles } from '../styles/InstrumentGainContainer';
import { InstrumentGain as InstrumentGainModel } from '../models/OrderBook';
import { RootState } from '../store';
import {
    NANOSECONDS_IN_NINE_AND_A_HALF_HOURS, NANOSECONDS_IN_SIXTEEN_HOURS,
} from '../constants/Constants';
import { convertNanosecondsToUTC, dateStringToEpoch, nanosecondsToString } from '../utils/date-utils';
import NanosecondTimePicker from './NanosecondTimePicker';
import CustomLoader from './CustomLoader';
import OrderBookService from '../services/OrderBookService';
import InstrumentGain from './InstrumentGain';

const styles = theme => createStyles(Styles(theme));

interface InstrumentGainsContainerProps extends WithStyles<typeof styles>, WithSnackbarProps {
    instruments: Array<string>,
    loadingInstruments: boolean,
    datePickerValue: moment.Moment | null,
    selectedInstrument: string,
    lastSodOffset: bigInt.BigInteger,
    playback: boolean,
    currentOrderbookTimestamp: string,
}

interface InstrumentGainsContainerState {
    selectedInstruments: Array<string>,
    otherDateTimeNano: bigInt.BigInteger,
    instrumentGains: Array<InstrumentGainModel>,
    otherDatePickerValue: moment.Moment | null,
}

class InstrumentGainsContainer extends Component<InstrumentGainsContainerProps, InstrumentGainsContainerState> {
    constructor(props) {
        super(props);

        this.state = {
            selectedInstruments: [],
            otherDateTimeNano: bigInt(0),
            instrumentGains: [],
            otherDatePickerValue: null,
        };
    }

    componentDidUpdate(prevProps: Readonly<InstrumentGainsContainerProps>,
        prevState: Readonly<InstrumentGainsContainerState>, snapshot?: any): void {
        const { selectedInstrument, datePickerValue, currentOrderbookTimestamp } = this.props;
        const { selectedInstruments, otherDatePickerValue } = this.state;
        const prevSelectedInstrument = prevProps.selectedInstrument;
        const prevdatePickerValue = prevProps.datePickerValue;
        const prevCurrentOrderbookTimestamp = prevProps.currentOrderbookTimestamp;
        if (prevSelectedInstrument !== selectedInstrument) {
            if (!selectedInstruments.find(si => si === selectedInstrument)) {
                const newSelectedInstruments: Array<string> = selectedInstruments.slice();
                newSelectedInstruments.push(selectedInstrument);
                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({
                    selectedInstruments: newSelectedInstruments,
                });
            }
        }
        if (prevdatePickerValue !== datePickerValue) {
            if (prevdatePickerValue === null && otherDatePickerValue === null) this.handleChangeDate(datePickerValue);
            else this.getInstrumentsGainsComparison();
        }
        if (prevCurrentOrderbookTimestamp !== currentOrderbookTimestamp) {
            this.getInstrumentsGainsComparison();
        }
    }

    /**
     * @desc calls service to get the instrument gains and compare them
     */
    getInstrumentsGainsComparison = () => {
        const { playback } = this.props;
        if (this.checkValidData() && !playback) {
            const { selectedInstruments, otherDateTimeNano } = this.state;
            const { currentOrderbookTimestamp } = this.props;
            OrderBookService.getInstrumentGains(selectedInstruments.toString(), currentOrderbookTimestamp,
                otherDateTimeNano.toString()).then(response => {
                this.setState({
                    instrumentGains: response.data,
                });
            });
        }
    };

    /**
     * @desc Checks to see that the variables for instrument comparison are valid and can be used for a service call
     * @returns {boolean}
     */
    checkValidData = () : boolean => {
        const { otherDatePickerValue, selectedInstruments, otherDateTimeNano } = this.state;
        let valid = false;
        if (selectedInstruments.length > 0 && otherDateTimeNano.valueOf() !== 0
            && otherDatePickerValue !== null) valid = true;
        return valid;
    };

    /**
     * @desc Handles the date change for the TextField date picker
     * @param date The selected date
     */
    handleChangeDate = (date: any) => {
        if (!moment(date).isValid()) return;
        const { otherDateTimeNano, otherDatePickerValue } = this.state;

        let newOtherTimeNano = bigInt(NANOSECONDS_IN_NINE_AND_A_HALF_HOURS);
        const newOtherDateString = date.format('YYYY-MM-DD');
        const newOtherDateNano = convertNanosecondsToUTC(dateStringToEpoch(`${newOtherDateString} 00:00:00`));
        // check if a date was previously picked
        if (otherDatePickerValue) {
            const stateDateNano = convertNanosecondsToUTC(
                dateStringToEpoch(`${otherDatePickerValue.format('YYYY-MM-DD')} 00:00:00`),
            );
            const stateTimeNano = otherDateTimeNano.mod(stateDateNano);
            // check if a time was previously picked
            if (stateTimeNano.neq(0)) {
                newOtherTimeNano = stateTimeNano;
            }
        }
        const newOtherDateTimeNano = newOtherDateNano.plus(newOtherTimeNano);

        this.setState(
            {
                otherDatePickerValue: date,
                otherDateTimeNano: newOtherDateTimeNano,
            },
            () => this.getInstrumentsGainsComparison(),
        );
    };

    /**
     * @desc Handles the change for a valid NanoSecond time change in the NanoSecondTimePicker component
     * @param nanoTime
     */
    handleNanoSecondTimeChange = (nanoTime: bigInt.BigInteger) => {
        const { otherDatePickerValue } = this.state;
        const otherDateString = otherDatePickerValue?.format('YYYY-MM-DD');
        const otherDateNano = convertNanosecondsToUTC(dateStringToEpoch(`${otherDateString} 00:00:00`));
        const otherDateTimeNano = otherDateNano.plus(nanoTime);
        this.setState({
            otherDateTimeNano,
        }, () => this.getInstrumentsGainsComparison());
    };

    /**
     * @desc Handles the change in the instruments selected
     * @param event
     */
    handleInstrumentsChange = (event: React.ChangeEvent<any>) => {
        this.setState({
            selectedInstruments: event.target.value as string[],
        }, () => this.getInstrumentsGainsComparison());
    };

    render() {
        const {
            classes, selectedInstrument, playback, loadingInstruments, instruments,
        } = this.props;
        const {
            otherDatePickerValue, instrumentGains, selectedInstruments,
        } = this.state;
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography
                        variant={'body1'}
                        className={classes.inputLabel}
                        color={'textSecondary'}
                    >
                        {'Compare Instruments'}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.block}>
                    <div className={classes.flex}>
                        <div>
                            <div className={classes.instrumentsSelectorDiv}>
                                <Typography
                                    variant={'body1'}
                                    className={classes.inputLabel}
                                    color={'textSecondary'}
                                >
                                    {'Instruments'}
                                </Typography>
                                {loadingInstruments ? (
                                    <div className={classes.flex}>
                                        <CustomLoader
                                            size={'1rem'}
                                            type={'circular'}
                                        />
                                    </div>
                                ) : (
                                    <Select
                                        id={'instrumentsSelector'}
                                        multiple
                                        value={selectedInstruments}
                                        onChange={this.handleInstrumentsChange}
                                        className={classes.selectInstrumentInput}
                                        disabled={playback}
                                        renderValue={selected => (
                                            <div className={classes.chips}>
                                                {(selected as string[]).map(value => (
                                                    <Chip
                                                        key={value}
                                                        label={value}
                                                        className={classes.chip}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    >
                                        {
                                            instruments.map(value => {
                                                return (
                                                    <MenuItem
                                                        key={`menuitem-${value}`}
                                                        value={value}
                                                    >
                                                        {value}
                                                    </MenuItem>

                                                );
                                            })
                                        }
                                    </Select>
                                )}
                            </div>
                            <div
                                className={classes.dateTimeSelect}
                            >
                                <div
                                    className={classes.inputSelect}
                                >
                                    <Typography
                                        variant={'body1'}
                                        className={classes.inputLabel}
                                        color={'textSecondary'}
                                    >
                                        {'Date'}
                                    </Typography>
                                    <KeyboardDatePicker
                                        value={otherDatePickerValue}
                                        onChange={date => this.handleChangeDate(date)}
                                        placeholder={'MM/DD/YYYY'}
                                        format={'MM/DD/YYYY'}
                                        views={['year', 'month', 'date']}
                                        openTo={'year'}
                                        disabled={playback}
                                        invalidDateMessage={'invalid date'}
                                        disableFuture
                                        autoOk
                                    />
                                </div>
                                <div className={classes.inlineFlexEnd}>
                                    <Typography
                                        variant={'body1'}
                                        className={classes.inputLabel}
                                        color={'textSecondary'}
                                    >
                                        {'Time'}
                                    </Typography>
                                    <Typography
                                        variant={'body1'}
                                        className={classes.timestampDisplay}
                                        color={selectedInstrument.length !== 0 ? 'textPrimary' : 'textSecondary'}
                                    >
                                        <NanosecondTimePicker
                                            onChange={this.handleNanoSecondTimeChange}
                                            lowerLimit={NANOSECONDS_IN_NINE_AND_A_HALF_HOURS}
                                            upperLimit={NANOSECONDS_IN_SIXTEEN_HOURS}
                                            defaultNanoValue={NANOSECONDS_IN_NINE_AND_A_HALF_HOURS}
                                            defaultStringValue={nanosecondsToString(NANOSECONDS_IN_NINE_AND_A_HALF_HOURS
                                                .valueOf())}
                                            disable={playback}
                                        />
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className={classNames(classes.flex, classes.scrollableWidth)}>
                            {
                                instrumentGains.map(value => {
                                    return (
                                        <InstrumentGain
                                            instrumentGain={value}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export const NonConnectedInstrumentGainsContainer = withStyles(styles)(InstrumentGainsContainer);

const mapStateToProps = (state: RootState) => ({
    currentOrderbookTimestamp: state.general.currentOrderbookTimestamp,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default withStyles(styles)(withSnackbar(connect(mapStateToProps, mapDispatchToProps)(InstrumentGainsContainer)));
