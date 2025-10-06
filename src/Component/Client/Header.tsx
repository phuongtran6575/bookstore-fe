import { useEffect, useState } from "react";
import { Box, Typography, InputBase, IconButton, Divider, Drawer, List, ListItem, ListItemText, useMediaQuery, ListItemButton, Menu as MuiMenu, MenuItem, Paper, } from "@mui/material";
import { MenuBook, Search, ShoppingCart, Person, Menu, ExpandMore, ExpandLess, } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../core/store/authStore";
import Grid2 from "@mui/material/Grid";
import { useCategoryCrud } from "../../api/hook/useUltility";
import { buildCategoryTree } from "../../core/helper/categoryTreeBuild";
import type { Category } from "../../core/Types";


const allowedRoles = ["admin"];

const Header = () => {
  const navigate = useNavigate();
  const { useGetListCategories } = useCategoryCrud();

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useGetListCategories();

  const [treeCategories, setTreeCategories] = useState<any[]>([]);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [openMenu, setOpenMenu] = useState(false);

  // account menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const accountMenuOpen = Boolean(anchorEl);

  // category menu
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const token = useAuthStore((state) => state.token);
  const roles = useAuthStore((state) => state.roles);
  const logout = useAuthStore((state) => state.logout);

  const hasRole = roles.some((r) => allowedRoles.includes(r));

  const navItems = [
    { id: 1, name: "Trang Chủ", link: "/" },
    { id: 2, name: "Danh Mục Sách", link: "/category" },
    { id: 3, name: "Sách Bán Chạy", link: "/" },
    { id: 4, name: "Khuyến Mãi", link: "/" },
    { id: 5, name: "Blog/Tin tức", link: "/" },
  ];

  useEffect(() => {
    setTreeCategories(buildCategoryTree(categories || []));
  }, [categories]);

  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!token) {
      navigate("/auth/login");
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleCartClick = () => {
    navigate("/cart");
  };
  const handleAccountClose = () => setAnchorEl(null);

  const handleCategoryEnter = () => setCategoryMenuOpen(true);
  const handleCategoryLeave = () => setCategoryMenuOpen(false);

  if (isLoadingCategories) return <p>Loading...</p>;
  if (errorCategories) return <p>Failed to load categories</p>;

  return (
    <Box
      sx={{
        width: "100%",
        borderBottom: "1px solid #e5e7eb",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      {/* Top bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
        }}
      >
        {/* Logo */}
        <Box
          component={Link}
          to={"/"}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <MenuBook sx={{ color: "orange" }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Bookish
          </Typography>
        </Box>

        {/* Search */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#374151",
              borderRadius: 1,
              overflow: "hidden",
              width: "40%",
            }}
          >
            <InputBase
              sx={{ flex: 1, px: 2, color: "white" }}
              placeholder="Tìm kiếm tên sách, tác giả..."
            />
            <IconButton
              sx={{
                bgcolor: "orange",
                borderRadius: 0,
                "&:hover": { bgcolor: "#cc8400" },
              }}
            >
              <Search sx={{ color: "white" }} />
            </IconButton>
          </Box>
        )}

        {/* Cart + User + Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={handleCartClick}>
            <ShoppingCart />
          </IconButton>

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            py: 1,
          }}
        >
          {navItems.map((item) =>
            item.id === 2 ? (
              <Box
                key={item.id}
                onMouseEnter={handleCategoryEnter}
                onMouseLeave={handleCategoryLeave}
                sx={{ position: "relative" }}
              >
                {/* Trigger */}
                <Typography
                  variant="body2"
                  component={Link}
                  to={item.link}
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    fontWeight: 500,
                    cursor: "pointer",
                    "&:hover": { color: "orange" },
                  }}
                >
                  {item.name}
                </Typography>

                {/* Mega Menu */}
                {categoryMenuOpen && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 1200,
                      width: "100vw", // full chiều ngang
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Paper sx={{ p: 3, maxWidth: 1000, width: "100%" }}>
                      {treeCategories.length > 0 ? (
                        <Grid2 container spacing={4}>
                          {treeCategories.map((parent) => (
                            <Grid2 size={3} key={parent.id}>
                              <Typography
                                component={Link}
                                to={`/category/${parent.slug}`}
                                variant="subtitle1"
                                sx={{
                                  display: "block",
                                  color: "inherit",
                                  textDecoration: "none",
                                  "&:hover": { color: "orange" },
                                  fontWeight: "bold",
                                  mb: 1,
                                }}
                              >
                                {parent.name}
                              </Typography>
                              {parent.children.map((child: any) => (
                                <Typography
                                  key={child.id}
                                  component={Link}
                                  to={`/category/${child.slug}`}
                                  variant="body2"
                                  sx={{
                                    display: "block",
                                    color: "inherit",
                                    textDecoration: "none",
                                    mb: 0.5,
                                    "&:hover": { color: "orange" },
                                  }}
                                >
                                  {child.name}
                                </Typography>
                              ))}
                            </Grid2>
                          ))}
                        </Grid2>
                      ) : (
                        <Box
                          sx={{
                            textAlign: "center",
                            py: 5,
                            color: "text.secondary",
                          }}
                        >
                          <Typography variant="body2">
                            Chưa có danh mục nào
                          </Typography>
                        </Box>
                      )}
                    </Paper>
                  </Box>
                )}
              </Box>
            ) : (
              <Typography
                key={item.id}
                variant="body2"
                component={Link}
                to={item.link}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: 500,
                  cursor: "pointer",
                  "&:hover": { color: "orange" },
                }}
              >
                {item.name}
              </Typography>
            )
          )}
        </Box>
      )}

      {/* Drawer (mobile nav) */}
      <Drawer anchor="right" open={openMenu} onClose={() => setOpenMenu(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Menu
          </Typography>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton onClick={() => navigate(item.link)}>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Account Menu */}
      {token && (
        <MuiMenu
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          anchorEl={anchorEl}
          open={accountMenuOpen}
          onClose={handleAccountClose}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {hasRole && (
            <MenuItem
              onClick={() => {
                handleAccountClose();
                navigate("/admin");
              }}
            >
              Truy cập trang quản lý
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              handleAccountClose();
              navigate("/account/accountdashboard");
            }}
          >
            Tài khoản của tôi
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleAccountClose();
              navigate("/account/orders");
            }}
          >
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
