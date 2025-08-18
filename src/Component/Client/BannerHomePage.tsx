import { Box, Typography, Button, Container } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import VerifiedIcon from "@mui/icons-material/Verified";

const BannerHomePage = () => {
  return (
    <Box sx={{ bgcolor: "#fefbea", }}>
      <Container maxWidth="lg">
        {/* Banner trên */}
        <Box sx={{display: "flex",flexDirection: { xs: "column", md: "row" },alignItems: "center",py: 8,}}>
          {/* Text bên trái */}
          <Box flex={1} pr={{ md: 6 }}>
            <Typography variant="h3" fontWeight="bold" color="#8B4513" gutterBottom>
              Sale Lớn Mừng Tựu Trường
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Giảm đến <b>50%</b> cho hàng ngàn đầu sách
            </Typography>
            <Typography variant="body1" color="text.secondary" >
              Khám phá thế giới tri thức với những ưu đãi hấp dẫn nhất trong năm.
              Sẵn sàng cho một năm học mới đầy hứng khởi!
            </Typography>
            <Button variant="contained"
              sx={{
                mt: 2,
                bgcolor: "#d2691e",
                "&:hover": { bgcolor: "#a0522d" },
                px: 3,
                py: 1,
                borderRadius: "8px",}}>
              Khám Phá Ngay
            </Button>
          </Box>

          {/* Ảnh bên phải */}
          <Box flex={1} mt={{ xs: 4, md: 0 }}>
            <Box
              component="img"
              src="https://picsum.photos/600/400" // thay link ảnh thật
              alt="banner"
              sx={{
                width: "100%",
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Box>
        </Box>
      </Container>

      {/* Chính sách bên dưới */}
      <Box sx={{ bgcolor: "white", py: 4 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              gap: 4,
            }}
          >
            {/* Item 1 */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LocalShippingIcon sx={{ fontSize: 40, color: "#d2691e", mr: 2 }} />
              <Box>
                <Typography fontWeight="bold">Miễn phí vận chuyển</Typography>
                <Typography variant="body2" color="text.secondary">
                  Cho đơn hàng từ 250.000đ
                </Typography>
              </Box>
            </Box>

            {/* Item 2 */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AutorenewIcon sx={{ fontSize: 40, color: "#d2691e", mr: 2 }} />
              <Box>
                <Typography fontWeight="bold">Đổi trả 30 ngày</Typography>
                <Typography variant="body2" color="text.secondary">
                  Nếu bạn không hài lòng
                </Typography>
              </Box>
            </Box>

            {/* Item 3 */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <VerifiedIcon sx={{ fontSize: 40, color: "#d2691e", mr: 2 }} />
              <Box>
                <Typography fontWeight="bold">Cam kết sách thật</Typography>
                <Typography variant="body2" color="text.secondary">
                  100% sách chính hãng
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default BannerHomePage;
