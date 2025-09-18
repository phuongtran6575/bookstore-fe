import { Box, Typography, TextField, Chip } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useUserCrud, useUserRoleRelationship } from "../../../api/hook/useUser";

const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { useGetUserById } = useUserCrud();
  const { useGetRolesByUserId } = useUserRoleRelationship();

  if (!id) return <p>No user selected</p>;

  // Lấy user
  const { data: user, isLoading, error } = useGetUserById(id);
  // Lấy roles của user
  const { data: roles, isLoading: isLoadingRoles, error: errorRoles } = useGetRolesByUserId(id);

  if (isLoading || isLoadingRoles) return <p>Loading...</p>;
  if (error) return <p>Failed to load user</p>;
  if (errorRoles) return <p>Failed to load roles</p>;
  console.log("roles:", roles)

  return (
    <Box p={3}>
      {/* Quay lại */}
      <Typography color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
        <Link to="/admin/users">← Quay lại danh sách user</Link>
      </Typography>

      {/* Tiêu đề */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thông tin user
      </Typography>

      {/* Thông tin cơ bản */}
      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <Typography fontWeight="bold" mb={2}>
          Thông tin cơ bản
        </Typography>

        <TextField disabled value={user?.full_name || ""} fullWidth label="Name" size="small" sx={{ mb: 2 }} />
        <TextField disabled value={user?.email || ""} fullWidth label="Email" size="small" sx={{ mb: 2 }} />
        <TextField disabled value={user?.phone_number || ""} fullWidth label="Phone" size="small" sx={{ mb: 2 }} />
        <TextField disabled value={user?.created_at || ""} fullWidth label="Created At" size="small" sx={{ mb: 2 }} />
        <TextField disabled value={user?.updated_at || ""} fullWidth label="Updated At" size="small" sx={{ mb: 2 }} />
      </Box>

      {/* Roles */}
      <Box padding={3} margin={3} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
        <Typography fontWeight="bold" mb={2}>
          Roles
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {roles && roles.length > 0 ? (
            roles.map((role) => (
              <Chip
                key={role.id}
                label={role.name}   // 👈 hiển thị tên role
                color="primary"
                variant="outlined"
              />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              Chưa có role nào
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserDetailPage;
