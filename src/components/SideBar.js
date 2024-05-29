import React from 'react'
import { Link } from 'react-router-dom'
import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';


const Sidebar = () => {
  return (
    <div>
        <Drawer variant="permanent" className="w-60">
            <List className="pt-10">
            <ListItemButton component={Link} to="/dashboard">
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton component={Link} to="/schools">
                <ListItemText primary="Schools" />
            </ListItemButton>
            </List>
        </Drawer>
    </div>
  )
}

export default Sidebar
