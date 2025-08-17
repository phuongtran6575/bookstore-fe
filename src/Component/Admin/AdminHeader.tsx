import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'



const AdminHeader = () => {
  const  drawerWidth = 240
  return (
    
    <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar sx={{display:"flex"}}>
            <IconButton
            color="inherit"
            aria-label="open drawer"   
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
  )
  
}

export default AdminHeader

