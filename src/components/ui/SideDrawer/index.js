import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer,Avatar, List, ListItem, ListItemText, Divider, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useLocation, useHistory } from 'react-router-dom'
import employees from '../../../assets/images/employees.png'
import { homeVariables } from "../../../config/home";

const DRAWER_WIDTH = homeVariables.sideDrawerWidth;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  avatar: {
    width: DRAWER_WIDTH,
    height: 180
  }
}));
export const SideDrawer=(props)=> {
  const classes = useStyles();
  const history = useHistory()
  const location = useLocation()
  const [open, setOpen] = useState(true)
  const toogleOpen = () => {
    setOpen(!open)
  }
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Avatar className={classes.avatar} variant="rounded" src={employees} />
      </div>
      <Divider />
      <List>

        <ListItem button onClick={toogleOpen} >
          <ListItemText primary="Employees Management" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {['Employees', 'Starred', 'Groups', 'Profiles'].map((item, index) =>
            (
              <ListItem
                selected={location.pathname.includes(item.toLowerCase())}
                button
                className={classes.nested}
                onClick={()=>history.push(item.toLowerCase())}
                key={index}>
                <ListItemText primary={item} />
              </ListItem>
            )
            )}
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
}
