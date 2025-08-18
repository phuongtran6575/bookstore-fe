import { AppBar, Box, IconButton, Toolbar, Typography, Avatar, Badge, } from '@mui/material'
import MenuIcon from "@mui/icons-material/Menu"
import NotificationsIcon from "@mui/icons-material/Notifications"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import React from 'react'



const AdminHeader = () => {
  const  drawerWidth = 240
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: "white",
        color: "black",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Bên trái */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Bên phải */}
        <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Thông báo */}
          <IconButton color="inherit">
            <Badge color="error" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* User info */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }}>
              <AccountCircleIcon />
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Quản Trị Viên
              </Typography>
              <Typography variant="caption" color="text.secondary">
                admin
              </Typography>
            </Box>
            <ExpandMoreIcon fontSize="small" />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
  
}

export default AdminHeader

