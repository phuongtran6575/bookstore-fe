import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCategoryCrud } from "../../../api/hook/useUltility"; // Đã đổi tên hook

const CategoryEditPage = () => {
  const { id } = useParams<{ id: string }>();
  // Đã đổi tên hook và các hàm
  const { useGetCategoryById, useUpdateCategory } = useCategoryCrud();
  const { data: category, isLoading, error } = useGetCategoryById(id || "");
  const updateCategory = useUpdateCategory();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    slug: ""
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        slug: category.slug || ""
      });
    }
  }, [category]);

  if (!id) return <p>No category selected</p>;
  if (isLoading) return <p>Loading category...</p>; // Đã cập nhật thông báo
  if (error) return <p>Failed to load category</p>; // Đã cập nhật thông báo

  const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateCategory.mutate(
      { id, data: formData },
      { onSuccess: () => navigate(`/admin/categories`) }
    );
  };

  return (
    <Box p={3}>
      <Typography color="warning.main" sx={{ mb: 2 }}>
        <Link to={`/admin/categories`}>← Quay lại danh sách category</Link>
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Chỉnh sửa category
      </Typography>

      <Box padding={3} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <TextField  name="name"   value={formData.name}  onChange={handleChange}  fullWidth label="Name"  sx={{ mb: 2 }}  />
        <TextField  name="name"   value={formData.slug}  onChange={handleChange}  fullWidth label="Name"  sx={{ mb: 2 }}  />
        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" onClick={handleSave}>Lưu</Button>
          <Button variant="outlined" onClick={() => navigate(`/admin/categories`)}>Hủy</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryEditPage;