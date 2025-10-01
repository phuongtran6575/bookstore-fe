import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import BookCard from "./BookCard";
import Grid2 from '@mui/material/Grid';
import type { Book } from "../../core/Types";


type ListProductByCategoryProps = {
    products: any[];
    author?: string;
    oldPrice?: string;
    discount?: string;
    rating?: number;
    reviews?: number;
    badge?: string;
};

const ListProductByCategory = ({ products, author, oldPrice, discount, rating, reviews, badge }: ListProductByCategoryProps) => {
    return (
        <Box>
            {/* Header */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Typography variant="body2" color="text.secondary">
                    Hiển thị {products.length} trên {products.length} sản phẩm
                </Typography>

                <FormControl sx={{ bgcolor: "white" }} size="small">
                    <Select defaultValue="popular">
                        <MenuItem value="popular">Phổ biến nhất</MenuItem>
                        <MenuItem value="newest">Mới nhất</MenuItem>
                        <MenuItem value="priceAsc">Giá tăng dần</MenuItem>
                        <MenuItem value="priceDesc">Giá giảm dần</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Grid chứa BookCard */}
            <Grid2 container spacing={2}>
                {products.map((product) => (
                    <Grid2
                        key={product.id}
                        size={{ xs: 12, sm: 6, md: 3 }}>
                        <BookCard product={product} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );
};

export default ListProductByCategory;