import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useTagCrud } from "../../../api/hook/useUltility";

const TagAddPage = () => {
  const { useCreateTag } = useTagCrud();
  const navigate = useNavigate();
  const createTag = useCreateTag();
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
    createTag.mutate(formData, {
      onSuccess: () => {
        alert("Thêm thẻ thành công!");
        navigate("/admin/tags");
      },
      onError: (err) => {
        console.error(err);
        alert("Có lỗi xảy ra khi thêm thẻ");
      },
    });
  };

  return (
    <Box p={3}>
      <Typography component={Link} to="/admin/tags" color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
        ← Quay lại danh sách thẻ
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thêm thẻ mới
      </Typography>

      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <Typography fontWeight="bold" mb={2}>Thông tin cơ bản</Typography>
        <TextField
          fullWidth
          label="Tên thẻ"
          name="name"
          size="small"
          sx={{ mb: 2 }}
          value={formData.name}
          onChange={handleChange}
        />
      </Box>

      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined" onClick={() => navigate("/admin/tags")}>Hủy</Button>
        <Button onClick={handleSave} variant="contained" color="warning">
          Lưu thẻ
        </Button>
      </Box>
    </Box>
  );
};

export default TagAddPage;