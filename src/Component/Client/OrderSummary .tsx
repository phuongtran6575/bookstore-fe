import { Box, Typography, Card, Divider, TextField, Button, InputAdornment, } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface OrderSummary {
    total: () => number | string
}

const OrderSummary = ({ total }: OrderSummary) => {
    const [voucher, setVoucher] = useState("");
    const navigate = useNavigate()
    const handleCheckout = () => {
        navigate("/checkout")
    }
    return (
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: 1, maxWidth: 350, bgcolor: "white", }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>Tóm tắt đơn hàng </Typography>

            {/* Tạm tính */}
            <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Tạm tính</Typography>
                <Typography fontWeight="500">{total()}</Typography>
            </Box>

            {/* Giảm giá */}
            <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography color="success.main">Giảm giá</Typography>
                <Typography color="success.main">- 0 đ</Typography>
            </Box>

            {/* Phí vận chuyển */}
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography color="text.secondary">
                    Phí vận chuyển (sẽ được tính ở bước thanh toán)
                </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Tổng cộng */}
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography fontWeight="bold">Tổng cộng</Typography>
                <Typography fontWeight="bold">{total()}</Typography>
            </Box>

            {/* Nhập voucher */}
            <Box display="flex" gap={1} mb={2}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Mã giảm giá/Voucher"
                    value={voucher}
                    onChange={(e) => setVoucher(e.target.value)}
                />
                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "#0d1b2a",
                        "&:hover": { bgcolor: "#1b263b" },
                        whiteSpace: "nowrap",
                    }}
                >
                    Áp dụng
                </Button>
            </Box>

            {/* Nút thanh toán */}
            <Button
                onClick={handleCheckout}
                fullWidth
                variant="contained"
                sx={{
                    bgcolor: "orange",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    py: 1.5,
                    "&:hover": { bgcolor: "#e69500" },
                }}
            >
                TIẾN HÀNH THANH TOÁN
            </Button>
        </Card>
    );
};

export default OrderSummary;
