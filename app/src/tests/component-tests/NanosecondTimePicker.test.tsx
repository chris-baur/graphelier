import React from 'react';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { Select, TextField } from '@material-ui/core';
import { NANOSECONDTIMEPICKER_INFORMATION } from '../utils/mock-data';
import { NonConnectedNanosecondTimePicker as NanosecondTimePicker } from '../../components/NanosecondTimePicker';

describe('Basic rendering', () => {
    let mount, shallow, props, enqueueSnackbar, closeSnackbar;

    beforeEach(() => {
        mount = createMount();
        shallow = createShallow({ dive: true });
        enqueueSnackbar = jest.fn();
        closeSnackbar = jest.fn();
        props = {
            onChange: jest.fn(),
            lowerLimit: NANOSECONDTIMEPICKER_INFORMATION.lowerLimit,
            upperLimit: NANOSECONDTIMEPICKER_INFORMATION.upperLimit,
            defaultStringValue: NANOSECONDTIMEPICKER_INFORMATION.defaultStringValue,
            disable: NANOSECONDTIMEPICKER_INFORMATION.disable,
        };
    });

    afterEach(() => {
        mount.cleanUp();
    });

    it('renders an NanosecondTimePicker component without crashing', () => {
        shallow(
            <NanosecondTimePicker
                onChange={props.onChange}
                lowerLimit={props.lowerLimit}
                upperLimit={props.upperLimit}
                defaultStringValue={props.defaultStringValue}
                disable={props.disable}
                enqueueSnackbar={enqueueSnackbar}
                closeSnackbar={closeSnackbar}
            />,
        );
    });
});

