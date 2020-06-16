import React, { Component } from 'react';
import {
    createStyles, InputLabel, MenuItem, Select, TextField,
    withStyles,
    WithStyles,
} from '@material-ui/core';
// import classNames from 'classnames';
import bigInt from 'big-integer';
import { withSnackbar, WithSnackbarProps } from 'notistack';

import { Styles } from '../styles/NanosecondTimePicker';
import { stringToNanoseconds } from '../utils/date-utils';

const styles = theme => createStyles(Styles(theme));

interface NanosecondTImePickerProps extends WithStyles<typeof styles>, WithSnackbarProps {
    onChange: Function,
    lowerLimit: bigInt.BigInteger,
    upperLimit: bigInt.BigInteger,
    defaultNanoValue: bigInt.BigInteger,
    defaultStringValue: string,
    disable: boolean,

}

interface NanosecondTImePickerState {
    valid: boolean,
    period: string,
    nanoValue: bigInt.BigInteger,
    stringValue: string,
}
// matches AM PM times
const regex = new RegExp('^(?:0[0-9]:[0-5][0-9]:[0-5][0-9]\\.\\d{9})$|^(?:1[0-2]:[0-5][0-9]:[0-5][0-9]\\.\\d{9})$');
const periodOptions: Array<string> = ['AM', 'PM'];

class NanosecondTimePicker extends Component<NanosecondTImePickerProps, NanosecondTImePickerState> {
    static defaultProps = {
        onChange: () => {},
        lowerLimit: bigInt(0),
        upperLimit: bigInt(0),
        defaultNanoValue: bigInt(0),
        defaultStringValue: '00:00:00.000000000',
    };

    constructor(props) {
        super(props);

        const { defaultStringValue, defaultNanoValue } = this.props;
        let defaultString = defaultStringValue;
        if (defaultStringValue.includes('AM') || defaultStringValue.includes('PM')) {
            defaultString = defaultStringValue.substring(0, defaultStringValue.length - 2).trim();
        }

        this.state = {
            valid: true,
            period: periodOptions[0],
            nanoValue: defaultNanoValue,
            stringValue: defaultString,
        };
    }

    /**
     * @desc checks if the current value in nanoseconds for the current period is valid
     *
     * @param nanoTime {string}
     * @param period {string}
     *
     * @returns {boolean}
     */
    checkValidNanoTime = (value: string, period: string) : boolean => {
        const { onChange, upperLimit, lowerLimit } = this.props;
        let valid = false;
        const result = regex.test(value);
        // const res2 = value.match(regex);
        if (result) {
            const nanoValue = stringToNanoseconds(value.concat(` ${period}`));
            if (!nanoValue.greater(upperLimit)) {
                if (!nanoValue.lesser(lowerLimit)) {
                    valid = true;
                    this.setState({
                        nanoValue,
                    }, () => onChange(nanoValue));
                }
            }
        }
        return valid;
    };

    /**
     * @desc Handles the change in the time TextField
     *
     * @param event
     */
    handleTimeChange = (event: React.ChangeEvent<any>) => {
        const { enqueueSnackbar } = this.props;
        const { period } = this.state;
        const val = event.target.value;
        let valid: boolean = false;
        valid = this.checkValidNanoTime(val, period);
        if (!valid && val.length === 18) enqueueSnackbar('Invalid Time given the current Period', { variant: 'error' });
        this.setState({
            valid,
            stringValue: val,
        });
    };

    /**
     * @desc Handles the change in the Period (AM or PM)
     *
     * @param event
     */
    handlePeriodChange = (event: React.ChangeEvent<any>) => {
        const { stringValue } = this.state;
        const { enqueueSnackbar } = this.props;
        const period = event.target.value;
        const valid = this.checkValidNanoTime(stringValue, period);
        if (!valid) enqueueSnackbar('Invalid Period given the current time', { variant: 'error' });

        this.setState({
            period,
            valid,
        });
    };


    render() {
        const {
            valid, period, nanoValue, stringValue,
        } = this.state;
        const { classes, disable } = this.props;

        console.log(`nano value: ${nanoValue}`);
        console.log(`string value: ${stringValue}`);
        return (
            <div className={classes.flex}>
                <TextField
                    defaultValue={stringValue}
                    onChange={this.handleTimeChange}
                    error={!valid}
                    disabled={disable}
                />
                <InputLabel
                    className={classes.periodLabel}
                    id={'label-AM-PM'}
                >
Period
                </InputLabel>
                <Select
                    labelId={'label-AM-PM'}
                    id={'select-AM-PM'}
                    value={period}
                    onChange={this.handlePeriodChange}
                >
                    {
                        periodOptions.map((value, index) => {
                            return (
                                <MenuItem value={value}>{value}</MenuItem>
                            );
                        })
                    }
                </Select>

            </div>
        );
    }
}

export default withStyles(styles)(withSnackbar(NanosecondTimePicker));
