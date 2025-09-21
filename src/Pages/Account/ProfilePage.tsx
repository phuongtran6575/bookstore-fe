import { Box, InputLabel, TextField, Typography } from '@mui/material'
import React from 'react'
import { useReadMe } from '../../api/hook/useAuth'

const ProfilePage = () => {
  const {data: profile, isLoading, error} = useReadMe()
  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p>Error loading books</p>;



  return (
    <Box>
      <Typography>Thông tin cá nhân</Typography>
      <Box padding={3} sx={{mt: 3}} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
              <InputLabel sx={{mb: 1}} >Tên</InputLabel>
              <TextField disabled value={profile.user.full_name}  fullWidth size="small" sx={{ mb: 2 }} />
               <InputLabel  sx={{mb: 1}} >Email</InputLabel>
              <TextField disabled  fullWidth  value={profile.user.email} size="small" sx={{ mb: 2 }} />
               <InputLabel sx={{mb: 1}} >Số điện thoại</InputLabel>
              <TextField disabled  fullWidth  value={profile.user.phone_number} size="small" sx={{ mb: 2 }} />
            </Box>
    </Box>
  )
}

export default ProfilePage
