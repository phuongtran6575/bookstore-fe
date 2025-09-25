import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { usePublisherCrud } from "../../../api/hook/useUltility";

const PublisherAddPage = () => {
  const { useCreatePublisher } = usePublisherCrud();
  const navigate = useNavigate();
  const createPublisher = useCreatePublisher();
  const [formData, setFormData] = useState({
    name: "",
    address:"",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    createPublisher.mutate(formData, {
      onSuccess: () => {
        alert("Thêm nhà xuất bản thành công!");
        navigate("/admin/publishers");
      },
      onError: (err) => {
        console.error(err);
        alert("Có lỗi xảy ra khi thêm nhà xuất bản");
      },
    });
  };

  return (
    <Box p={3}>
      <Typography component={Link} to="/admin/publishers" color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
        ← Quay lại danh sách nhà xuất bản
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thêm nhà xuất bản mới
      </Typography>

      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <Typography fontWeight="bold" mb={2}>Thông tin cơ bản</Typography>
        <TextField fullWidth label="Tên nhà xuất bản" name="name" size="small" sx={{ mb: 2 }} value={formData.name} onChange={handleChange}/>
        <TextField fullWidth label="Địa chỉ" name="address" size="small" sx={{ mb: 2 }} value={formData.address} onChange={handleChange}/>
      </Box>

      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" onClick={() => navigate("/admin/publishers")}>Hủy</Button>
        <Button onClick={handleSave} variant="contained" color="warning">
          Lưu nhà xuất bản
        </Button>
      </Box>
    </Box>
  );
};

export default PublisherAddPage;