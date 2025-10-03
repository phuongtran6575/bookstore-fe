import { Box, Grid, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid';
import OrderSummary from '../../Component/Client/OrderSummary ';
import Cart from '../../Component/Client/Cart';
import { useCartStore } from '../../core/store/cartStore';

const ShoppingCartPage = () => {
    const { items, increaseQuantity, decreaseQuantity, removeFromCart, total, clearCart } =
        useCartStore();

    return (
        <Box sx={{ bgcolor: "#f9fbfd", minHeight: "100vh", p: { xs: 1, md: 4 } }}>
            <Typography variant="h5" mb={2}>
                Giỏ hàng của bạn
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 1,
                    alignItems: "flex-start",
                }}
            >
                {/* Giỏ hàng */}
                <Box flex={1}>
                    <Cart
                        books={items || []}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        removeFromCart={removeFromCart}
                    />
                </Box>

                {/* Tóm tắt đơn hàng */}
                <Box width={{ xs: "100%", md: 350 }}>
                    <OrderSummary total={total} />
                </Box>
            </Box>
        </Box>

    );
};

export default ShoppingCartPage;