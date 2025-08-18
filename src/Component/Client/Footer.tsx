import React from "react";
import { Box, Typography, Link, TextField, Button } from "@mui/material";
import { Book } from "@mui/icons-material";
import Grid from "@mui/material/Grid";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#1e2635", color: "#fff", p: { xs: 3, md: 6 }, mt: 4 }}>
      <Grid container spacing={4}>
        {/* Cột 1 */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Box display="flex" alignItems="center" justifyContent={{ xs: "center", md: "flex-start" }} mb={2}>
            <Book sx={{ mr: 1, color: "#f2a33a" }} />
            <Typography variant="h6" fontWeight="bold">
              Bookish
            </Typography>
          </Box>
          <Typography variant="body2" textAlign={{ xs: "center", md: "left" }} mb={1}>
            Địa chỉ: 123 Đường Sách, Phường Trí Thức, Quận Văn Hóa, TP. HCM
          </Typography>
          <Typography variant="body2" textAlign={{ xs: "center", md: "left" }} mb={1}>
            Điện thoại: 1900 1234
          </Typography>
          <Typography variant="body2" textAlign={{ xs: "center", md: "left" }}>
            Email: support@bookish.com
          </Typography>
        </Grid>

        {/* Cột 2 */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={2}
            textAlign={{ xs: "center", md: "left" }}
          >
            Hỗ trợ khách hàng
          </Typography>
          <Box display="flex" flexDirection="column" gap={1} textAlign={{ xs: "center", md: "left" }}>
            <Link href="#" underline="hover" color="inherit">
              Chính sách đổi trả
            </Link>
            <Link href="#" underline="hover" color="inherit">
              Câu hỏi thường gặp
            </Link>
            <Link href="#" underline="hover" color="inherit">
              Hướng dẫn mua hàng
            </Link>
            <Link href="#" underline="hover" color="inherit">
              Chính sách vận chuyển
            </Link>
          </Box>
        </Grid>

        {/* Cột 3 */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={2}
            textAlign={{ xs: "center", md: "left" }}
          >
            Về chúng tôi
          </Typography>
          <Box display="flex" flexDirection="column" gap={1} textAlign={{ xs: "center", md: "left" }}>
            <Link href="#" underline="hover" color="inherit">
              Giới thiệu Bookish
            </Link>
            <Link href="#" underline="hover" color="inherit">
              Điều khoản sử dụng
            </Link>
            <Link href="#" underline="hover" color="inherit">
              Chính sách bảo mật
            </Link>
            <Link href="#" underline="hover" color="inherit">
              Tuyển dụng
            </Link>
          </Box>
        </Grid>

        {/* Cột 4 */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={2}
            textAlign={{ xs: "center", md: "left" }}
          >
            Kết nối với chúng tôi
          </Typography>
          <Typography variant="body2" mb={2} textAlign={{ xs: "center", md: "left" }}>
            Đăng ký để nhận tin tức và khuyến mãi mới nhất.
          </Typography>
          <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} alignItems="center">
            <TextField
              fullWidth
              variant="filled"
              placeholder="Email của bạn"
              slotProps={{
                input: {
                  disableUnderline: true,
                  sx: {
                    bgcolor: "#333",
                    color: "#fff",
                    borderRadius: { xs: "6px", sm: "6px 0 0 6px" },
                    px: 1.5,
                  },
                },
              }}
              sx={{ mb: { xs: 2, sm: 0 }, mr: { sm: 0.5 } }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#f2a33a",
                color: "#fff",
                borderRadius: { xs: "6px", sm: "0 6px 6px 0" },
                px: 3,
                "&:hover": { bgcolor: "#e68a00" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Đăng ký
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Copyright */}
      <Box textAlign="center" mt={4} pt={2} borderTop="1px solid rgba(255,255,255,0.2)">
        <Typography variant="body2">
          © 2025 Bookish. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}
