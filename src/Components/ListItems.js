import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import StarBorder from '@mui/icons-material/StarBorder';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';


export const UserListItems = (props) => {
  return (
    <React.Fragment>
      <ListItemButton onClick={() => props.setMenu('home')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </React.Fragment>
  )
};

export const AdminListItems = (props) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Admin Options
      </ListSubheader>
      <ListItemButton onClick={handleClick} >
        <ListItemIcon>
          <DataSaverOnIcon />
        </ListItemIcon>
        <ListItemText primary="Data Entry" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }} onClick={() => props.setMenu('rugosite')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Rugosite" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => props.setMenu('mesure')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Mesures" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => props.setMenu('organisme')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Organisme" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }} onClick={() => props.setMenu('utilisateur')}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Utilisateur" />
          </ListItemButton>
        </List>
      </Collapse>
    </React.Fragment>
  )
};