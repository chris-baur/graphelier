import React from 'react';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { Select } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import {
    DATE_MOMENT,
    INSTRUMENTGGAINSCONTAINER_INFORMATION, TIMESTAMP_PM,
} from '../utils/mock-data';
import OrderBookService from '../../services/OrderBookService';
import InstrumentGainsContainer, { NonConnectedInstrumentGainsContainer }
    from '../../components/InstrumentGainsContainer';

describe('selecting an instrument functionality', () => {
    let mount, shallow, props, enqueueSnackbar, closeSnackbar;

    const getInstrumentsGainSpy = jest.spyOn(OrderBookService, 'getInstrumentGains')
        .mockImplementation((): Promise<any> => Promise.resolve(INSTRUMENTGGAINSCONTAINER_INFORMATION.data)
            .catch(err => {
                console.log(err);
            }));

    beforeEach(() => {
        mount = createMount();
        shallow = createShallow({ dive: true });
        enqueueSnackbar = jest.fn();
        closeSnackbar = jest.fn();
        props = {
            instruments: INSTRUMENTGGAINSCONTAINER_INFORMATION.instruments,
            loadingInstruments: INSTRUMENTGGAINSCONTAINER_INFORMATION.loadingInstruments,
            datePickerValue: INSTRUMENTGGAINSCONTAINER_INFORMATION.datePickerValue,
            selectedInstrument: INSTRUMENTGGAINSCONTAINER_INFORMATION.selectedInstrument,
            lastSodOffset: INSTRUMENTGGAINSCONTAINER_INFORMATION.lastSodOffset,
            playback: INSTRUMENTGGAINSCONTAINER_INFORMATION.playback,
            currentOrderbookTimestamp: INSTRUMENTGGAINSCONTAINER_INFORMATION.currentOrderbookTimestamp,
        };
    });

    afterEach(() => {
        mount.cleanUp();
        getInstrumentsGainSpy.mockClear();
    });

    it('renders a InstrumentGainsContainer component and simulate selecting instruments', () => {
        const wrapper = shallow(
            <NonConnectedInstrumentGainsContainer
                instruments={props.instruments}
                loadingInstruments={props.loadingInstruments}
                datePickerValue={props.datePickerValue}
                lastSodOffset={props.lastSodOffset}
                playback={props.playback}
                selectedInstrument={props.selectedInstrument}
                currentOrderbookTimestamp={props.currentOrderbookTimestamp}
                enqueueSnackbar={enqueueSnackbar}
                closeSnackbar={closeSnackbar}
            />,
        );
        wrapper.find('#instrumentsSelector').simulate('click');
        expect(wrapper.state().selectedInstruments).toStrictEqual([]);
        wrapper.find(Select).simulate('change', { target: { value: 'SPY' } });
        expect(wrapper.state().selectedInstruments).toBe('SPY');
    });
});

describe('date and time picker functionality', () => {
    let mount, shallow, props, enqueueSnackbar, closeSnackbar;

    const getInstrumentsGainSpy = jest.spyOn(OrderBookService, 'getInstrumentGains')
        .mockImplementation((): Promise<any> => Promise.resolve(INSTRUMENTGGAINSCONTAINER_INFORMATION.data)
            .catch(err => {
                console.log(err);
            }));

    beforeEach(() => {
        mount = createMount();
        shallow = createShallow({ dive: true });
        enqueueSnackbar = jest.fn();
        closeSnackbar = jest.fn();
        props = {
            instruments: INSTRUMENTGGAINSCONTAINER_INFORMATION.instruments,
            loadingInstruments: INSTRUMENTGGAINSCONTAINER_INFORMATION.loadingInstruments,
            datePickerValue: INSTRUMENTGGAINSCONTAINER_INFORMATION.datePickerValue,
            selectedInstrument: INSTRUMENTGGAINSCONTAINER_INFORMATION.selectedInstrument,
            lastSodOffset: INSTRUMENTGGAINSCONTAINER_INFORMATION.lastSodOffset,
            playback: INSTRUMENTGGAINSCONTAINER_INFORMATION.playback,
            currentOrderbookTimestamp: INSTRUMENTGGAINSCONTAINER_INFORMATION.currentOrderbookTimestamp,
        };
    });

    afterEach(() => {
        getInstrumentsGainSpy.mockClear();
        mount.cleanUp();
    });

    it('renders an InstrumentGainsContainer component without crashing', () => {
        shallow(
            <InstrumentGainsContainer
                instruments={props.instruments}
                loadingInstruments={props.loadingInstruments}
                datePickerValue={props.datePickerValue}
                lastSodOffset={props.lastSodOffset}
                playback={props.playback}
                selectedInstrument={props.selectedInstrument}
            />,
        );
    });

    it('Selects a Date, expect handlers to be called', () => {
        const wrapper = shallow(
            <NonConnectedInstrumentGainsContainer
                instruments={props.instruments}
                loadingInstruments={props.loadingInstruments}
                datePickerValue={props.datePickerValue}
                lastSodOffset={props.lastSodOffset}
                playback={props.playback}
                selectedInstrument={props.selectedInstrument}
                currentOrderbookTimestamp={props.currentOrderbookTimestamp}
                enqueueSnackbar={enqueueSnackbar}
                closeSnackbar={closeSnackbar}
            />,
        );
        const handleChangeDate = jest.spyOn(wrapper.instance(), 'handleChangeDate');
        const getInstrumentsGainsComparison = jest.spyOn(wrapper.instance(), 'getInstrumentsGainsComparison');
        const checkValidData = jest.spyOn(wrapper.instance(), 'checkValidData');
        wrapper.find(KeyboardDatePicker).simulate('change', DATE_MOMENT);

        expect(handleChangeDate).toHaveBeenCalledTimes(1);
        expect(getInstrumentsGainsComparison).toHaveBeenCalledTimes(1);
        expect(checkValidData).toHaveBeenCalledTimes(1);
        expect(getInstrumentsGainSpy).toHaveBeenCalledTimes(0);
    });
});

