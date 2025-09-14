import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminHeader from "../../Component/Admin/AdminHeader";
import AdminSidebar from "../../Component/Admin/AdminSidebar";


const AdminLayout = () => {
  const [open, setOpen] = useState(true); // true = full sidebar, false = mini

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
      <AdminSidebar open={open} />
      <Box sx={{ flexGrow: 1 }}>
        <AdminHeader open={open} onToggle={() => setOpen(!open)} />
        <Toolbar /> {/* spacer cho header fixed */}
        <Box sx={{ p: 3 }}>
          <Outlet /> {/* render route con */}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
