import { Box, Button, InputLabel, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useReadMe } from '../../api/hook/useAuth'

const ProfilePage = () => {
  const [isDetail, setIsDetail] = useState(true)
  const {data: profile, isLoading, error} = useReadMe()
  console.log(profile)
  if (isLoading) return <p>Loading books...</p>;
  if (error) return <p>Error loading books</p>;
  const handletoggleEditorDetail = () =>{
    if(isDetail == true)
    {
      setIsDetail(false)
    }
    else{
      setIsDetail(true)
    }
    
  }


  return (
    <Box>
      <Typography>Thông tin cá nhân</Typography>
      <Box padding={3} sx={{mt: 3}} border="1px solid #e5e7eb" borderRadius={2} bgcolor="white">
              <InputLabel sx={{mb: 1}} >Tên</InputLabel>
              <TextField disabled = {isDetail} value={profile.user.full_name}  fullWidth size="small" sx={{ mb: 2 }} />
               <InputLabel  sx={{mb: 1}} >Email</InputLabel>
              <TextField disabled fullWidth  value={profile.user.email} size="small" sx={{ mb: 2 }} />
               <InputLabel sx={{mb: 1}} >Số điện thoại</InputLabel>
              <TextField disabled= {isDetail}  fullWidth  value={profile.user.phone_number} size="small" sx={{ mb: 2 }} />
              
      </Box>
      <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
            {!isDetail && <Button variant="outlined" color="inherit"> Hủy </Button>}
            <Button onClick={handletoggleEditorDetail} variant="contained" sx={{ bgcolor: "orange" }}>
             {isDetail ? 'Sửa thông tin' : 'Lưu thông tin' }
            </Button>
      </Stack>
    </Box>
  )
}

export default ProfilePage
