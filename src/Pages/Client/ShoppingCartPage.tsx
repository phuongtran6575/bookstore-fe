import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid';
import OrderSummary from '../../Component/Client/OrderSummary ';
import Cart from '../../Component/Client/Cart';
import { useCartStore } from '../../core/store/cartStore';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from 'react-router-dom';


const ShoppingCartPage = () => {
    const navigate = useNavigate()
    const { items, increaseQuantity, decreaseQuantity, removeFromCart, total, clearCart } =
        useCartStore();

    return (
        <Box sx={{ bgcolor: "#f9fbfd", minHeight: "100vh", p: { xs: 1, md: 4 } }}>
            {items.length > 0 ? <Box
                sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 1, alignItems: "flex-start", px: 15 }}>
                <Box flex={1}>
                    <Cart
                        books={items || []}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        removeFromCart={removeFromCart}
                    />
                </Box>

                <Box width={{ xs: "100%", md: 350 }}>
                    <OrderSummary total={total} />
                </Box>
            </Box> : <Box
                sx={{
                    minHeight: "80vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#f9fbfd",
                    textAlign: "center",
                    px: 2,
                }}
            >
                {/* Icon */}
                <ShoppingCartOutlinedIcon
                    sx={{
                        fontSize: 80,
                        color: "#cbd5e1",
                        mb: 2,
                    }}
                />

                {/* Tiêu đề */}
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        color: "#0f172a",
                        mb: 1,
                    }}
                >
                    Giỏ hàng của bạn đang trống trơn!
                </Typography>

                {/* Mô tả */}
                <Typography
                    variant="body1"
                    sx={{
                        color: "#64748b",
                        mb: 3,
                    }}
                >
                    Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng.
                </Typography>

                {/* Nút */}
                <Button onClick={() => navigate("/")}
                    variant="contained"
                    sx={{
                        bgcolor: "#d97706",
                        color: "#fff",
                        fontWeight: 700,
                        px: 4,
                        py: 1.5,
                        borderRadius: "8px",
                        "&:hover": {
                            bgcolor: "#b45309",
                        },
                    }}
                >
                    BẮT ĐẦU MUA SẮM
                </Button>
            </Box>}

        </Box>

    );
};

export default ShoppingCartPage;