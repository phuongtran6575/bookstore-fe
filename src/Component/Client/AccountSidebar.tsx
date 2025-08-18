import { Box, Avatar, Typography, List, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Home, Person, History, LocationOn, Logout } from "@mui/icons-material";

const AccountSidebar = () => {
  return (
    <Box
      sx={{
        width: 280,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
        p: 2,
      }}
    >
      {/* Avatar + Info */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Avatar sx={{ bgcolor: "orange", width: 56, height: 56, mb: 1 }}>T</Avatar>
        <Typography variant="subtitle1" fontWeight={600}>
          Trần Thị An
        </Typography>
        <Typography variant="body2" color="text.secondary">
          an.tran@example.com
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      {/* Menu List */}
      <List>
        <ListItemButton selected>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Tổng quan" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Thông tin cá nhân" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <History />
          </ListItemIcon>
          <ListItemText primary="Lịch sử đơn hàng" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <LocationOn />
          </ListItemIcon>
          <ListItemText primary="Sổ địa chỉ" />
        </ListItemButton>

        <ListItemButton sx={{ color: "error.main" }}>
          <ListItemIcon sx={{ color: "error.main" }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Đăng xuất" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default AccountSidebar;

