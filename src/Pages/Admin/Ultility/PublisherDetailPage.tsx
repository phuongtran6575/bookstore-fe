import { Box, Typography, TextField } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { usePublisherCrud } from "../../../api/hook/useUltility";

const PublisherDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { useGetPublisherById } = usePublisherCrud();

  if (!id) return <p>No publisher selected</p>;
  
  const { data: publisher, isLoading, error } = useGetPublisherById(id);

  if (isLoading) return <p>Loading publisher...</p>;
  if (error) return <p>Failed to load publisher</p>;

  return (
    <Box p={3}>
      {/* Quay lại */}
      <Typography color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
        <Link to="/admin/publishers">← Quay lại danh sách nhà xuất bản</Link>
      </Typography>
      {/* Tiêu đề */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thông tin nhà xuất bản
      </Typography>

      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <Typography fontWeight="bold" mb={2}>Thông tin cơ bản</Typography>
        <TextField disabled defaultValue={publisher?.name} fullWidth label="Tên nhà xuất bản" size="small" sx={{ mb: 2 }} />
        <TextField disabled defaultValue={publisher?.address} fullWidth label="Địa chỉ" size="small" sx={{ mb: 2 }} />
      </Box>
    </Box>
  );
};

export default PublisherDetailPage;