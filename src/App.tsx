
import './App.css'
import { Box } from '@mui/material'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import  AdminLayout from './Layout/Admin/AdminLayout'
import ProductListPage from './Pages/Admin/ProductListPage'
import ProductEditPage from './Pages/Admin/ProductEditPage'
import CategoryListPage from './Pages/Admin/CategoryListPage'
import OrderListPage  from './Pages/Admin/OrderListPage'
import CustomerListPage  from './Pages/Admin/CustomerListPage'
import  SettingPage  from './Pages/Admin/SettingPage'
import DashboardPage from './Pages/Admin/DashboardPage'



function App() {

  return (
    <BrowserRouter>
      <Box>
        <Routes>
          
         <Route path='/admin' element = {<AdminLayout/>}>
            <Route index element={<DashboardPage/>}></Route>
            <Route path='dashboard' element={<DashboardPage/>}></Route>
            <Route path='products' element={<ProductListPage/>}></Route>
            <Route path='productEdit' element={<ProductEditPage/>}></Route>
            <Route path='categories' element={<CategoryListPage/>}></Route>
            <Route path='orders' element={<OrderListPage/>}></Route>
            <Route path='customers' element={<CustomerListPage/>}></Route>
            <Route path='setting' element={<SettingPage/>}></Route>
          </Route>
        </Routes>      
      </Box>
    </BrowserRouter>
  )
}

export default App
