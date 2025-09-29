import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { usePublisherCrud } from "../../../api/hook/useUltility"; // Đã đổi tên hook

const PublisherEditPage = () => {
  const { id } = useParams<{ id: string }>();
  // Đã đổi tên hook và các hàm
  const { useGetPublisherById, useUpdatePublisher } = usePublisherCrud();
  const { data: publisher, isLoading, error } = useGetPublisherById(id || "");
  const updatePublisher = useUpdatePublisher();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: ""
  });

  useEffect(() => {
    if (publisher) {
      setFormData({
        name: publisher.name || "",
        address: publisher.address || "",
      });
    }
  }, [publisher]);

  if (!id) return <p>No publisher selected</p>; // Cập nhật thông báo
  if (isLoading) return <p>Loading publisher...</p>; // Cập nhật thông báo
  if (error) return <p>Failed to load publisher</p>; // Cập nhật thông báo

  const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updatePublisher.mutate(
      { id, data: formData },
      { onSuccess: () => navigate(`/admin/publishers`) }
    );
  };

  return (
    <Box p={3}>
      <Typography color="warning.main" sx={{ mb: 2 }}>
        <Link to={`/admin/publishers`}>← Quay lại danh sách publisher</Link>
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Chỉnh sửa publisher
      </Typography>

      <Box padding={3} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <TextField  name="name"  value={formData.name}  onChange={handleChange}  fullWidth  label="Name"  sx={{ mb: 2 }}  />
        <TextField  name="name"  value={formData.address}  onChange={handleChange}  fullWidth  label="Name"  sx={{ mb: 2 }}  />
        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" onClick={handleSave}>Lưu</Button>
          <Button variant="outlined" onClick={() => navigate(`/admin/publishers`)}>Hủy</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PublisherEditPage;