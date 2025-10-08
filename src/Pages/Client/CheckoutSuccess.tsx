import { Box, Typography, Button, Divider, Card, CardMedia, CardContent } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Grid2 from '@mui/material/Grid';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetOrderbyId, useGetOrderbySessionId } from "../../api/hook/useOrder";

const CheckoutSuccessPage = () => {
    const { id } = useParams(); // order_id cho COD
    const location = useLocation(); // session_id cho Stripe
    const sessionId = new URLSearchParams(location.search).get("session_id");

    console.log("location:", location);
    console.log("search:", location.search);
    console.log("session_id:", sessionId);

    const { data: order, isLoading } = sessionId ? useGetOrderbySessionId(sessionId) : useGetOrderbyId(id || "")
    const navigate = useNavigate()
    if (isLoading) {
        return <Typography>Đang tải đơn hàng...</Typography>;
    }
    return (
        <Box
            sx={{
                maxWidth: 600,
                mx: "auto",
                mt: 6,
                mb: 8,
                p: 4,
                boxShadow: 3,
                borderRadius: 3,
                bgcolor: "#fff",
            }}
        >
            {/* ✅ Header */}
            <Box textAlign="center" mb={3}>
                <CheckCircleIcon sx={{ fontSize: 50, color: "success.main", mb: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                    Cảm ơn bạn đã đặt hàng!
                </Typography>
                <Typography variant="subtitle1" fontWeight="500">
                    Trạng thái thanh toán:{" "}
                    <Typography component="span" color={order.status === "paid" ? "success.main" : "warning.main"} fontWeight="600">
                        {order.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                    </Typography>
                </Typography>

                <Box
                    sx={{
                        mt: 2,
                        display: "inline-block",
                        border: "1px dashed #f0ad4e",
                        borderRadius: 1,
                        bgcolor: "#fff7e6",
                        px: 2,
                        py: 1,
                    }}
                >
                    <Typography variant="body2" color="warning.main" fontWeight="500">
                        Mã đơn hàng của bạn là:{" "}
                        <Typography component="span" color="warning.dark" fontWeight="bold">
                            {id}
                        </Typography>
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* 🧾 Tóm tắt đơn hàng */}
            <Typography variant="h6" fontWeight="600" mb={2}>
                Tóm tắt đơn hàng
            </Typography>

            <Grid2 spacing={2}>
                {/* Thông tin giao hàng */}
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle1" fontWeight="500">
                        Thông tin giao hàng
                    </Typography>
                    <Typography variant="body2">{order.customer_name}</Typography>
                    <Typography variant="body2">{order.customer_phone}</Typography>
                    <Typography variant="body2">{order.shipping_address}</Typography>
                </Grid2>

                {/* Thông tin thanh toán */}
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle1" fontWeight="500">
                        Thông tin thanh toán
                    </Typography>
                    <Typography variant="body2">Giao hàng dự kiến: 10/10/2025</Typography>
                    <Typography variant="body2">Phương thức vận chuyển: {order.shipping_method}</Typography>
                    <Typography variant="body2">Phương thức thanh toán: {order.payment_method}</Typography>
                </Grid2>
            </Grid2>

            <Divider sx={{ my: 3 }} />

            {/* 📚 Sản phẩm đã đặt */}
            <Typography variant="subtitle1" fontWeight="500" mb={1}>
                Sản phẩm đã đặt
            </Typography>
            {order.items.map((item: any) =>
                <Card variant="outlined" sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex" }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 100, height: 100, objectFit: "cover" }}
                            image={item.image}
                            alt="product"
                        />
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="body1" fontWeight="500">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Số lượng: {item.quantity}
                            </Typography>
                            <Typography variant="body1" fontWeight="600" mt={1}>
                                {item.price}
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            )}


            {/* 💰 Tổng tiền */}
            <Box>
                <Box display="flex" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2">Tạm tính:</Typography>
                    <Typography variant="body2">{order.total_amount}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" mb={0.5}>
                    <Typography variant="body2">Phí vận chuyển:</Typography>
                    <Typography variant="body2">30.000 ₫</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1" fontWeight="600">
                        Tổng cộng:
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="700" color="primary">
                        {order.total_amount + 30000}
                    </Typography>
                </Box>
            </Box>

            {/* 🔘 Nút hành động */}
            <Box textAlign="center" mt={4} display="flex" gap={2} justifyContent="center">
                <Button onClick={() => navigate("/")} variant="contained" color="warning">
                    Tiếp tục mua sắm
                </Button>
                <Button onClick={() => navigate("/")} variant="outlined" color="primary">
                    Theo dõi đơn hàng
                </Button>
            </Box>
        </Box >
    );
}

export default CheckoutSuccessPage;
