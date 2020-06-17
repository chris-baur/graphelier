import React, { Component } from 'react';
import {
    createStyles,
    withStyles,
    WithStyles,
} from '@material-ui/core';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import classNames from 'classnames';
import { InstrumentGain as InstrumentGainModel } from '../models/OrderBook';
import { Styles } from '../styles/InstrumentGain';
import { RootState } from '../store';

const styles = theme => createStyles(Styles(theme));

interface InstrumentGainProps extends WithStyles<typeof styles> {
    instrumentGain: InstrumentGainModel,
}

interface InstrumentGainState {
}

class InstrumentGain extends Component<InstrumentGainProps, InstrumentGainState> {
    render() {
        const {
            instrumentGain, classes,
        } = this.props;

        const fontColor = instrumentGain.unit >= 0 ? classes.positive : classes.negative;

        return (
            <div
                className={classes.container}
            >
                <div className={classNames(classes.center, classes.bold)}>{instrumentGain.instrument}</div>
                <div className={classNames(classes.flex)}>
                    <div className={classes.titleSpacing}>{'Unit ($):'}</div>
                    <div className={classNames(fontColor, classes.bold)}>{`${instrumentGain.unit}`}</div>
                </div>
                <div className={classNames(classes.flex)}>
                    <div className={classes.titleSpacing}>{'Percent (%):'}</div>
                    <div className={classNames(fontColor, classes.bold)}>{`${instrumentGain.percentage}`}</div>
                </div>
            </div>
        );
    }
}

export const NonConnectedInstrumentGain = withStyles(styles)(InstrumentGain);

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(InstrumentGain));
