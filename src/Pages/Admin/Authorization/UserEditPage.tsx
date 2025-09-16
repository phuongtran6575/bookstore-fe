import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useUserCrud } from "../../../api/hook/useUser";

const UserEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { useGetUserById, useUpdateUser } = useUserCrud();
  const { data: user, isLoading, error } = useGetUserById(id || "");
  const updateUser = useUpdateUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
      });
    }
  }, [user]);

  if (!id) return <p>No user selected</p>;
  if (isLoading) return <p>Loading user...</p>;
  if (error) return <p>Failed to load user</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateUser.mutate(
      { id, data: formData },
      { onSuccess: () => navigate(`/admin/users`) }
    );
  };

  return (
    <Box p={3}>
      <Typography color="warning.main" sx={{ mb: 2 }}>
        <Link to={`/admin/users`}>← Quay lại danh sách user</Link>
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Chỉnh sửa user
      </Typography>

      <Box padding={3} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <TextField name="full_name" value={formData.full_name} onChange={handleChange} fullWidth label="Name" sx={{ mb: 2 }} />
        <TextField name="email" value={formData.email} onChange={handleChange} fullWidth label="Email" sx={{ mb: 2 }} />
        <TextField name="phone_number" value={formData.phone_number} onChange={handleChange} fullWidth label="Phone" sx={{ mb: 2 }} />

        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" onClick={handleSave}>Lưu</Button>
          <Button variant="outlined" onClick={() => navigate(`/admin/users`)}>Hủy</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserEditPage;
