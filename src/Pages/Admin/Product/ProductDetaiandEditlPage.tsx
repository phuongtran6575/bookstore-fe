import { Box,  TextField, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useBookbyId } from '../../../api/hook/useBook';
const ProductDetailandEditPage = () => {
  const { id } = useParams<{ id: string }>(); 
  if (!id) return <p>No product selected</p>;
  const { data: book, isLoading, error } = useBookbyId(id);

  if (!id) return <p>No user selected</p>;
  if (isLoading) return <p>Loading user...</p>;
  if (error) return <p>Failed to load user</p>;

  return (
    <Box p={3}>
      {/* Quay lại */}
      <Typography color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
       <Link to="/admin/products">← Quay lại danh sách sản phẩm</Link>
      </Typography>
      {/* Tiêu đề */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thông tin sản phẩm
      </Typography>

      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
          <Typography fontWeight="bold" mb={2}>Thông tin cơ bản</Typography>
          <TextField disabled defaultValue={book?.title} fullWidth label="Tên sách" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={book?.description} fullWidth label="Mô tả chi tiết" sx={{ mb: 2 }} size="small" multiline rows={4} />
          <TextField disabled defaultValue={book?.sku} fullWidth label="SKU" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={book?.price} fullWidth label="Giá" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={book?.sale_price} fullWidth label="Giá Sale" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={book?.stock_quantity} fullWidth label="Số lượng" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={book?.page_count} fullWidth label="Số trang" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={book?.cover_type} fullWidth label="Loại" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={book?.publication_date} fullWidth label="Ngày phát hành" size="small" sx={{ mb: 2 }} />
          
      </Box>

      
    </Box>
  )
}

export default ProductDetailandEditPage
