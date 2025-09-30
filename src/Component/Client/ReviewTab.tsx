import {
  Box,
  Typography,
  Rating,
  Button,
  LinearProgress,
  Avatar,
  Divider,
} from "@mui/material";

const reviews = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    date: "2023-10-15",
    rating: 5,
    comment: "Sách rất hay và ý nghĩa. Giao hàng nhanh. Rất đáng tiền!",
  },
  {
    id: 2,
    name: "Trần Văn B",
    date: "2023-11-02",
    rating: 4,
    comment: "Nội dung ổn, nhưng đóng gói chưa kỹ lắm.",
  },
];

const ratingSummary: {
  average: number;
  total: number;
  counts: Record<number, number>;
} = {
  average: 4.0,
  total: 3,
  counts: { 5: 2, 4: 1, 3: 0, 2: 0, 1: 0 },
};

const ReviewTab = () => {
  return (
    <Box mt={4}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h6" fontWeight="bold">
          Đánh giá từ khách hàng
        </Typography>
        <Button variant="contained" color="warning">
          Viết đánh giá
        </Button>
      </Box>

      {/* Tổng quan */}
      <Box display="flex" gap={4} alignItems="center" mb={4}>
        {/* Trung bình */}
        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold">
            {ratingSummary.average.toFixed(1)}/5
          </Typography>
          <Rating value={ratingSummary.average} precision={0.5} readOnly />
          <Typography variant="body2" color="text.secondary">
            ({ratingSummary.total} đánh giá)
          </Typography>
        </Box>

        {/* Progress bar */}
        <Box flex={1}>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratingSummary.counts[star];
            const percent =
              ratingSummary.total > 0 ? (count / ratingSummary.total) * 100 : 0;

            return (
              <Box key={star} display="flex" alignItems="center" mb={0.5}>
                <Typography variant="body2" sx={{ width: 40 }}>
                  {star} sao
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={percent}
                  sx={{ flex: 1, mx: 1, height: 8, borderRadius: 5 }}
                  color="warning"
                />
                <Typography variant="body2">{count}</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Danh sách review */}
      {reviews.map((r) => (
        <Box key={r.id} mb={3}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar>{r.name[0]}</Avatar>
            <Box>
              <Typography fontWeight="bold">{r.name}</Typography>
              <Rating value={r.rating} readOnly size="small" />
              <Typography variant="caption" color="text.secondary">
                {r.date}
              </Typography>
            </Box>
          </Box>
          <Typography mt={1}>{r.comment}</Typography>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default ReviewTab;
