import {
    Box,
    Paper,
    Typography,
    Divider,
    Button,
} from "@mui/material";

const CheckoutSummary = () => {
    return (
        <Paper sx={{ p: 3, maxWidth: 400, mx: "auto" }}>
            {/* Tiêu đề */}
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Tóm tắt đơn hàng
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Sản phẩm */}
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center">
                    <Box
                        component="img"
                        src="https://picsum.photos/60" // ảnh demo, thay link sách thật
                        alt="Đắc Nhân Tâm"
                        sx={{ width: 60, height: 60, borderRadius: 1, mr: 2 }}
                    />
                    <Typography>Đắc Nhân Tâm</Typography>
                </Box>
                <Typography fontWeight="500">178.000 đ</Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Chi tiết giá */}
            <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Tạm tính</Typography>
                <Typography>178.000 đ</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>Phí vận chuyển</Typography>
                <Typography>30.000 đ</Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Tổng cộng */}
            <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography fontWeight="bold">Tổng cộng</Typography>
                <Typography fontWeight="bold" color="error">
                    208.000 đ
                </Typography>
            </Box>

            {/* Nút hoàn tất */}
            <Button
                variant="contained"
                fullWidth
                sx={{
                    backgroundColor: "#d97904",
                    color: "#fff",
                    fontWeight: "bold",
                    py: 1.5,
                    mb: 2,
                    "&:hover": { backgroundColor: "#b86403" },
                }}
            >
                HOÀN TẤT ĐƠN HÀNG
            </Button>

            {/* Điều khoản */}
            <Typography variant="body2" color="text.secondary" align="center">
                Bằng việc nhấn nút, bạn đồng ý với{" "}
                <Typography
                    component="span"
                    color="primary"
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                >
                    Điều khoản & Điều kiện
                </Typography>{" "}
                của chúng tôi.
            </Typography>
        </Paper>
    );
}

export default CheckoutSummary;
