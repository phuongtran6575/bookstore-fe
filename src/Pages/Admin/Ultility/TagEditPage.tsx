import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTagCrud } from "../../../api/hook/useUltility"; // Đã đổi tên hook

const TagEditPage = () => {
  const { id } = useParams<{ id: string }>();
  // Đã đổi tên hook và các hàm
  const { useGetTagById, useUpdateTag } = useTagCrud();
  const { data: tag, isLoading, error } = useGetTagById(id || "");
  const updateTag = useUpdateTag();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    slug: ""
  });

  useEffect(() => {
    if (tag) {
      setFormData({
        name: tag.name || "",
        slug: tag.slug || "",
      });
    }
  }, [tag]);

  if (!id) return <p>No tag selected</p>; // Cập nhật thông báo
  if (isLoading) return <p>Loading tag...</p>; // Cập nhật thông báo
  if (error) return <p>Failed to load tag</p>; // Cập nhật thông báo

  const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateTag.mutate(
      { id, data: formData },
      { onSuccess: () => navigate(`/admin/tags`) } // Cập nhật đường dẫn điều hướng
    );
  };

  return (
    <Box p={3}>
      <Typography color="warning.main" sx={{ mb: 2 }}>
        <Link to={`/admin/tags`}>← Quay lại danh sách tag</Link>
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Chỉnh sửa tag
      </Typography>

      <Box padding={3} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <TextField name="name"  value={formData.name}   onChange={handleChange}  fullWidth  label="Name"   sx={{ mb: 2 }}  />
        <TextField name="name"  value={formData.slug}   onChange={handleChange}  fullWidth  label="Name"   sx={{ mb: 2 }}  />
        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" onClick={handleSave}>Lưu</Button>
          <Button variant="outlined" onClick={() => navigate(`/admin/tags`)}>Hủy</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TagEditPage;