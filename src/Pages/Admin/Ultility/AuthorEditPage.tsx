import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuthorCrud } from "../../../api/hook/useUltility";

const AuthorEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { useGetAuthorById, useUpdateAuthor } = useAuthorCrud();
  const { data: author, isLoading, error } = useGetAuthorById(id || "");
  const updateAuthor = useUpdateAuthor();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    bio:""
  });

  useEffect(() => {
    if (author) {
      setFormData({
        name: author.name || "",   
        bio: author.bio || ""     
      });
    }
  }, [author]);

  if (!id) return <p>No author selected</p>;
  if (isLoading) return <p>Loading author...</p>;
  if (error) return <p>Failed to load author</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateAuthor.mutate(
      { id, data: formData },
      { onSuccess: () => navigate(`/admin/authors`) }
    );
  };

  return (
    <Box p={3}>
      <Typography color="warning.main" sx={{ mb: 2 }}>
        <Link to={`/admin/authors`}>← Quay lại danh sách author</Link>
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Chỉnh sửa author
      </Typography>

      <Box padding={3} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <TextField name="name" value={formData.name} onChange={handleChange} fullWidth label="Name" sx={{ mb: 2 }} />
        <TextField name="name" value={formData.bio} onChange={handleChange} fullWidth label="Name" sx={{ mb: 2 }} />

        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" onClick={handleSave}>Lưu</Button>
          <Button variant="outlined" onClick={() => navigate(`/admin/authors`)}>Hủy</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthorEditPage;
