import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Box,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSidebarStore } from "../../core/store/sidebarStore";

const drawerWidth = 240;
const miniWidth = 56;

const AdminHeader = () => {
  const { open, toggle } = useSidebarStore();

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
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Toggle sidebar */}
        <IconButton color="inherit" edge="start" onClick={toggle} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        {/* Right section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit">
            <Badge color="error" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }}>
              <AccountCircleIcon />
            </Avatar>
            {open && (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Quản Trị Viên
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  admin
                </Typography>
              </Box>
            )}
            <ExpandMoreIcon fontSize="small" />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
