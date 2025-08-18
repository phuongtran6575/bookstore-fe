import { Box } from '@mui/material'
import React from 'react'
import AccountSidebar from '../../Component/Client/AccountSidebar';
import { Outlet } from 'react-router-dom';

const AccountLayout = () => {
  return (
    <Box sx={{display:"flex", gap:4, mt: 3}}>
        <AccountSidebar/>
        <Box>
            <Outlet/>
        </Box>
    </Box>

  )
}

export default AccountLayout
