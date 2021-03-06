import {
    GeneralActions,
    GeneralState,
    SAVE_ORDERBOOK_TIMESTAMP_INFO,
    SAVE_REACT_APP_NAME,
    SET_DISABLE_TRANSITIONS,
    SHOW_ORDER_INFO_DRAWER,
} from '../actions/types';

const initialState : GeneralState = {
    appName: '',
    orderDetails: undefined,
    showOrderInfoDrawer: false,
    currentOrderbookTimestamp: '',
    lastModificationType: undefined,
    disableTransitions: false,

};

const generalReducers = (state = initialState, action : GeneralActions) : GeneralState => {
    switch (action.type) {
    case SAVE_REACT_APP_NAME:
        return {
            ...state,
            appName: action.payload,
        };
    case SAVE_ORDERBOOK_TIMESTAMP_INFO:
        return {
            ...state,
            currentOrderbookTimestamp: action.payload.currentOrderbookTimestamp,
            lastModificationType: action.payload.lastModificationType,
        };
    case SHOW_ORDER_INFO_DRAWER:
        return {
            ...state,
            showOrderInfoDrawer: action.payload.showOrderInfoDrawer,
            orderDetails: action.payload.orderDetails,
        };
    case SET_DISABLE_TRANSITIONS:
        return {
            ...state,
            disableTransitions: action.payload,
        };
    default: return state;
    }
};

export default generalReducers;
