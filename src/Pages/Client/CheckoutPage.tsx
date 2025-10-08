import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import CheckoutSummary from '../../Component/Client/CheckoutSummary';
import Checkout from '../../Component/Client/Checkout';
import { useCheckout, useStripeCheckout } from '../../api/hook/useOrder';
import { useGetAddrressesUSer } from '../../api/hook/useUser';
import { useReadMe } from '../../api/hook/useAuth';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../core/store/cartStore';

const CheckoutPage = () => {
    const navigate = useNavigate()
    const checkout = useCheckout();
    const { data: addresses } = useGetAddrressesUSer();
    const { data: profile } = useReadMe();
    const stripeCheckout = useStripeCheckout();

    // ✅ Toàn bộ state đưa lên cha
    const [shippingMethod, setShippingMethod] = useState("standard");
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [manualAddress, setManualAddress] = useState({
        full_name: "",
        phone_number: "",
        email: profile?.user?.email || "",
        full_address: "",
        save: false,
    });

    const defaultAddress =
        addresses?.find((addr: any) => addr.is_default) || addresses?.[0];

    // ✅ Hàm xử lý đặt hàng (nay nằm ở Page)
    const handleCheckout = () => {
        const cart = JSON.parse(localStorage.getItem("shopping-cart") || "{}");
        const addressInfo = defaultAddress || manualAddress;

        if (!addressInfo?.full_address) {
            alert("Vui lòng nhập hoặc chọn địa chỉ giao hàng!");
            return;
        }

        const payload = {
            customer_name: addressInfo.full_name,
            customer_email: profile?.user?.email,
            customer_phone: addressInfo.phone_number,
            shipping_address: addressInfo.full_address,
            payment_method: paymentMethod.toUpperCase(),
            shipping_method: shippingMethod,
            items: cart.state.items.map((item: any) => ({
                image: item.image,
                product_id: item.id,
                quantity: item.quantity || 1,
                price: item.price,
            })),
        };

        checkout.mutate(payload, {
            onSuccess: (res) => {
                if (paymentMethod === "STRIPE") {
                    // ✅ Gọi Stripe checkout session
                    stripeCheckout.mutate(res.order_id, {
                        onSuccess: (session) => {
                            window.location.href = session.checkout_url; // Redirect sang Stripe
                        },
                    });
                } else {
                    alert("Đặt hàng thành công!");
                    useCartStore.getState().clearCart();
                    navigate(`/checkoutsuccess/${res.order_id}`);
                }
            },
            onError: (err: any) => {
                console.error("Checkout error:", err);
                alert("Có lỗi xảy ra khi đặt hàng: " + err.message);
            },
        });
    };

    return (
        <Box sx={{ bgcolor: "#f9fbfd", minHeight: "100vh", py: 4 }}>
            <Typography variant="h4" align="center" fontWeight="bold" mb={4}>
                Thanh toán đơn hàng
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 3,
                    justifyContent: "center",
                    alignItems: "flex-start",
                    px: { xs: 2, md: 8, lg: 15 },
                }}
            >
                <Box flex={1}>
                    <Checkout
                        addresses={addresses}
                        profile={profile}
                        manualAddress={manualAddress}
                        setManualAddress={setManualAddress}
                        shippingMethod={shippingMethod}
                        setShippingMethod={setShippingMethod}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />
                </Box>

                <Box flex={1} sx={{ width: { xs: "100%", md: 400 }, position: { md: "sticky" }, top: 100 }}>
                    <CheckoutSummary
                        shippingMethod={shippingMethod}
                        paymentMethod={paymentMethod}
                        onCheckout={handleCheckout}
                        isLoading={checkout.isPending}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default CheckoutPage;
