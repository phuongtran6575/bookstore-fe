import {
    Box,
    Paper,
    Typography,
    Divider,
    Button,
} from "@mui/material";

const CheckoutSummary = ({ shippingMethod, paymentMethod, onCheckout, isLoading }: any) => {
    const cart = JSON.parse(localStorage.getItem("shopping-cart") || "{}");
    const subtotal = cart.state?.items?.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0) || 0;
    const shippingFee = shippingMethod === "express" ? 50000 : 30000;
    const total = subtotal + shippingFee;

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                Tóm tắt đơn hàng
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Hiển thị sản phẩm */}
            {cart.state?.items?.map((item: any) => (
                <Box key={item.id} display="flex" justifyContent="space-between" mb={1}>
                    <Typography>{item.title}</Typography>
                    <Typography>{(item.price * item.quantity).toLocaleString()} đ</Typography>
                </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Tạm tính</Typography>
                <Typography>{subtotal.toLocaleString()} đ</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Phí vận chuyển</Typography>
                <Typography>{shippingFee.toLocaleString()} đ</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography fontWeight="bold">Tổng cộng</Typography>
                <Typography fontWeight="bold" color="error">
                    {total.toLocaleString()} đ
                </Typography>
            </Box>

            <Button
                variant="contained"
                fullWidth
                sx={{ py: 1.5, fontSize: "1rem", fontWeight: "bold" }}
                onClick={onCheckout}
                disabled={isLoading}
            >
                {isLoading ? "Đang xử lý..." : "HOÀN TẤT ĐƠN HÀNG"}
            </Button>
        </Paper>
    );
};

export default CheckoutSummary;
