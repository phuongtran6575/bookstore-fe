import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useRoleCrud } from "../../../api/hook/useUser";

const RoleEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { useGetRoleById, useUpdateRole } = useRoleCrud();
  const { data: role, isLoading, error } = useGetRoleById(id || "");
  const updateRole = useUpdateRole();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: ""
  });

  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name || "",        
      });
    }
  }, [role]);

  if (!id) return <p>No user selected</p>;
  if (isLoading) return <p>Loading user...</p>;
  if (error) return <p>Failed to load user</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateRole.mutate(
      { id, data: formData },
      { onSuccess: () => navigate(`/admin/roles`) }
    );
  };

  return (
    <Box p={3}>
      <Typography color="warning.main" sx={{ mb: 2 }}>
        <Link to={`/admin/roles`}>← Quay lại danh sách role</Link>
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={3}>
        Chỉnh sửa user
      </Typography>

      <Box padding={3} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <TextField name="name" value={formData.name} onChange={handleChange} fullWidth label="Name" sx={{ mb: 2 }} />
        

        <Box mt={2} display="flex" gap={2}>
          <Button variant="contained" onClick={handleSave}>Lưu</Button>
          <Button variant="outlined" onClick={() => navigate(`/admin/users`)}>Hủy</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RoleEditPage;
