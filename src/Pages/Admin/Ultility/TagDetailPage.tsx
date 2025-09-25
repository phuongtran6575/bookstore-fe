import { Box, Typography, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useTagCrud } from "../../../api/hook/useUltility";

const TagDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { useGetTagById } = useTagCrud();

  if (!id) return <p>No tag selected</p>;
  
  const { data: tag, isLoading, error } = useGetTagById(id);

  if (isLoading) return <p>Loading tag...</p>;
  if (error) return <p>Failed to load tag</p>;

  return (
    <Box p={3}>
      {/* Quay lại */}
      <Typography color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
        <Link to="/admin/tags">← Quay lại danh sách thẻ</Link>
      </Typography>
      {/* Tiêu đề */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thông tin thẻ
      </Typography>

      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <Typography fontWeight="bold" mb={2}>Thông tin cơ bản</Typography>
        <TextField disabled defaultValue={tag?.name} fullWidth label="Tên thẻ" size="small" sx={{ mb: 2 }} />
      </Box>
    </Box>
  );
};

export default TagDetailPage;