import { Box, Breadcrumbs, Typography, Divider, Rating, Button, IconButton, TextField } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useBookAuthorRelationship, useBookCategoryRelationship, useBookTagRelationship, useGetBookbyId, useGetImagesBook, useGetListPublishersBook } from '../../api/hook/useBook';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ClientProductDetailPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const { useGetCategoriesByBookId } = useBookCategoryRelationship();
  const { useGetAuthorsByBookId } = useBookAuthorRelationship();
  const { useGetTagsByBookId } = useBookTagRelationship();

  const { data: book, isLoading: isLoadingBook, error: errorBook } = useGetBookbyId(id || "")
  const { data: publishers, isLoading: isLoadingPublishers, error: errorPublishers } = useGetListPublishersBook(id || "")
  const { data: authors, isLoading: isLoadingAuthors, error: errorAuthors } = useGetAuthorsByBookId(id || "");
  const { data: images, isLoading: isLoadingImages, error: errorImages } = useGetImagesBook(id || "")
  console.log(images)
  const { data: categories, isLoading: isLoadingCategories, error: errorCategories } = useGetCategoriesByBookId(id || "");
  const { data: tags, isLoading: isLoadingTags, error: errorTags } = useGetTagsByBookId(id || "");
  const defaultImage = images?.find((img: any) => img.is_thumbnail) || images?.[0];
const [selectedImage, setSelectedImage] = useState<any>(null);

useEffect(() => {
  if (images && images.length > 0) {
    setSelectedImage(defaultImage);
  }
}, [images]);
  if (!id) return <p>No user selected</p>;
  if (isLoadingBook || isLoadingCategories || isLoadingAuthors || isLoadingPublishers || isLoadingTags || isLoadingImages) return <p>Loading Book...</p>;
  if (errorBook || errorCategories || errorAuthors || errorPublishers || errorTags || errorImages) return <p>Failed to load Book</p>;

  // === chọn ảnh mặc định (thumbnail nếu có) ===
  
  

  return (
    <Box p={3}>
      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Typography color="inherit">Trang chủ</Typography>
        <Typography color="inherit">Kinh Tế</Typography>
        <Typography color="text.primary">{book?.title}</Typography>
      </Breadcrumbs>

      <Box display="flex" gap={4}>
        {/* LEFT: IMAGE + THUMBNAIL */}
        <Box flex={1}>
          {/* Main Image */}
          <Box
            component="img"
            src={selectedImage?.image_url}
            alt={book?.title}
            sx={{
              width: "100%",
              height: 400,
              objectFit: "cover",
              borderRadius: 2,
              border: "1px solid #e5e7eb",
              mb: 2,
            }}
          />

          {/* Thumbnail Swiper */}
         {images && images.length > 0 ? (
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={10}
                    slidesPerView={3}
                    style={{ width: "100%", height: "300px" }} >
                    {images.map((img: any) => (
                      <SwiperSlide key={img.id}>
                        <Box
                          component="img"
                          src={img.image_url}
                          alt={book?.title}
                          sx={{ width: "100%", height: "100%", objectFit: "cover",borderRadius: 2, border: "1px solid #e5e7eb", }} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Chưa có hình ảnh nào
                  </Typography>
                )}
        </Box>

        {/* RIGHT: PRODUCT INFO */}
        <Box flex={1.2} display="flex" flexDirection="column" gap={2}>
          <Typography variant="h5" fontWeight="bold">
            {book?.title}
          </Typography>

          {/* Tác giả + NXB */}
          <Box>
            <Box display="flex" gap={1}>
              <Typography fontWeight="bold">Tác giả:</Typography>
              <Typography>
                {authors && authors.length > 0
                  ? authors.map((a: any) => a.name).join(", ")
                  : "Đang cập nhật"}
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box display="flex" gap={1}>
              <Typography fontWeight="bold">NXB:</Typography>
              <Typography>
                {publishers && publishers.length > 0
                  ? publishers.map((p: any) => p.name).join(", ")
                  : "Đang cập nhật"}
              </Typography>
            </Box>
          </Box>

          {/* Rating + đánh giá + đã bán */}
          <Box display="flex" alignItems="center" gap={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography>{4.3}</Typography>
              <Rating value={4.3} precision={0.1} readOnly />
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box textAlign="center">
              <Typography fontWeight="bold">{101}</Typography>
              <Typography variant="body2">Đánh giá</Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box textAlign="center">
              <Typography fontWeight="bold">{158}</Typography>
              <Typography variant="body2">Đã bán</Typography>
            </Box>
          </Box>

          {/* Giá */}
          <Box>
            <Typography variant="h6" color="error" fontWeight="bold">
              164.000 đ
            </Typography>
            <Box display="flex" gap={2}>
              <Typography sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                214.000 đ
              </Typography>
              <Typography color="error">-23%</Typography>
            </Box>
          </Box>

          {/* Mô tả */}
          <Typography variant="body1" sx={{ my: 1 }}>
            Mô tả ngắn cho sách
          </Typography>
          <Divider />

          {/* Tình trạng */}
          <Box display="flex" gap={1}>
            <Typography fontWeight="bold">Tình trạng:</Typography>
            <Typography color="success.main">Còn hàng</Typography>
          </Box>

          {/* Số lượng */}
          <Box display="flex" alignItems="center" gap={2}>
            <Typography>Số lượng:</Typography>
            <TextField
              type="number"
              size="small"
              defaultValue={1}
              sx={{ width: 80 }}
              inputProps={{ min: 1 }}
            />
          </Box>

          {/* Buttons */}
          <Box display="flex" gap={2} mt={2}>
            <Button variant="outlined" fullWidth>
              Thêm vào giỏ hàng
            </Button>
            <Button variant="contained" color="warning" fullWidth>
              Mua ngay
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Chính sách */}
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>🚚 Giao hàng toàn quốc</Typography>
            <Typography>✅ Cam kết 100% chính hãng</Typography>
            <Typography>🔄 Đổi trả miễn phí trong 30 ngày nếu có lỗi</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientProductDetailPage;