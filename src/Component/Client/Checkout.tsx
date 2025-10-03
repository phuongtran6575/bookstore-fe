import {
    Box,
    Typography,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    Paper
} from "@mui/material";

const Checkout = () => {
    return (
        <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                Thanh Toán
            </Typography>

            {/* 1. Thông tin giao hàng */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    1. Thông tin giao hàng
                </Typography>
                <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={2}>
                    <TextField label="Họ và tên" fullWidth size="small" required />
                    <TextField label="Số điện thoại" fullWidth size="small" required />
                </Box>
                <TextField label="Email" fullWidth size="small" required sx={{ mb: 2 }} />
                <TextField
                    label="Địa chỉ chi tiết"
                    fullWidth
                    size="small"
                    required
                    multiline
                />
            </Paper>

            {/* 2. Phương thức vận chuyển */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    2. Phương thức vận chuyển
                </Typography>
                <RadioGroup defaultValue="standard">
                    <FormControlLabel
                        value="standard"
                        control={<Radio />}
                        label={
                            <Box>
                                <Typography>Giao hàng Tiêu chuẩn - 30.000 đ</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Giao hàng dự kiến: 3-5 ngày
                                </Typography>
                            </Box>
                        }
                        sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 2, mb: 2 }}
                    />
                    <FormControlLabel
                        value="express"
                        control={<Radio />}
                        label={
                            <Box>
                                <Typography>Giao hàng Hỏa tốc - 50.000 đ</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Giao hàng dự kiến: 1-2 ngày
                                </Typography>
                            </Box>
                        }
                        sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 2 }}
                    />
                </RadioGroup>
            </Paper>

            {/* 3. Phương thức thanh toán */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    3. Phương thức thanh toán
                </Typography>
                <RadioGroup defaultValue="cod">
                    <FormControlLabel
                        value="cod"
                        control={<Radio />}
                        label="Thanh toán khi nhận hàng (COD)"
                        sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 2, mb: 2 }}
                    />
                    <FormControlLabel
                        value="bank"
                        control={<Radio />}
                        label="Chuyển khoản ngân hàng"
                        sx={{ border: "1px solid #e0e0e0", borderRadius: 2, p: 2 }}
                    />
                </RadioGroup>
            </Paper>
        </Box>
    );
}

export default Checkout;