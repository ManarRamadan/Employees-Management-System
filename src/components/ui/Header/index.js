
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Switch } from '@material-ui/core'
import clsx from 'clsx';
import { homeVariables } from "../../../config/home";
const drawerWidth = homeVariables.sideDrawerWidth;
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    avatar: {
        marginLeft: theme.spacing(2),
    },
    day: {
        fontWeight: 400,
        fontSize: 15
    }
}));

export const Header = (props) => {
    const classes = useStyles();
    const currentUser = "Manar Ramadan"
    const [mode, setMode] = useState(useTheme().palette.type);
    const [hour, setHour] = useState(null);
    const [time, setTime] = useState(null);
    const [date, setDate] = useState(null);
    useEffect(() => {
        props.onThemeChange(mode);
        return () => { };
    }, [mode, props]);
    const handleThemeChange = (e, checked) => {
        setMode(checked ? "dark" : "light");
    };
    const getToday = () => {
        const date = new Date()
        const currentDate = date.toDateString().split(' ');
        const today = currentDate[0] + ' ' + currentDate[1] + ' ' + currentDate[2] + ', ' + currentDate[3]
        const hour = date.getHours()
        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        setDate(today)
        setTime(time);
        setHour(hour);
    }
    useEffect(() => {
        getToday()
    }, [])
    return (
        <AppBar
            elevation={0}
            color="inherit"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: props.open,
            })}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={props.handleDrawerToggle}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {hour < 12 ? "Good Morning, " : hour < 18 ? "Good Afternoon, " : "Good Evening, "}
                    <span className={classes.day}>{date} {time}</span>
                </Typography>
                <Switch checked={mode === "dark"} onChange={handleThemeChange} />
                <Typography>{currentUser}</Typography>
                <Avatar className={classes.avatar} >
                    {currentUser.split(' ')[0][0].toUpperCase()}
                    {currentUser.split(' ')[1][0].toUpperCase()}
                </Avatar>
            </Toolbar>
        </AppBar>

    );
}
