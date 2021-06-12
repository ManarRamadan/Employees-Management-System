import React, { useState } from 'react'
import { Header, SideDrawer } from '../../components/ui'
import { homeVariables } from "../../config/home";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = homeVariables.sideDrawerWidth;
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex'
    },
    page: {
        width: '100%',
        padding: theme.spacing(3),
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0
    },
}));
export default function Layout(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const handleDrawerToggle = () => {
        setOpen(!open);
    };
    return (
        <div className={classes.root}>
            <Header onThemeChange={props.onThemeChange} handleDrawerToggle={handleDrawerToggle} open={open} />
            <SideDrawer open={open} />
            {/* main content */}
            < div className={clsx(classes.page, classes.content, {
                [classes.contentShift]: open,
            })} >
                <div className={classes.drawerHeader} />

                {props.children}
            </div>
        </div>

    )

}