import { Colors, LightThemeColors } from './App';

export const Styles = theme => ({
    test: {
        color: Colors.red,
    },
    selectUnitInput: {
        width: '8rem',
    },
    selectUnitSpeedInput: {
        width: '6rem',
    },
    centerContent: {
        display: 'flex',
        paddingBottom: '0.5rem',
        justifyContent: 'center',
    },
    marginRight: {
        marginRight: theme.spacing(2),
    },
    marginLeft: {
        marginLeft: theme.spacing(2),
    },
    button: {
        backgroundColor: LightThemeColors.palette.primary.main,
        color: Colors.white,
        height: '2rem',
        padding: '0.75rem',
        alignItems: 'center',
        display: 'flex',
        marginTop: 'auto',
        transitionDuration: '0.25s',
        borderRadius: '10%',
        '&:hover': {
            backgroundColor: '#2f8cd4',
            // color: LightThemeColors.palette.primary.main,
            cursor: 'pointer',
        },
    },
    selectedButton: {
        borderBottom: '0.25rem solid black',
    },
});
