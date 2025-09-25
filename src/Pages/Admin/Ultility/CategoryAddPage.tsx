import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useCategoryCrud } from "../../../api/hook/useUltility";

const CategoryAddPage = () => {
  const { useCreateCategory } = useCategoryCrud();
  const navigate = useNavigate();
  const createCategory = useCreateCategory();
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    createCategory.mutate(formData, {
      onSuccess: () => {
        alert("Thêm danh mục thành công!");
        navigate("/admin/categories");
      },
      onError: (err) => {
        console.error(err);
        alert("Có lỗi xảy ra khi thêm danh mục");
      },
    });
  };

  return (
    <Box p={3}>
      <Typography component={Link} to="/admin/categories" color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
        ← Quay lại danh sách danh mục
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thêm danh mục mới
      </Typography>

      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <Typography fontWeight="bold" mb={2}>Thông tin cơ bản</Typography>
        <TextField fullWidth label="Tên danh mục"  name="name" size="small" sx={{ mb: 2 }} value={formData.name} onChange={handleChange} />
      </Box>

      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" onClick={() => navigate("/admin/categories")}>Hủy</Button>
        <Button onClick={handleSave} variant="contained" color="warning">
          Lưu danh mục
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryAddPage;