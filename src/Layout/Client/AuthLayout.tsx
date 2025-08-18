import { Box, Tab, Tabs, Typography } from "@mui/material"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

const AuthLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const current = location.pathname === "/auth/register" ? "/auth/register": "/auth/login";
    return (
        <Box sx={{ width: 380, mx: "auto", mt: 4, p: 4, bgcolor: "white", borderRadius: 3, boxShadow: 3,textAlign: "center",}}>
        <Typography variant="h5" fontWeight="bold" color="primary" mb={2}>Bookish</Typography>
        <Tabs centered textColor="primary" indicatorColor="primary"
              value={current}
              onChange={(_, val) => navigate(val)} 
              sx={{
                "& .MuiTab-root.Mui-selected": {
                  color: "warning.main",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "warning.main",
                  transition: "all 0.3s ease", // 👈 đảm bảo có animation
                },
              }}>
          <Tab label="Đăng nhập" value="/auth/login" />
          <Tab label="Đăng ký" value="/auth/register" />
        </Tabs>
        <Outlet />
      </Box>
    )
  }
  
  export default AuthLayout