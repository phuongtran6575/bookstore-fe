import { Box, Toolbar } from '@mui/material'
import React from 'react'
import AdminHeader from '../../Component/Admin/AdminHeader'
import AdminSidebar from '../../Component/Admin/AdminSidebar'
import { Outlet } from 'react-router-dom'   

const AdminLayout = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor:"#f1f5f9" }}>
      <AdminSidebar />
      <Box sx={{ flexGrow: 1 }}>
        <AdminHeader />
        <Toolbar /> {/* chừa chỗ cho header */}
        <Box sx={{ p: 3 }}>
          <Outlet />   {/* render các route con */}
        </Box>
      </Box>
    </Box>
  )
}

export default AdminLayout
