import { Box, Typography, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import BookCard from "./BookCard";


type SwiperListProductProps = {
  products: any[];
  author?: string;
  oldPrice?: string;
  discount?: string;
  rating?: number;
  reviews?: number;
  badge?: string;
};

const SwiperListProduct = ({ products, author, oldPrice, discount, rating, reviews, badge }: SwiperListProductProps) => {


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
          1024: { slidesPerView: 5 },
        }}
        style={{ padding: "20px 0" }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <BookCard product={product} />
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