describe('servce calls when all selected data is valid', () => {
    let mount, shallow, props, enqueueSnackbar, closeSnackbar;

    const getInstrumentsGainSpy = jest.spyOn(OrderBookService, 'getInstrumentGains')
        .mockImplementation((): Promise<any> => Promise.resolve(INSTRUMENTGGAINSCONTAINER_INFORMATION.data)
            .catch(err => {
                console.log(err);
            }));

    beforeEach(() => {
        mount = createMount();
        shallow = createShallow({ dive: true });
        enqueueSnackbar = jest.fn();
        closeSnackbar = jest.fn();
        props = {
            instruments: INSTRUMENTGGAINSCONTAINER_INFORMATION.instruments,
            loadingInstruments: INSTRUMENTGGAINSCONTAINER_INFORMATION.loadingInstruments,
            datePickerValue: INSTRUMENTGGAINSCONTAINER_INFORMATION.datePickerValue,
            selectedInstrument: INSTRUMENTGGAINSCONTAINER_INFORMATION.selectedInstrument,
            lastSodOffset: INSTRUMENTGGAINSCONTAINER_INFORMATION.lastSodOffset,
            playback: INSTRUMENTGGAINSCONTAINER_INFORMATION.playback,
            currentOrderbookTimestamp: INSTRUMENTGGAINSCONTAINER_INFORMATION.currentOrderbookTimestamp,
        };
    });

    afterEach(() => {
        mount.cleanUp();
        getInstrumentsGainSpy.mockClear();
    });

    it('renders a InstrumentGainsContainer component and simulate selecting instruments', () => {
        const wrapper = shallow(
            <NonConnectedInstrumentGainsContainer
                instruments={props.instruments}
                loadingInstruments={props.loadingInstruments}
                datePickerValue={props.datePickerValue}
                lastSodOffset={props.lastSodOffset}
                playback={props.playback}
                selectedInstrument={props.selectedInstrument}
                currentOrderbookTimestamp={props.currentOrderbookTimestamp}
                enqueueSnackbar={enqueueSnackbar}
                closeSnackbar={closeSnackbar}
            />,
        );

        wrapper.setState({
            selectedInstruments: ['SPY'],
            otherDateTimeNano: TIMESTAMP_PM,
        });
        const handleChangeDate = jest.spyOn(wrapper.instance(), 'handleChangeDate');
        const getInstrumentsGainsComparison = jest.spyOn(wrapper.instance(), 'getInstrumentsGainsComparison');
        const checkValidData = jest.spyOn(wrapper.instance(), 'checkValidData');
        wrapper.find(KeyboardDatePicker).simulate('change', DATE_MOMENT);

        expect(handleChangeDate).toHaveBeenCalledTimes(1);
        expect(getInstrumentsGainsComparison).toHaveBeenCalledTimes(1);
        expect(checkValidData).toHaveBeenCalledTimes(1);
        expect(getInstrumentsGainSpy).toHaveBeenCalledTimes(1);
    });
});
