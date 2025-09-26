import { Box, Typography, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useCategoryCrud } from "../../../api/hook/useUltility";

const CategoryDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { useGetCategoryById } = useCategoryCrud();
  
  if (!id) return <p>No category selected</p>;
  
  const { data: category, isLoading, error } = useGetCategoryById(id);
  console.log(category)

  if (isLoading) return <p>Loading category...</p>;
  if (error) return <p>Failed to load category</p>;

  return (
    <Box p={3}>
      {/* Quay lại */}
      <Typography color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
        <Link to="/admin/categories">← Quay lại danh sách danh mục</Link>
      </Typography>
      {/* Tiêu đề */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thông tin danh mục
      </Typography>

      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <Typography fontWeight="bold" mb={2}>Thông tin cơ bản</Typography>
        <TextField disabled defaultValue={category?.name} fullWidth label="Tên danh mục" size="small" sx={{ mb: 2 }} />
        <TextField disabled defaultValue={category?.slug} fullWidth label="Slug" size="small" sx={{ mb: 2 }} />
        <TextField disabled defaultValue={category?.parentName} fullWidth label="Danh mục cha" size="small" sx={{ mb: 2 }} />
      </Box>
    </Box>
  );
};

export default CategoryDetailPage;