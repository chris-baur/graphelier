import { Colors, LightThemeColors } from './App';

export const Styles = theme => ({
    dateTimeSelect: {
        flexDirection: 'column' as const,
        alignItems: 'flex-start' as const,
        marginBottom: '20px',
    },
    inputSelect: {
        display: 'flex',
        alignItems: 'center' as const,
    },
    inputLabel: {
        display: 'inline',
        marginRight: 10,
    },
    inlineFlexEnd: {
        display: 'flex',
        marginTop: 15,
        alignItems: 'center',
    },
    timestampDisplay: {
        display: 'inline',
    },
    flex: {
        display: 'flex',
    },
    instrumentsSelectorDiv: {
        display: 'flex',
        alignItems: 'center' as const,
        height: '50px',
        maxHeight: '50px',
    },
    selectInstrumentInput: {
        width: '15rem',
        maxWidth: '15rem',
        '& div': {
            overflowY: 'auto' as const,
            maxHeight: '34px',
        },
    },
    chip: {
        margin: 2,
        backgroundColor: LightThemeColors.palette.primary.main,
        color: Colors.white,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap' as const,
    },
    block: {
        display: 'block',
        padding: '0px 24px',
    },
    scrollableWidth: {
        maxWidth: '60%',
        marginLeft: '20px',
        overflowX: 'auto' as const,
        marginBottom: '20px',
    },
});
