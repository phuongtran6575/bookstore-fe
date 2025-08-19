import { Box, Avatar, Typography, List, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Home, Person, History, LocationOn, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";

const AccountSidebar = () => {
  const navLinks = [
    {id:1,name: "Tổng quan", icon: <Home />, color:"black", link:"/account/accountdashboard" },
    {id:2, name: "Thông tin cá nhân", icon: <Person />, color:"black", link:"/account/profile"},
    {id:3, name: "Lịch sử đơn hàng", icon: <History />, color:"black", link:"/account/orderhistory"},
    {id:4, name: "Sổ địa chỉ", icon: <LocationOn />, color:"black", link:"/account/addressbook"},
    {id:5, name: "Đăng xuất", icon: <Logout />,color:"red", link:"/auth/login"},
  ];

  const links = []

  for(var i = 0 ; i <  navLinks.length; i++){
    if(navLinks[i].id == 1)
    {
      links.push(
        <ListItemButton component={Link} to={navLinks[i].link} selected sx={{ color: navLinks[i].color }}>
          <ListItemIcon sx={{ color: navLinks[i].color }}>
            {navLinks[i].icon}
          </ListItemIcon>
          <ListItemText primary={navLinks[i].name} sx={{ color: navLinks[i].color }} />
        </ListItemButton>
      );
    }
    else if(navLinks[i].id == 5){
      links.push(
        <ListItemButton component={Link} to={navLinks[i].link} sx={{ color: navLinks[i].color }}>
          <ListItemIcon sx={{ color: navLinks[i].color }}>
            {navLinks[i].icon}
          </ListItemIcon>
          <ListItemText primary={navLinks[i].name} sx={{ color: navLinks[i].color }} />
        </ListItemButton>
      );
    }  
    else {
      links.push(
        <ListItemButton component={Link} to={navLinks[i].link} sx={{ color: navLinks[i].color }}>
          <ListItemIcon sx={{ color: navLinks[i].color }}>
            {navLinks[i].icon}
          </ListItemIcon>
          <ListItemText primary={navLinks[i].name} sx={{ color: navLinks[i].color }} />
        </ListItemButton>
      );
    }
  }; 

  return (
    <Box sx={{width: 280, height: 400 ,bgcolor: "background.paper", borderRadius: 2, boxShadow: 1, p: 2, }}>
      {/* Avatar + Info */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Avatar sx={{ bgcolor: "orange", width: 56, height: 56, mb: 1 }}>T</Avatar>
        <Typography variant="subtitle1" fontWeight={600}> Trần Thị An </Typography>
        <Typography variant="body2" color="text.secondary"> an.tran@example.com </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      {/* Menu List */}
      <List>
        {links}
      </List>
    </Box>
  );
};

export default AccountSidebar;

