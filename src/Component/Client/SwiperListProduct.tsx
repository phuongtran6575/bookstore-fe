import { Box, Typography, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import BookCard from "./BookCard";

const SwiperListProduct = () => {
  const products = [
    {
      id: 1,
      title: "Sách Thiếu Nhi 8",
      author: "Tác giả E",
      price: "62.000 ₫",
      image: "https://picsum.photos/id/1011/400/250",
      rating: 4,
      reviews: 378,
      badge: "Bestseller",
    },
    {
      id: 2,
      title: "Sách Thiếu Nhi 13",
      author: "Tác giả J",
      price: "155.000 ₫",
      oldPrice: "205.000 ₫",
      discount: "-24%",
      image: "https://picsum.photos/id/1012/400/250",
      rating: 4,
      reviews: 378,
    },
    {
      id: 3,
      title: "Sách Thiếu Nhi 18",
      author: "Tác giả O",
      price: "196.000 ₫",
      image: "https://picsum.photos/id/1013/400/250",
      rating: 4,
      reviews: 274,
    },
    {
      id: 4,
      title: "Sách Thiếu Nhi 18",
      author: "Tác giả O",
      price: "196.000 ₫",
      image: "https://picsum.photos/id/1013/400/250",
      rating: 4,
      reviews: 274,
    },
    {
      id: 5,
      title: "Sách Thiếu Nhi 18",
      author: "Tác giả O",
      price: "196.000 ₫",
      image: "https://picsum.photos/id/1013/400/250",
      rating: 4,
      reviews: 274,
    },
  ];

  return (
    <Box sx={{ position: "relative", py: 4 }}>
      <Typography variant="h5" mb={2} fontWeight="bold">
        Sản phẩm tương tự
      </Typography>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        style={{ padding: "20px 0" }}
      >
        {products.map((p) => (
          <SwiperSlide key={p.id}>
            <BookCard {...p} />
          </SwiperSlide>
        ))}

        {/* Prev */}
        <IconButton
          className="custom-prev"
          sx={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            bgcolor: "white",
            width: 48,
            height: 48,
            zIndex: 10,
            boxShadow: 3,
            "&:hover": { bgcolor: "grey.100" },
            "&.swiper-button-disabled": {
              opacity: 0.4,
              cursor: "not-allowed",
            },
          }}
        >
          <ArrowCircleLeftIcon fontSize="large" />
        </IconButton>

        {/* Next */}
        <IconButton
          className="custom-next"
          sx={{
            position: "absolute",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            bgcolor: "white",
            width: 48,
            height: 48,
            zIndex: 10,
            boxShadow: 3,
            "&:hover": { bgcolor: "grey.100" },
            "&.swiper-button-disabled": {
              opacity: 0.4,
              cursor: "not-allowed",
            },
          }}
        >
          <ArrowCircleRightIcon fontSize="large" />
        </IconButton>
      </Swiper>
    </Box>
  );
};

export default SwiperListProduct;
