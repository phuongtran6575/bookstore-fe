import { Box, Typography, Card, CardContent, Divider, Link, IconButton } from "@mui/material";
import Grid2 from "@mui/material/Grid"; // Grid2 mới trong MUI 7
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";

const AccountDashboard = () => {
  return (
    <Box p={3} bgcolor="#f9fbfd" >
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Xin chào, Trần Thị An!
        </Typography>
        <Typography color="text.secondary">
          Đây là trang tổng quan tài khoản của bạn. Tại đây, bạn có thể xem các hoạt động gần đây và quản lý thông tin tài khoản.
        </Typography>
      </Box>

      {/* Content */}
      <Grid2 container spacing={3}>
        {/* Left: Đơn hàng gần nhất */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Đơn hàng gần nhất
                </Typography>
                <IconButton size="small" color="inherit">
                  <DeleteOutlineIcon />
                </IconButton>
              </Box>

              <Box mt={2}>
                <Typography>
                  Mã đơn hàng:{" "}
                  <Link href="#" color="warning.main" underline="hover">
                    DH123460
                  </Link>
                </Typography>
                <Typography>Ngày đặt: 18/8/2025</Typography>
                <Typography>Tổng tiền: 240.000 đ</Typography>
                <Typography>
                  Trạng thái:{" "}
                  <Box
                    component="span"
                    sx={{
                      bgcolor: "#f5f5f5",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "12px",
                      fontSize: "0.85rem",
                    }}
                  >
                    Chờ xác nhận
                  </Box>
                </Typography>
              </Box>

              <Box mt={2}>
                <Link href="#" underline="hover" color="warning.main" fontWeight="bold">
                  Xem tất cả đơn hàng →
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid2>

        {/* Right: Địa chỉ mặc định */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Địa chỉ mặc định
                </Typography>
                <RoomOutlinedIcon color="disabled" />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography fontWeight="bold">Trần Thị An</Typography>
              <Typography>0987654321</Typography>
              <Typography>
                123 Đường Sách, Phường Bến Nghé
                <br /> Quận 1, TP. Hồ Chí Minh
              </Typography>

              <Box mt={2}>
                <Link href="#" underline="hover" color="warning.main" fontWeight="bold">
                  Chỉnh sửa địa chỉ →
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default AccountDashboard;
