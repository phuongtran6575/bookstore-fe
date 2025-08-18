import { Box, Divider, IconButton, InputBase, Typography } from "@mui/material";
import { Search, ShoppingCart, Person, MenuBook } from "@mui/icons-material";
const Header = () =>
{
    return (
    <Box sx={{ width: "100%", borderBottom: "1px solid #e5e7eb", height:"15%", backgroundColor:"white" }}>
      {/* Top bar */}
      <Box sx={{display: "flex",alignItems: "center",justifyContent: "space-between",px: 3,py: 1.5,}}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MenuBook sx={{ color: "orange" }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Bookish</Typography>
        </Box>

        {/* Search */}
        <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#374151", borderRadius: 1, overflow: "hidden", width: "40%",}}>
          <InputBase sx={{ flex: 1, px: 2, color: "white" }} placeholder="Tìm kiếm tên sách, tác giả..."/>
          <IconButton sx={{ bgcolor: "orange", borderRadius: 0, "&:hover": { bgcolor: "#cc8400" } }}>
            <Search sx={{ color: "white" }} />
          </IconButton>
        </Box>

        {/* Cart + User */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton>
            <ShoppingCart />
          </IconButton>
          <IconButton>
            <Person />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{my: 2, }} />       
      {/* Nav bar */}
      <Box sx={{display: "flex", justifyContent: "center", gap: 4, py: 1,}}>
        {["Trang Chủ", "Danh Mục Sách", "Sách Bán Chạy", "Khuyến Mãi", "Blog/Tin tức"].map(
          (item, i) => (
            <Typography
              key={i}
              variant="body2"
              sx={{
                color: "#1f2937",
                fontWeight: 500,
                cursor: "pointer",
                "&:hover": { color: "orange" },
              }}
            >
              {item}
            </Typography>
          )
        )}
      </Box>
    </Box>
    )
}
export default Header;