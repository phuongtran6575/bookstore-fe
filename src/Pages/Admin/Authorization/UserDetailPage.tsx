import { Box,  TextField, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useUserCrud } from '../../../api/hook/useUser';
const UserDetailPage = () => {
  const { id } = useParams<{ id: string }>(); 
  const { useGetUserById } = useUserCrud();
  if (!id) return <p>No product selected</p>;
  const { data: user, isLoading, error } = useGetUserById(id);

  if (!id) return <p>No user selected</p>;
  if (isLoading) return <p>Loading user...</p>;
  if (error) return <p>Failed to load user</p>;

  return (
    <Box p={3}>
      {/* Quay lại */}
      <Typography color="warning.main" sx={{ cursor: "pointer", mb: 2 }}>
       <Link to="/admin/users">← Quay lại danh sách sản phẩm</Link>
      </Typography>
      {/* Tiêu đề */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Thông tin sản phẩm
      </Typography>

      <Box padding={3} margin={7} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
          <Typography fontWeight="bold" mb={2}>Thông tin cơ bản</Typography>
          <TextField disabled defaultValue={user?.full_name} fullWidth label="Name" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={user?.email} fullWidth label="Email" sx={{ mb: 2 }} size="small" />
          <TextField disabled defaultValue={user?.phone_number} fullWidth label="Phone" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={user?.created_at} fullWidth label="Created At" size="small" sx={{ mb: 2 }} />
          <TextField disabled defaultValue={user?.updated_at} fullWidth label="Updated Ad" size="small" sx={{ mb: 2 }} />
          
          
      </Box>

      
    </Box>
  )
}

export default UserDetailPage
