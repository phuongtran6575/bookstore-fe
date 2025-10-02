import { Box, Breadcrumbs, Typography } from "@mui/material";
import CategorySidebar from "../../Component/Client/CategorySidebar";
import ListProductByCategory from "../../Component/Client/ListProductByCategory";
import { useFilter, useGetListBooks } from "../../api/hook/useBook";
import { useState } from "react";

const CategoryPage = () => {
    const [filters, setFilters] = useState({
        authorIds: [] as string[],
        publisherIds: [] as string[],
        categoryIds: [] as string[], // nếu có category filter
        rating: null as number | null,
        price: [0, 500000],
    });

    const { data: books, isLoading: isLoadingBooks } = useFilter({
        authorIds: filters.authorIds,
        publisherIds: filters.publisherIds,
        categoryIds: filters.categoryIds,
    });

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
                    flexDirection: { xs: "column", md: "row" },
                    gap: 4,
                    px: { xs: 2, md: 10 },
                    mt: 3,
                }}
            >
                {/* Sidebar */}
                <Box sx={{ flex: { xs: "1 1 100%", md: "0 0 250px" } }}>
                    <CategorySidebar filters={filters} setFilters={setFilters} />
                </Box>

                {/* Product list */}
                <Box sx={{ flex: 1 }}>
                    {isLoadingBooks ? (
                        <Typography>Đang tải...</Typography>
                    ) : (
                        <ListProductByCategory products={books || []} />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default CategoryPage;