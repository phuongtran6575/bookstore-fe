import { Box,  TextField, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useRoleCrud } from '../../../api/hook/useUser';
const RoleDetailPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const { useGetRoleById } = useRoleCrud();
  if (!id) return <p>No product selected</p>;
  const { data: role, isLoading, error } = useGetRoleById(id);

  if (!id) return <p>No user selected</p>;
  if (isLoading) return <p>Loading user...</p>;
  if (error) return <p>Failed to load user</p>;

  return (
    <Box p={3}>
      {/* Quay lại */}
      <Typography color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
       <Link to="/admin/roles">← Quay lại danh sách sản phẩm</Link>
      </Typography>
      {/* Tiêu đề */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thông tin sản phẩm
      </Typography>

      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
          <Typography fontWeight="bold" mb={2}>Thông tin cơ bản</Typography>
          <TextField disabled defaultValue={role?.name} fullWidth label="Tên sách" size="small" sx={{ mb: 2 }} />
      </Box>

      
    </Box>
  )
}

export default RoleDetailPage
