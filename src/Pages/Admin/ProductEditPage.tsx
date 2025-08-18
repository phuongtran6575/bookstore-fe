import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  MenuItem,
} from "@mui/material";
import Grid2 from "@mui/material/Grid"; // Grid2 mới của MUI v7

const ProductEditPage = () => {
  return (
    <Box p={3}>
      {/* Quay lại */}
      <Typography color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
        ← Quay lại danh sách sản phẩm
      </Typography>

      {/* Tiêu đề */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thêm sản phẩm mới
      </Typography>

      {/* Grid2 layout */}
      <Grid2 container spacing={2}>
        {/* Cột trái */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          {/* Thông tin cơ bản */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Thông tin cơ bản
              </Typography>
              <TextField fullWidth label="Tên sách" size="small" sx={{ mb: 2 }} />
              <TextField
                fullWidth
                label="Mô tả chi tiết"
                size="small"
                multiline
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Giá & Kho hàng */}
          <Card>
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Giá & Kho hàng
              </Typography>
              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Giá bán (VND)"
                    size="small"
                    defaultValue={0}
                  />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField fullWidth label="Giá gốc (nếu có)" size="small" />
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Số lượng tồn kho"
                    size="small"
                    defaultValue={0}
                  />
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>

        {/* Cột phải */}
        <Grid2 size={{ xs: 12, md: 4 }}>
          {/* Ảnh sản phẩm */}
          <Card sx={{ mb: 2, textAlign: "center", py: 4 }}>
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Ảnh sản phẩm
              </Typography>
              <Box
                sx={{
                  border: "2px dashed #ccc",
                  p: 3,
                  borderRadius: 2,
                  cursor: "pointer",
                }}
              >
                <Typography color="primary">Tải ảnh lên hoặc kéo thả</Typography>
                <Typography variant="body2" color="text.secondary">
                  PNG, JPG, GIF up to 10MB
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Tổ chức */}
          <Card>
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                Tổ chức
              </Typography>
              <TextField
                fullWidth
                select
                label="Danh mục"
                size="small"
                sx={{ mb: 2 }}
              >
                <MenuItem value="sach">Sách</MenuItem>
                <MenuItem value="vanphongpham">Văn phòng phẩm</MenuItem>
              </TextField>
              <TextField fullWidth label="Tác giả" size="small" sx={{ mb: 2 }} />
              <TextField fullWidth label="Nhà xuất bản" size="small" />
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>

      {/* Nút */}
      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="outlined">Hủy</Button>
        <Button variant="contained" color="warning">
          Lưu sản phẩm
        </Button>
      </Box>
    </Box>
  );
};

export default ProductEditPage;
