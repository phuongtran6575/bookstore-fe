import { Box } from '@mui/material'
import React from 'react'
import AccountSidebar from '../../Component/Client/AccountSidebar';
import { Outlet } from 'react-router-dom';

const AccountLayout = () => {
  return (
    <Box sx={{display:"flex", justifyContent:"center", gap:4, mt: 3}}>
        <AccountSidebar/>
        <Box sx={{width:"60%",backgroundColor:"white", borderRadius: 2, boxShadow: 1, p: 2, }}>
            <Outlet/>
        </Box>
    </Box>

  )
}

export default AccountLayout
