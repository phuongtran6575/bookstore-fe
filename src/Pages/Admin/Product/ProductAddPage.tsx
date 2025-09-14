import { Box, Typography, TextField, Button,} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useCreateBook } from "../../../api/hook/useBook";
import { useState } from "react";
import type {  BookCreate } from "../../../core/Types";

const ProductEditPage = () => {
  const navigate = useNavigate();
  const createBook = useCreateBook();
  const [formData, setFormData] = useState<BookCreate>({
    title: "",
    description: "",
    sku: "",
    price: 0,
    sale_price: 0,
    stock_quantity: 0,
    page_count: 0,
    cover_type: "",
    publication_date: null as Date | null,
    
  });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setFormData(prev => ({ ...prev, [e.target.name]: val }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, publication_date:new Date(e.target.value)  }));
  };

  const handleSave = () => {
    createBook.mutate(formData, {
      onSuccess: () => {
        alert("Thêm sách thành công!");
        // có thể điều hướng về danh sách sản phẩm
        navigate("/admin/books");
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
      <Typography component={Link} to="/admin/books" color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
    ← Quay lại danh sách sản phẩm
        
      </Typography>

      {/* Tiêu đề */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thêm sản phẩm mới
      </Typography>

      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
           <Typography fontWeight="bold" mb={2}>Thông tin cơ bản</Typography>

        <TextField fullWidth label="Tên sách" name="title" size="small" sx={{ mb: 2 }} value={formData.title} onChange={handleChange} />
        <TextField fullWidth label="Mô tả chi tiết" name="description" size="small" sx={{ mb: 2 }} multiline rows={4} value={formData.description} onChange={handleChange} />
        <TextField fullWidth label="SKU" name="sku" size="small" sx={{ mb: 2 }} value={formData.sku} onChange={handleChange} />
        <TextField fullWidth label="Giá" name="price" size="small" type="number" sx={{ mb: 2 }} value={formData.price} onChange={handleChange} />
        <TextField fullWidth label="Giá Sale" name="sale_price" size="small" type="number" sx={{ mb: 2 }} value={formData.sale_price} onChange={handleChange} />
        <TextField fullWidth label="Số lượng" name="stock_quantity" size="small" type="number" sx={{ mb: 2 }} value={formData.stock_quantity} onChange={handleChange} />
        <TextField fullWidth label="Số trang" name="page_count" size="small" type="number" sx={{ mb: 2 }} value={formData.page_count} onChange={handleChange} />
        <TextField fullWidth label="Loại" name="cover_type" size="small" sx={{ mb: 2 }} value={formData.cover_type} onChange={handleChange} />
        <TextField fullWidth label="Ngày phát hành" name="publication_date" size="small" type="date" sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} value={formData.publication_date ? formData.publication_date.toISOString().split("T")[0] : ""} onChange={handleDateChange} />
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
