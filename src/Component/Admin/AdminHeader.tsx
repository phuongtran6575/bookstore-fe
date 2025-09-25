import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Badge, Box, Avatar, Menu as MuiMenu, MenuItem, ListItemText,} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useSidebarStore } from "../../core/store/sidebarStore";
import { useAuthStore } from "../../core/store/authStore";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const miniWidth = 56;

const AdminHeader = () => {
  const { open, toggle } = useSidebarStore();
  const navigate = useNavigate();

  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  // Account menu state
  const [anchorElAccount, setAnchorElAccount] = useState<null | HTMLElement>(null);
  const accountMenuOpen = Boolean(anchorElAccount);

  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!token) {
      navigate("/auth/login");
    } else {
      setAnchorElAccount(event.currentTarget);
    }
  };

  const handleAccountClose = () => {
    setAnchorElAccount(null);
  };

  // Notification menu state
  const [anchorElNotif, setAnchorElNotif] = useState<null | HTMLElement>(null);
  const notifMenuOpen = Boolean(anchorElNotif);

  const handleNotifClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotif(event.currentTarget);
  };

  const handleNotifClose = () => {
    setAnchorElNotif(null);
  };

  // Mock notifications
  const notifications = [
    { id: 1, text: "Có đơn hàng mới #1234" },
    { id: 2, text: "Người dùng mới vừa đăng ký" },
    { id: 3, text: "Sách 'Clean Code' sắp hết hàng" },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        width: open ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${miniWidth}px)`,
        ml: open ? `${drawerWidth}px` : `${miniWidth}px`,
        backgroundColor: "white",
        color: "black",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "none",
        transition: "all 0.3s ease",}}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Toggle sidebar */}
        <IconButton color="inherit" edge="start" onClick={toggle} sx={{ mr: 2 }}> <MenuIcon /> </IconButton>

        {/* Right section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Notifications */}
          <IconButton color="inherit" onClick={handleNotifClick}>
            <Badge color="error" variant="dot" invisible={notifications.length === 0}> <NotificationsIcon /> </Badge>
          </IconButton>

          {/* Account */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }} onClick={handleAccountClick} >
            <Avatar sx={{ width: 32, height: 32 }}> <AccountCircleIcon /> </Avatar>

            {open && token && (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}> Quản Trị Viên </Typography>
                <Typography variant="caption" color="text.secondary"> admin </Typography>
              </Box> )}
            {token && (accountMenuOpen ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />)}
          </Box>
        </Box>
      </Toolbar>

      {/* Account Menu */}
      {token && (
        <MuiMenu
          anchorEl={anchorElAccount}
          open={accountMenuOpen}
          onClose={handleAccountClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }} >

          <MenuItem  onClick={() => {
              handleAccountClose();
              navigate("/account"); }} >
            Tài khoản của tôi
          </MenuItem>

          <MenuItem onClick={() => {
              handleAccountClose();
              navigate("/admin/settings"); }} >
            Cài đặt
          </MenuItem>

          <MenuItem onClick={() => {
              logout();
              handleAccountClose(); }} >
            Đăng xuất
          </MenuItem>

        </MuiMenu>)}

      {/* Notification Menu */}
      <MuiMenu
        anchorEl={anchorElNotif}
        open={notifMenuOpen}
        onClose={handleNotifClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <MenuItem key={notif.id} onClick={handleNotifClose}>
              <ListItemText primary={notif.text} />
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={handleNotifClose}>
            <ListItemText primary="Không có thông báo mới" />
          </MenuItem>
        )}
      </MuiMenu>
    </AppBar>
  );
};

export default AdminHeader;
