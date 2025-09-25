import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetBookbyId, useUpdateBook } from "../../../api/hook/useBook";

const ProductEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useGetBookbyId(id || "");
  const updateRole = useUpdateBook();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sku: "",
    price: 0,
    sale_price: 0,
    stock_quantity: 0,
    ISBN:"",
    page_count: 0,
    cover_type: "",
    publication_date: null as Date | null,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        description: book.description || "",
        sku: book.sku || "",
        price: book.price || 0,
        sale_price: book.sale_price || 0,
        stock_quantity: book.stock_quantity || 0,
        ISBN: book.ISBN || "",
        page_count: book.page_count || 0,
        cover_type: book.cover_type || "",
        publication_date: book.publication_date ? new Date(book.publication_date) : null,      
      });
    }
  }, [book]);

  if (!id) return <p>No user selected</p>;
  if (isLoading) return <p>Loading user...</p>;
  if (error) return <p>Failed to load user</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, publication_date:new Date(e.target.value)  }));
  };

  const handleSave = () => {
    updateRole.mutate(
      { id, data: formData },
      { onSuccess: () => navigate(`/admin/roles`) }
    );
  };

  return (
    <Box p={3}>
      <Typography color="warning.main" sx={{ mb: 2 }}>
        <Link to={`/admin/books `}>← Quay lại danh sách role</Link>
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Chỉnh sửa user
      </Typography>

      <Box padding={3} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <TextField  defaultValue={book?.title} fullWidth label="Tên sách" size="small" sx={{ mb: 2 }} />
          <TextField fullWidth label="Tên sách" name="title" size="small" sx={{ mb: 2 }} value={formData.title} onChange={handleChange} />
        <TextField fullWidth label="Mô tả chi tiết" name="description" size="small" sx={{ mb: 2 }} multiline rows={4} value={formData.description} onChange={handleChange} />
        <TextField fullWidth label="SKU" name="sku" size="small" sx={{ mb: 2 }} value={formData.sku} onChange={handleChange} />
        <TextField fullWidth label="Giá" name="price" size="small" type="number" sx={{ mb: 2 }} value={formData.price} onChange={handleChange} />
        <TextField fullWidth label="Giá Sale" name="sale_price" size="small" type="number" sx={{ mb: 2 }} value={formData.sale_price} onChange={handleChange} />
        <TextField fullWidth label="ISBN" name="ISBN" size="small" sx={{ mb: 2 }} value={formData.ISBN} onChange={handleChange} />
        <TextField fullWidth label="Số lượng" name="stock_quantity" size="small" type="number" sx={{ mb: 2 }} value={formData.stock_quantity} onChange={handleChange} />
        <TextField fullWidth label="Số trang" name="page_count" size="small" type="number" sx={{ mb: 2 }} value={formData.page_count} onChange={handleChange} />
        <TextField fullWidth label="Loại" name="cover_type" size="small" sx={{ mb: 2 }} value={formData.cover_type} onChange={handleChange} />
        <TextField fullWidth label="Ngày phát hành" name="publication_date" size="small" type="date" sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} value={formData.publication_date? new Date(formData.publication_date).toISOString().split("T")[0]: ""} onChange={handleDateChange} />
        

        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" onClick={handleSave}>Lưu</Button>
          <Button variant="outlined" onClick={() => navigate(`/admin/users`)}>Hủy</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductEditPage;
