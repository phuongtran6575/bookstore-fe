import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useAuthorCrud } from "../../../api/hook/useUltility";

const AuthorAddPage = () => {
  const { useCreateAuthor } = useAuthorCrud();
  const navigate = useNavigate();
  const createAuthor = useCreateAuthor();
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSave = () => {
    createAuthor.mutate(formData, {
      onSuccess: () => {
        alert("Thêm tác giả thành công!");
        navigate("/admin/authors");
      },
      onError: (err) => {
        console.error(err);
        alert("Có lỗi xảy ra khi thêm tác giả");
      },
    });
  };

  return (
    <Box p={3}>
      <Typography component={Link} to="/admin/authors" color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
        ← Quay lại danh sách tác giả
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thêm tác giả mới
      </Typography>

      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <Typography fontWeight="bold" mb={2}>Thông tin cơ bản</Typography>
        <TextField fullWidth label="Tên tác giả" name="name" size="small" sx={{ mb: 2 }} value={formData.name} onChange={handleChange} />
        <TextField fullWidth  multiline rows={4} label="Thông tin" name="bio" size="small" sx={{ mb: 2 }} value={formData.bio} onChange={handleChange} />
      </Box>

      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" onClick={() => navigate("/admin/authors")}>Hủy</Button>
        <Button onClick={handleSave} variant="contained" color="warning">
          Lưu tác giả
        </Button>
      </Box>
    </Box>
  );
};

export default AuthorAddPage;