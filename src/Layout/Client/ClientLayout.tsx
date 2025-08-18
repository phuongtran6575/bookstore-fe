import { Box, Toolbar } from "@mui/material"
import Header from "../../Component/Client/Header"
import { Outlet } from "react-router-dom"
import Footer from "../../Component/Client/Footer"

const ClientLayout = () => {
    return (
      <Box sx={{ display: "flex",flexDirection:"column", minHeight: "100vh", backgroundColor:"#f1f5f9" }}>  
          <Header />
          <Box sx={{ }}>
            <Outlet />   
          </Box>
          <Footer/>
      </Box>
    )
  }
  
  export default ClientLayout