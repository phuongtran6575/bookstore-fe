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
                <Box
                    key={item.id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1.5}
                >
                    {/* Cột ảnh và tên */}
                    <Box display="flex" alignItems="center" flex="1" minWidth={0}>
                        <Box
                            component="img"
                            src={item.image}
                            alt={item.title}
                            sx={{
                                width: 60,
                                height: 60,
                                borderRadius: 2,
                                objectFit: "cover",
                                mr: 2,
                                flexShrink: 0,
                            }}
                        />
                        <Typography
                            variant="body1"
                            noWrap
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                flexGrow: 1,
                            }}
                        >
                            {item.title}
                        </Typography>
                    </Box>

                    {/* Giá tiền */}
                    <Typography
                        variant="body1"
                        sx={{ minWidth: "90px", textAlign: "right", whiteSpace: "nowrap" }}
                    >
                        {(item.price * item.quantity).toLocaleString()} đ
                    </Typography>
                </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Tạm tính</Typography>
                <Typography>{subtotal.toLocaleString()}đ</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Phí vận chuyển</Typography>
                <Typography>{shippingFee.toLocaleString()}đ</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography fontWeight="bold">Tổng cộng</Typography>
                <Typography fontWeight="bold" color="error">
                    {total.toLocaleString()}đ
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
