import { colors, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import BookIcon from '@mui/icons-material/Book';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import React from 'react'
import { Link } from 'react-router-dom';



const AdminSidebar = () => {
  const drawerWidth = 240
    const navlLinks = [
        {name:"Dashboard", link:"/admin/dashboard", icon: <DashboardIcon/>},
        {name:"Producs", link:"/admin/products", icon:<BookIcon/>},
        {name:"Orders", link:"/admin/orders", icon: <ShoppingCartIcon/>},
        {name:"Customers", link:"/admin/customers", icon:<PeopleIcon/>},
        {name:"Categories", link:"/admin/categories", icon: <LocalOfferIcon/>},
        {name:"Setting", link:"/admin/setting", icon: <SettingsIcon/>},
    ]
  return (
    <Drawer
        sx={{
          
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor:"#1e293b",
            color: "white"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
            BookStore
        </Toolbar>
        
        <Divider sx={{bgcolor: "white"}} />
        <List>
          {
            navlLinks.map(links =>(
                
                <ListItem key={links.link}>
                    <ListItemButton  component={Link} to={links.link}  sx={{
                        color: "white",
                        "&.Mui-selected": {
                            backgroundColor: "#475569", // slate-600
                            "&:hover": {
                            backgroundColor: "#475569",
                        },
                        },
                        "&:hover": {
                        backgroundColor: "#334155", // slate-700
                        },
              }}>
                        <ListItemIcon sx={{ color: "white" }}>{links.icon}</ListItemIcon>
                        <ListItemText primary={links.name} />
                    </ListItemButton>
                </ListItem>
            ))
          }
        </List>
        
      </Drawer>
  )
}

export default AdminSidebar
