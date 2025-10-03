import { Box, Typography, Card, CardContent, CardMedia, IconButton, Button } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useState } from "react";

interface CartProps {
    books: any[],
    increaseQuantity: (id: string) => void,
    decreaseQuantity: (id: string) => void,
    removeFromCart: (id: string) => void,
}


const Cart = ({ books, increaseQuantity, decreaseQuantity, removeFromCart }: CartProps) => {


    return (
        <Box sx={{ p: 1, bgcolor: "#f9fbfd", minHeight: "100vh" }}>
            {/* Tiêu đề */}

            <Card sx={{ p: 1, borderRadius: 3, boxShadow: 1, maxWidth: 800, bgcolor: "white", }} >
                <Typography variant="body1" fontWeight="500" mb={2}>hiện có {books.length} sản phẩm </Typography>
                {books.map((book) => (
                    <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ borderTop: "1px solid #eee", pt: 2 }}>
                        {/* Hình ảnh + thông tin */}
                        <Box display="flex" alignItems="center" gap={2}>
                            <CardMedia component="img" sx={{ width: 80, height: 100, borderRadius: 1 }}
                                image={book.image}
                                alt="Nhà Giả Kim" />
                            <CardContent sx={{ p: 0 }}>
                                <Typography variant="subtitle1" fontWeight="600">  {book.title} </Typography>
                                <Typography variant="body2" color="text.secondary"> Paulo Coelho </Typography>
                            </CardContent>
                        </Box>

                        {/* Nút tăng giảm */}
                        <Box display="flex" alignItems="center" gap={1}>
                            <IconButton onClick={() => decreaseQuantity(book.id)} size="small" sx={{ border: "1px solid #ccc" }}>
                                <Remove fontSize="small" />
                            </IconButton>
                            <Box sx={{ border: "1px solid #ccc", px: 2, py: 0.5, borderRadius: 1, minWidth: 40, textAlign: "center", }}>
                                {book.quantity}
                            </Box>
                            <IconButton onClick={() => increaseQuantity(book.id)} size="small" sx={{ border: "1px solid #ccc" }}>
                                <Add fontSize="small" />
                            </IconButton>
                        </Box>

                        {/* Giá + nút xóa */}
                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography fontWeight="500">{book.price * book.quantity}</Typography>
                            <IconButton color="error" onClick={() => removeFromCart(book.id)}>
                                <Delete />
                            </IconButton>
                        </Box>
                    </Box>
                ))}



                {/* Tiếp tục mua sắm */}
                <Box mt={3}>
                    <Button variant="text" color="warning">
                        ← Tiếp tục mua sắm
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default Cart;
