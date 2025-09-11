
import './App.css'
import { Box } from '@mui/material'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import  AdminLayout from './Layout/Admin/AdminLayout'
import ProductListPage from './Pages/Admin/Product/ProductListPage'
import ProductEditPage from './Pages/Admin/Product/ProductAddPage'
import CategoryListPage from './Pages/Admin/Category/CategoryListPage'
import OrderListPage  from './Pages/Admin/Order/OrderListPage'
import CustomerListPage  from './Pages/Admin/Customer/CustomerListPage'
import  SettingPage  from './Pages/Admin/SettingPage'
import DashboardPage from './Pages/Admin/DashboardPage'
import ClientLayout from './Layout/Client/ClientLayout'
import HomePage from './Pages/Client/HomePage'
import CategoryPage from './Pages/Client/CategoryPage'
import AuthLayout from './Layout/Client/AuthLayout'
import LoginPage from './Pages/Auth/LoginPage'
import RegisterPage from './Pages/Auth/RegisterPage'
import AccountLayout from './Layout/Client/AccountLayout'
import AccountDashboardPage from './Pages/Account/AccountDashboardPage'
import ProfilePage from './Pages/Account/ProfilePage'
import AddressBookPage from './Pages/Account/AddressBookPage'
import OrderDetailPage from './Pages/Account/OrderDetailPage'
import OrderHistoryPage from './Pages/Account/OrderHistoryPage'
import ProductDetailandEditPage from './Pages/Admin/Product/ProductDetaiandEditlPage'



function App() {

  return (
    <BrowserRouter>
      <Box>
        <Routes>
         <Route path='/' element={<ClientLayout/>}>
            <Route index element={<HomePage/>}></Route>
            <Route path='home' element={<HomePage/>}></Route>
            <Route path='category' element={<CategoryPage/>}></Route>
            <Route path='auth' element={<AuthLayout/>}>
              <Route index element={<LoginPage/>}></Route>
              <Route path='login' element={<LoginPage/>}></Route>
              <Route path='register' element={<RegisterPage/>}></Route>
            </Route>
            <Route path='account' element={<AccountLayout/>}>
              <Route index element={<AccountDashboardPage/>}></Route>
              <Route path='accountdashboard' element={<AccountDashboardPage/>}></Route>
              <Route path='profile' element={<ProfilePage/>}></Route>
              <Route path='addressbook' element={<AddressBookPage/>}></Route>
              <Route path='orderdetail' element={<OrderDetailPage/>}></Route>
              <Route path='orderhistory' element={<OrderHistoryPage/>}></Route>
            </Route>
         </Route>
         <Route path='/admin' element = {<AdminLayout/>}>
            <Route index element={<DashboardPage/>}></Route>
            <Route path='dashboard' element={<DashboardPage/>}></Route>
            <Route path='products' element={<ProductListPage/>}></Route>
            <Route path='productAdd' element={<ProductEditPage/>}></Route>
            <Route path='productDetailandEdit/:id' element={<ProductDetailandEditPage/>}></Route>
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
