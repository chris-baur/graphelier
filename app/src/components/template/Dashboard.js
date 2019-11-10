import React from 'react';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
    Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, Container,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import { mainListItems } from './listItems';
import { Styles as OBStyles } from '../../styles/OrderBookSnapshot';
import OrderBookSnapshot from '../OrderBookSnapshot';
import { Styles } from '../../styles/Dashboard';

/**
 * @description Returns main componenet for the template
 */
const Dashboard = () => {
    const classes = Styles();
    const [open, setOpen] = React.useState(false);

    /**
     * @description Handles opening the left menu drawer
     */
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    /**
     * @description Handles closing the left menu drawer
     */
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position={'absolute'}
                className={classNames(classes.appBar, open && classes.appBarShift)}
                theme={OBStyles.themeBackground}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge={'start'}
                        color={'inherit'}
                        aria-label={'open drawer'}
                        onClick={handleDrawerOpen}
                        className={classNames(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component={'h1'}
                        variant={'h6'}
                        color={'inherit'}
                        noWrap
                        className={classes.title}
                    >
                        Graphelier
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant={'permanent'}
                classes={{
                    paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container className={classes.container}>
                    <OrderBookSnapshot />
                </Container>
            </main>
        </div>
    );
};

export default Dashboard;