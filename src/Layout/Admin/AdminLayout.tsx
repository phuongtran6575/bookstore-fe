import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import AdminSidebar from "../../Component/Admin/AdminSidebar";
import { useSidebarStore } from "../../core/store/sidebarStore";
import AdminHeader from "../../Component/Admin/AdminHeader";


const AdminLayout = () => {
  const open = useSidebarStore((state) => state.open); // 👈 lấy biến open từ store

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Nội dung chính */}
      <Box sx={{ flexGrow: 1, width: open ? `calc(100% - 240px)` : `calc(100% - 56px)`, }}>
        <AdminHeader />
        <Toolbar /> {/* spacer cho AppBar fixed */}
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};


export default AdminLayout;
