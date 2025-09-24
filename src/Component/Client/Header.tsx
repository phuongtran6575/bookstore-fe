import { useState } from "react";
import {Box,Typography,InputBase,IconButton,Divider,Drawer,List,ListItem,ListItemText,useMediaQuery,ListItemButton,Menu as MuiMenu,MenuItem,} from "@mui/material";
import {MenuBook,Search,ShoppingCart,Person,Menu,ExpandMore,ExpandLess,} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../core/store/authStore";

const Header = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [openMenu, setOpenMenu] = useState(false);

  // state cho account menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const accountMenuOpen = Boolean(anchorEl);

  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const navItems = [
    { name: "Trang Chủ", link: "/" },
    { name: "Danh Mục Sách", link: "/" },
    { name: "Sách Bán Chạy", link: "/" },
    { name: "Khuyến Mãi", link: "/" },
    { name: "Blog/Tin tức", link: "/" },
  ];

  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!token) {
      navigate("/auth/login");
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleAccountClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: "100%", borderBottom: "1px solid #e5e7eb", backgroundColor: "white" }}>
      {/* Top bar */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 1.5 }}>
        {/* Logo */}
        <Box component={Link}  to={"/"}
          sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none", color: "inherit" }} >
          <MenuBook sx={{ color: "orange" }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Bookish
          </Typography>
        </Box>

        {/* Search */}
        {!isMobile && (
          <Box
            sx={{  display: "flex",
              alignItems: "center",
              bgcolor: "#374151",
              borderRadius: 1,
              overflow: "hidden",
              width: "40%", }}>
            <InputBase sx={{ flex: 1, px: 2, color: "white" }} placeholder="Tìm kiếm tên sách, tác giả..." />
            <IconButton sx={{ bgcolor: "orange", borderRadius: 0, "&:hover": { bgcolor: "#cc8400" } }}>
              <Search sx={{ color: "white" }} />
            </IconButton>
          </Box>
        )}

        {/* Cart + User + Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton>
            <ShoppingCart />
          </IconButton>

          {/* Nếu chưa login → Person icon để login */}
          {/* Nếu đã login → mở account menu */}
          <IconButton onClick={handleAccountClick}>
            <Person />
            {token && (accountMenuOpen ? <ExpandLess /> : <ExpandMore />)}
          </IconButton>

          {isMobile && (
            <IconButton onClick={() => setOpenMenu(true)}>
              <Menu />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Divider */}
      {!isMobile && <Divider />}

      {/* Nav bar (desktop) */}
      {!isMobile && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4, py: 1 }}>
          {navItems.map((item, i) => (
            <Typography component={Link} to={item.link} key={i}  variant="body2"
              sx={{ textDecoration: "none",
                color: "inherit",
                fontWeight: 500,
                cursor: "pointer",
                "&:hover": { color: "orange" }, }} >
              {item.name}
            </Typography>
          ))}
        </Box>
      )}

      {/* Drawer (mobile nav) */}
      <Drawer anchor="right" open={openMenu} onClose={() => setOpenMenu(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Menu
          </Typography>
          <List>
            {navItems.map((item, i) => (
              <ListItem key={i} disablePadding>
                <ListItemButton onClick={() => navigate(item.link)}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Account Menu (chỉ khi có token) */}
      {token && (
        <MuiMenu
          anchorEl={anchorEl}
          open={accountMenuOpen}
          onClose={handleAccountClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={() => { handleAccountClose(); navigate("/account/accountdashboard"); }}>
            Tài khoản của tôi
          </MenuItem>
          <MenuItem onClick={() => { handleAccountClose(); navigate("/account/orders"); }}>
            Đơn hàng
          </MenuItem>
          <MenuItem
            onClick={() => {
              logout();
              handleAccountClose();
            }}
          >
            Đăng xuất
          </MenuItem>
        </MuiMenu>
      )}
    </Box>
  );
};

export default Header;