describe('time picker functionality', () => {
    let mount, shallow, props, enqueueSnackbar, closeSnackbar;

    beforeEach(() => {
        mount = createMount();
        shallow = createShallow({ dive: true });
        enqueueSnackbar = jest.fn();
        closeSnackbar = jest.fn();
        props = {
            onChange: jest.fn(),
            lowerLimit: NANOSECONDTIMEPICKER_INFORMATION.lowerLimit,
            upperLimit: NANOSECONDTIMEPICKER_INFORMATION.upperLimit,
            defaultStringValue: NANOSECONDTIMEPICKER_INFORMATION.defaultStringValue,
            disable: NANOSECONDTIMEPICKER_INFORMATION.disable,
        };
    });

    afterEach(() => {
        mount.cleanUp();
    });

    it('Selects an invalid Time for AM, expect handlers to be called', () => {
        const wrapper = shallow(
            <NanosecondTimePicker
                onChange={props.onChange}
                lowerLimit={props.lowerLimit}
                upperLimit={props.upperLimit}
                defaultStringValue={props.defaultStringValue}
                disable={props.disable}
                enqueueSnackbar={enqueueSnackbar}
                closeSnackbar={closeSnackbar}
            />,
        );
        wrapper.setState({
            period: 'AM',
        });
        wrapper.instance().forceUpdate();
        const handleTimeChange = jest.spyOn(wrapper.instance(), 'handleTimeChange');
        const checkValidNanoTime = jest.spyOn(wrapper.instance(), 'checkValidNanoTime');
        wrapper.instance().forceUpdate();
        wrapper.find(TextField).simulate('change', { target: { value: '12:30:00.000000000' } });

        expect(handleTimeChange).toHaveBeenCalledTimes(1);
        expect(checkValidNanoTime).toHaveBeenCalledTimes(1);
        expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
        expect(props.onChange).toHaveBeenCalledTimes(0);
        expect(wrapper.state().valid).toBe(false);
    });

    it('Selects an invalid Time for PM, expect handlers to be called', () => {
        const wrapper = shallow(
            <NanosecondTimePicker
                onChange={props.onChange}
                lowerLimit={props.lowerLimit}
                upperLimit={props.upperLimit}
                defaultStringValue={props.defaultStringValue}
                disable={props.disable}
                enqueueSnackbar={enqueueSnackbar}
                closeSnackbar={closeSnackbar}
            />,
        );
        wrapper.setState({
            period: 'PM',
        });

        const handleTimeChange = jest.spyOn(wrapper.instance(), 'handleTimeChange');
        const checkValidNanoTime = jest.spyOn(wrapper.instance(), 'checkValidNanoTime');
        wrapper.instance().forceUpdate();
        wrapper.find(TextField).simulate('change', { target: { value: '09:30:00.000000000' } });

        expect(handleTimeChange).toHaveBeenCalledTimes(1);
        expect(checkValidNanoTime).toHaveBeenCalledTimes(1);
        expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
        expect(props.onChange).toHaveBeenCalledTimes(0);
        expect(wrapper.state().valid).toBe(false);
    });

    it('Selects invalid AM for time, expect handlers to be called', () => {
        const wrapper = shallow(
            <NanosecondTimePicker
                onChange={props.onChange}
                lowerLimit={props.lowerLimit}
                upperLimit={props.upperLimit}
                defaultStringValue={props.defaultStringValue}
                disable={props.disable}
                enqueueSnackbar={enqueueSnackbar}
                closeSnackbar={closeSnackbar}
            />,
        );
        wrapper.setState({
            period: 'PM',
            stringValue: '12:30:00.000000000',
        });
        const handlePeriodChange = jest.spyOn(wrapper.instance(), 'handlePeriodChange');
        const checkValidNanoTime = jest.spyOn(wrapper.instance(), 'checkValidNanoTime');
        wrapper.instance().forceUpdate();
        wrapper.find(Select).simulate('change', { target: { value: 'AM' } });

        expect(handlePeriodChange).toHaveBeenCalledTimes(1);
        expect(checkValidNanoTime).toHaveBeenCalledTimes(1);
        expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
        expect(props.onChange).toHaveBeenCalledTimes(0);
        expect(wrapper.state().valid).toBe(false);
    });

    it('Selects invalid PM for time, expect handlers to be called', () => {
        const wrapper = shallow(
            <NanosecondTimePicker
                onChange={props.onChange}
                lowerLimit={props.lowerLimit}
                upperLimit={props.upperLimit}
                defaultStringValue={props.defaultStringValue}
                disable={props.disable}
                enqueueSnackbar={enqueueSnackbar}
                closeSnackbar={closeSnackbar}
            />,
        );
        wrapper.setState({
            period: 'AM',
            stringValue: '10:30:00.000000000',
        });
        const handlePeriodChange = jest.spyOn(wrapper.instance(), 'handlePeriodChange');
        const checkValidNanoTime = jest.spyOn(wrapper.instance(), 'checkValidNanoTime');
        wrapper.instance().forceUpdate();
        wrapper.find(Select).simulate('change', { target: { value: 'PM' } });

        expect(handlePeriodChange).toHaveBeenCalledTimes(1);
        expect(checkValidNanoTime).toHaveBeenCalledTimes(1);
        expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
        expect(props.onChange).toHaveBeenCalledTimes(0);
        expect(wrapper.state().valid).toBe(false);
    });

    it('Selects valid Time for AM, expect handlers to be called', () => {
        const wrapper = shallow(
            <NanosecondTimePicker
                onChange={props.onChange}
                lowerLimit={props.lowerLimit}
                upperLimit={props.upperLimit}
                defaultStringValue={props.defaultStringValue}
                disable={props.disable}
                enqueueSnackbar={enqueueSnackbar}
                closeSnackbar={closeSnackbar}
            />,
        );
        wrapper.setState({
            period: 'AM',
        });
        const handleTimeChange = jest.spyOn(wrapper.instance(), 'handleTimeChange');
        const checkValidNanoTime = jest.spyOn(wrapper.instance(), 'checkValidNanoTime');
        wrapper.instance().forceUpdate();
        wrapper.find(TextField).simulate('change', { target: { value: '11:30:00.000000000' } });

        expect(handleTimeChange).toHaveBeenCalledTimes(1);
        expect(checkValidNanoTime).toHaveBeenCalledTimes(1);
        expect(enqueueSnackbar).toHaveBeenCalledTimes(0);
        expect(props.onChange).toHaveBeenCalledTimes(1);
        expect(wrapper.state().valid).toBe(true);
    });

    it('Selects valid Time for PM, expect handlers to be called', () => {
        const wrapper = shallow(
            <NanosecondTimePicker
                onChange={props.onChange}
                lowerLimit={props.lowerLimit}
                upperLimit={props.upperLimit}
                defaultStringValue={props.defaultStringValue}
                disable={props.disable}
                enqueueSnackbar={enqueueSnackbar}
                closeSnackbar={closeSnackbar}
            />,
        );
        wrapper.setState({
            period: 'PM',
        });
        const handleTimeChange = jest.spyOn(wrapper.instance(), 'handleTimeChange');
        const checkValidNanoTime = jest.spyOn(wrapper.instance(), 'checkValidNanoTime');
        wrapper.instance().forceUpdate();
        wrapper.find(TextField).simulate('change', { target: { value: '03:30:00.000000000' } });

        expect(handleTimeChange).toHaveBeenCalledTimes(1);
        expect(checkValidNanoTime).toHaveBeenCalledTimes(1);
        expect(enqueueSnackbar).toHaveBeenCalledTimes(0);
        expect(props.onChange).toHaveBeenCalledTimes(1);
        expect(wrapper.state().valid).toBe(true);
    });

    it('Selects valid AM for time, expect handlers to be called', () => {
        const wrapper = shallow(
            <NanosecondTimePicker
                onChange={props.onChange}
                lowerLimit={props.lowerLimit}
                upperLimit={props.upperLimit}
                defaultStringValue={props.defaultStringValue}
                disable={props.disable}
                enqueueSnackbar={enqueueSnackbar}
                closeSnackbar={closeSnackbar}
            />,
        );
        wrapper.setState({
            period: 'PM',
            stringValue: '11:30:00.000000000',
        });
        const handlePeriodChange = jest.spyOn(wrapper.instance(), 'handlePeriodChange');
        const checkValidNanoTime = jest.spyOn(wrapper.instance(), 'checkValidNanoTime');
        wrapper.instance().forceUpdate();
        wrapper.find(Select).simulate('change', { target: { value: 'AM' } });

        expect(handlePeriodChange).toHaveBeenCalledTimes(1);
        expect(checkValidNanoTime).toHaveBeenCalledTimes(1);
        expect(enqueueSnackbar).toHaveBeenCalledTimes(0);
        expect(props.onChange).toHaveBeenCalledTimes(1);
        expect(wrapper.state().valid).toBe(true);
    });

    it('Selects valid PM for time, expect handlers to be called', () => {
        const wrapper = shallow(
            <NanosecondTimePicker
                onChange={props.onChange}
                lowerLimit={props.lowerLimit}
                upperLimit={props.upperLimit}
                defaultStringValue={props.defaultStringValue}
                disable={props.disable}
                enqueueSnackbar={enqueueSnackbar}
                closeSnackbar={closeSnackbar}
            />,
        );

        wrapper.setState({
            period: 'AM',
            stringValue: '03:30:00.000000000',
        });

        const handlePeriodChange = jest.spyOn(wrapper.instance(), 'handlePeriodChange');
        const checkValidNanoTime = jest.spyOn(wrapper.instance(), 'checkValidNanoTime');
        wrapper.instance().forceUpdate();
        wrapper.find(Select).first().simulate('change', { target: { value: 'PM' } });

        expect(handlePeriodChange).toHaveBeenCalledTimes(1);
        expect(checkValidNanoTime).toHaveBeenCalledTimes(1);
        expect(enqueueSnackbar).toHaveBeenCalledTimes(0);
        expect(props.onChange).toHaveBeenCalledTimes(1);
        expect(wrapper.state().valid).toBe(true);
    });
});
