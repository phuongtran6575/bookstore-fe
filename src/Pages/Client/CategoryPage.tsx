import { Box, Breadcrumbs, Typography } from "@mui/material";
import CategorySidebar from "../../Component/Client/CategorySidebar";
import ListProductByCategory from "../../Component/Client/ListProductByCategory";
import { useGetListBooks } from "../../api/hook/useBook";

const CategoryPage = () => {
    const { data: books, isLoading: isLoadingBooks, error: errorBooks } = useGetListBooks()
    return (
        <Box>
            {/* Breadcrumb */}
            <Breadcrumbs sx={{ mt: 4, px: { xs: 2, md: 10 } }}>
                <Typography color="inherit">Trang chủ</Typography>
                <Typography color="inherit">Kinh Tế</Typography>
                <Typography color="text.primary">Category</Typography>
            </Breadcrumbs>

            {/* Layout content */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" }, // Mobile: dọc, Desktop: ngang
                    gap: 4,
                    px: { xs: 2, md: 10 }, // padding ngang: nhỏ trên mobile, rộng trên desktop
                    mt: 3,
                }}
            >
                {/* Sidebar */}
                <Box
                    sx={{
                        flex: { xs: "1 1 100%", md: "0 0 250px" }, // Mobile: full width, Desktop: fix 250px
                    }}
                >
                    <CategorySidebar />
                </Box>

                {/* Product list */}
                <Box
                    sx={{
                        flex: 1,
                    }}
                >
                    <ListProductByCategory products={books || []} />
                </Box>
            </Box>
        </Box>
    );
};

export default CategoryPage;