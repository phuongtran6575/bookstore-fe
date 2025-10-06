import { Box, Typography, TextField, RadioGroup, FormControlLabel, Radio, Paper, Button, Checkbox } from "@mui/material";
import { useReadMe } from "../../api/hook/useAuth";
import { useGetAddrressesUSer } from "../../api/hook/useUser";
import { useCheckout } from "../../api/hook/useOrder";
import { useState } from "react";





const Checkout = ({
    addresses,
    profile,
    manualAddress,
    setManualAddress,
    shippingMethod,
    setShippingMethod,
    paymentMethod,
    setPaymentMethod,
}: any) => {
    const defaultAddress =
        addresses?.find((addr: any) => addr.is_default) || addresses?.[0];

    return (
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
            {/* 1️⃣ Thông tin giao hàng */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>1. Thông tin giao hàng</Typography>

                {addresses && addresses.length > 0 ? (
                    <Box>
                        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={2}>
                            <TextField disabled value={defaultAddress?.full_name} fullWidth size="small" />
                            <TextField disabled value={defaultAddress?.phone_number} fullWidth size="small" />
                        </Box>
                        <TextField disabled value={profile?.user?.email} fullWidth size="small" sx={{ mb: 2 }} />
                        <TextField disabled value={defaultAddress?.full_address} fullWidth size="small" multiline />
                    </Box>
                ) : (
                    <Box>
                        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={2}>
                            <TextField
                                label="Họ và tên"
                                fullWidth
                                size="small"
                                onChange={(e) => setManualAddress({ ...manualAddress, full_name: e.target.value })}
                            />
                            <TextField
                                label="Số điện thoại"
                                fullWidth
                                size="small"
                                onChange={(e) => setManualAddress({ ...manualAddress, phone_number: e.target.value })}
                            />
                        </Box>
                        <TextField
                            label="Email"
                            fullWidth
                            size="small"
                            sx={{ mb: 2 }}
                            defaultValue={manualAddress.email}
                            onChange={(e) => setManualAddress({ ...manualAddress, email: e.target.value })}
                        />
                        <TextField
                            label="Địa chỉ giao hàng"
                            fullWidth
                            size="small"
                            multiline
                            onChange={(e) => setManualAddress({ ...manualAddress, full_address: e.target.value })}
                        />
                        <Box display="flex" alignItems="center" mt={1}>
                            <Checkbox
                                onChange={(e) => setManualAddress({ ...manualAddress, save: e.target.checked })}
                            />
                            <Typography variant="body2">Lưu địa chỉ này cho lần sau</Typography>
                        </Box>
                    </Box>
                )}
            </Paper>

            {/* 2️⃣ Phương thức vận chuyển */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>2. Phương thức vận chuyển</Typography>
                <RadioGroup value={shippingMethod} onChange={(e) => setShippingMethod(e.target.value)}>
                    <FormControlLabel value="standard" control={<Radio />} label="Giao hàng Tiêu chuẩn - 30.000đ (3-5 ngày)" />
                    <FormControlLabel value="express" control={<Radio />} label="Giao hàng Hỏa tốc - 50.000đ (1-2 ngày)" />
                </RadioGroup>
            </Paper>

            {/* 3️⃣ Phương thức thanh toán */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>3. Phương thức thanh toán</Typography>
                <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                    <FormControlLabel value="COD" control={<Radio />} label="Thanh toán khi nhận hàng (COD)" />
                    <FormControlLabel value="BANK" control={<Radio />} label="Chuyển khoản ngân hàng" />
                </RadioGroup>
            </Paper>
        </Box>
    );
};

export default Checkout;

