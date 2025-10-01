import { Card, CardContent, CardMedia, Box, Typography, Button, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { useBookAuthorRelationship, useGetImagesBook } from "../../api/hook/useBook";

type ProductCardProps = {
    product: any;
    oldPrice?: string;
    discount?: string;
    rating?: number;
    reviews?: number;
    badge?: string;
};

const BookCard = ({
    product,
    oldPrice,
    discount,
    rating,
    reviews,
    badge,
}: ProductCardProps) => {

    const { useGetAuthorsByBookId } = useBookAuthorRelationship()

    const { data: images, isLoading: isLoadingImages, error: errorImages } = useGetImagesBook(product.id)
    const { data: authors = [], isLoading: isLoadingAuthors, error: errorAuthors } = useGetAuthorsByBookId(product.id)
    if (isLoadingImages || isLoadingAuthors) return <p>Loading</p>
    if (errorImages || errorAuthors) return <p>error</p>
    const defaultImage = images?.find((img: any) => img.is_thumbnail) || images?.[0];
    const authordefault = authors?.[0]
    console.log(authordefault)
    return (
        <Card
            sx={{
                borderRadius: 2,
                boxShadow: 2,
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": {
                    boxShadow: 6,
                },
                "&:hover .hover-btn": {
                    opacity: 1,
                    transform: "translate(-50%, -50%)",
                },
                "&:hover img": {
                    transform: "scale(1.05)",
                },
            }}
        >
            {/* Hình ảnh + badge */}
            <Box sx={{ position: "relative", overflow: "hidden" }}>
                <CardMedia
                    component="img"
                    height="200"
                    sx={{ transition: "transform 0.3s ease" }}
                    image={defaultImage.image_url}
                />
                {badge && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            bgcolor: "orange",
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            color: "white",
                            fontSize: 12,
                            fontWeight: "bold",
                        }}
                    >
                        {badge}
                    </Box>
                )}
                {discount && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            bgcolor: "red",
                            px: 1,
                            py: 0.5,
                            borderRadius: "50%",
                            color: "white",
                            fontSize: 12,
                            fontWeight: "bold",
                        }}
                    >
                        {discount}
                    </Box>
                )}
                {/* Nút thêm giỏ (căn giữa card) */}
                <Button
                    variant="contained"
                    color="warning"
                    className="hover-btn"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%) scale(0.9)",
                        opacity: 0,
                        transition: "all 0.4s ease",
                        fontWeight: "bold",
                    }}
                >
                    🛒 Thêm vào giỏ
                </Button>
            </Box>

            {/* Nội dung */}
            <CardContent>
                <Typography
                    component={Link}
                    to={`/product/${product.id}`}
                    fontWeight="bold"
                    sx={{
                        textDecoration: "none",
                        color: "inherit",
                        "&:hover": { color: "primary.main" },
                        display: "-webkit-box",
                        WebkitLineClamp: 2,   // giới hạn 2 dòng
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        minHeight: "48px",    // giữ chỗ để tất cả card cân bằng
                    }}
                >
                    {product.title}
                </Typography>
                {authordefault?.name && (<Typography variant="body2" color="text.secondary">
                    {authordefault.name}
                </Typography>)}
                <Box display="flex" alignItems="center" mt={1}>
                    <Rating value={rating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" ml={0.5}>
                        ({reviews})
                    </Typography>
                </Box>
                <Box mt={1} display="flex" alignItems="center" gap={1}>
                    <Typography color="error" fontWeight="bold">
                        {product.price}
                    </Typography>
                    {oldPrice && (
                        <Typography
                            variant="body2"
                            sx={{ textDecoration: "line-through", color: "gray" }}
                        >
                            {oldPrice}
                        </Typography>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default BookCard;
