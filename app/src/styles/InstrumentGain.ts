import { Colors, LightThemeColors } from './App';

export const Styles = theme => ({
    container: {
        padding: '16px',
        paddingBottom: '24px',
        marginRight: '10px',
        fontSize: '1rem',
        color: Colors.white,
        borderRadius: '10%',
        minWidth: '150px',
        width: 'fit-content' as const,
        backgroundColor: `rgba(${LightThemeColors.palette.primary.mainRGBValues},0.7)`,
    },
    center: {
        textAlign: 'center' as const,
    },
    bold: {
        fontWeight: 'bold' as const,
    },
    positive: {
        color: '#009933',
    },
    negative: {
        color: '#ff0000',
    },
    flex: {
        display: 'flex',
    },
    titleSpacing: {
        paddingRight: '10px',
        marginRight: 'auto' as const,
    },
    valueSpacing: {
        marginLeft: 'auto' as const,
    },
});
