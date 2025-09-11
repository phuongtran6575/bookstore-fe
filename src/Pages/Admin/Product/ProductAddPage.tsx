import { Box, Typography, TextField, Button,} from "@mui/material";
import { Link } from "react-router-dom";
import { useCreateBook } from "../../../api/hook/useBook";
import { useState } from "react";
import type { Book } from "../../../core/Types";

const ProductEditPage = () => {
  const createBook = useCreateBook();
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    createBook.mutate(formData, {
      onSuccess: () => {
        alert("Thêm sách thành công!");
        // có thể điều hướng về danh sách sản phẩm
        // navigate("/admin/products");
      },
      onError: (err) => {
        console.error(err);
        alert("Có lỗi xảy ra khi thêm sách");
      },
    });
  };
  return (
    <Box p={3}>
      {/* Quay lại */}
      <Typography color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
       <Link to="/admin/products">← Quay lại danh sách sản phẩm</Link>
        
      </Typography>

      {/* Tiêu đề */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thêm sản phẩm mới
      </Typography>

      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
          <Typography fontWeight="bold" mb={2}>Thông tin cơ bản</Typography>
          <TextField fullWidth label="Tên sách" size="small" sx={{ mb: 2 }} />
          <TextField fullWidth label="Mô tả chi tiết" sx={{ mb: 2 }} size="small" multiline rows={4} />
          <TextField fullWidth label="SKU" size="small" sx={{ mb: 2 }} />
          <TextField fullWidth label="Giá" size="small" sx={{ mb: 2 }} />
          <TextField fullWidth label="Giá Sale" size="small" sx={{ mb: 2 }} />
          <TextField fullWidth label="Số lượng" size="small" sx={{ mb: 2 }} />
          <TextField fullWidth label="Số trang" size="small" sx={{ mb: 2 }} />
          <TextField fullWidth label="Loại" size="small" sx={{ mb: 2 }} />
          <TextField fullWidth label="Ngày phát hành" size="small" sx={{ mb: 2 }} />
      </Box>

      {/* Nút */}
      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined">Hủy</Button>
        <Button onClick={handleSave} variant="contained" color="warning">
          Lưu sản phẩm
        </Button>
      </Box>
    </Box>
  );
};

export default ProductEditPage;
