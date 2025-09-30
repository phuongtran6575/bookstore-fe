import { Box, Breadcrumbs, Typography } from "@mui/material";
import CategorySidebar from "../../Component/Client/CategorySidebar";

const CategoryPage = () => {
    return (
        <Box>
            <Breadcrumbs sx={{ mt: 4, ml: 10 }}>
                <Typography color="inherit">Trang chủ</Typography>
                <Typography color="inherit">Kinh Tế</Typography>
                <Typography color="text.primary">Category</Typography>
            </Breadcrumbs>
            <Box sx={{ display: "flex", ml: 4, mr: 4, justifyContent: "center", gap: 4 }}>
                <CategorySidebar />
                <Box width="70%" >Category</Box>
            </Box>

        </Box>

    )
}
export default CategoryPage;