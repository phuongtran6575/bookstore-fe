import { Box, Avatar, Typography, List, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Home, Person, History, LocationOn, Logout } from "@mui/icons-material";
import { useAuthStore } from "../../core/store/authStore";

import { useLocation, Link, useNavigate } from "react-router-dom";
import { useReadMe } from "../../api/hook/useAuth";

const AccountSidebar = () => {
  const logout  = useAuthStore(state => state.logout);
  const {data: profile, isLoading, error} = useReadMe()
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Lấy route hiện tại

   if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading books</p>;

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  const navLinks = [
    { id: 1, name: "Tổng quan", icon: <Home />, color: "black", link: "/account/accountdashboard" },
    { id: 2, name: "Thông tin cá nhân", icon: <Person />, color: "black", link: "/account/profile" },
    { id: 3, name: "Lịch sử đơn hàng", icon: <History />, color: "black", link: "/account/orderhistory" },
    { id: 4, name: "Sổ địa chỉ", icon: <LocationOn />, color: "black", link: "/account/addressbook" },
    { id: 5, name: "Đăng xuất", icon: <Logout />, color: "red", action: handleLogout },
  ];

  return (
    <Box sx={{ width: 280, height: 400, bgcolor: "background.paper", borderRadius: 2, boxShadow: 1, p: 2 }}>
      {/* Avatar + Info */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Avatar sx={{ bgcolor: "orange", width: 56, height: 56, mb: 1 }}>
          {profile?.full_name?.charAt(0) || "?"}
        </Avatar>
        <Typography variant="subtitle1" fontWeight={600}>{profile?.user.full_name || "Guest"}</Typography>
        <Typography variant="body2" color="text.secondary">{profile?.user.email || ""}</Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <List>
        {navLinks.map(link => (
          <ListItemButton
            key={link.id}
            component={link.action ? "button" : Link}
            to={link.link || ""}
            onClick={link.action}
            selected={location.pathname === link.link} // 👈 check selected
            sx={{ color: link.color }}
          >
            <ListItemIcon sx={{ color: link.color }}>{link.icon}</ListItemIcon>
            <ListItemText primary={link.name} sx={{ color: link.color }} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};


export default AccountSidebar;

