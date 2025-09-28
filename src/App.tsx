
import './App.css'

import { Box } from '@mui/material'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import  AdminLayout from './Layout/Admin/AdminLayout'
import ProductListPage from './Pages/Admin/Product/ProductListPage'
import CategoryListPage from './Pages/Admin/Ultility/CategoryListPage'
import OrderListPage  from './Pages/Admin/Order/OrderListPage'
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
import UserListPage from './Pages/Admin/Authorization/UserListPage'
import RoleListPage from './Pages/Admin/Authorization/RoleListPage'
import ProductAddPage from './Pages/Admin/Product/ProductAddPage'
import UserAddPage from './Pages/Admin/Authorization/UserAddPage'
import RoleAddPage from './Pages/Admin/Authorization/RoleAddPage'
import UserDetailPage from './Pages/Admin/Authorization/UserDetailPage'
import RoleDetailPage from './Pages/Admin/Authorization/RoleDetailPage'
import UserEditPage from './Pages/Admin/Authorization/UserEditPage'
import RoleEditPage from './Pages/Admin/Authorization/RoleEditPage'
import ProductDetailPage from './Pages/Admin/Product/ProductDetailPage'
import ProductEditPage from './Pages/Admin/Product/ProductEditPage'
import AuthorListPage from './Pages/Admin/Ultility/AuthorListPage'
import PublisherListPage from './Pages/Admin/Ultility/PublisherListPage'
import TagListPage from './Pages/Admin/Ultility/TagListPage'
import ProtectedRoute from './Component/Client/ProtectedRoute'
import CategoryDetailPage from './Pages/Admin/Ultility/CategoryDetailPage'
import AuthorDetailPage from './Pages/Admin/Ultility/AuthorDetailPage'
import PublisherDetailPage from './Pages/Admin/Ultility/PublisherDetailPage'
import TagDetailPage from './Pages/Admin/Ultility/TagDetailPage'
import CategoryAddPage from './Pages/Admin/Ultility/CategoryAddPage'
import AuthorAddPage from './Pages/Admin/Ultility/AuthorAddPage'
import PublisherAddPage from './Pages/Admin/Ultility/PublisherAddPage'
import TagAddPage from './Pages/Admin/Ultility/TagAddPage'



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
            <Route element={<ProtectedRoute />}>
              <Route path='account' element={<AccountLayout/>}>
              <Route index element={<AccountDashboardPage/>}></Route>
              <Route path='accountdashboard' element={<AccountDashboardPage/>}></Route>
              <Route path='profile' element={<ProfilePage/>}></Route>
              <Route path='addressbook' element={<AddressBookPage/>}></Route>
              <Route path='orderdetail' element={<OrderDetailPage/>}></Route>
              <Route path='orderhistory' element={<OrderHistoryPage/>}></Route>
            </Route>
            </Route>
            
         </Route>
         <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
         <Route path='/admin' element = {<AdminLayout/>}>
            <Route index element={<DashboardPage/>}></Route>
            <Route path='dashboard' element={<DashboardPage/>}></Route>
            
            <Route path='books' element={<ProductListPage/>}></Route>
            <Route path='productAdd' element={<ProductAddPage/>}></Route>
            <Route path='productDetail/:id' element={<ProductDetailPage/>}></Route>
            <Route path='productEdit/:id' element={<ProductEditPage/>}></Route>
            
            <Route path='categories' element={<CategoryListPage/>}></Route>
            <Route path='categoryAdd' element={<CategoryAddPage/>}></Route>
            <Route path='categoryDetail/:id' element={<CategoryDetailPage/>}></Route>

            <Route path='authors' element={<AuthorListPage/>}></Route>
            <Route path='authorAdd' element={<AuthorAddPage/>}></Route>
            <Route path='authorDetail/:id' element={<AuthorDetailPage/>}></Route>

            <Route path='publishers' element={<PublisherListPage/>}></Route>
            <Route path='publisherAdd' element={<PublisherAddPage/>}></Route>
            <Route path='publisherDetail/:id' element={<PublisherDetailPage/>}></Route>

            <Route path='tags' element={<TagListPage/>}></Route>
            <Route path='tagAdd' element={<TagAddPage/>}></Route>
            <Route path='tagDetail/:id' element={<TagDetailPage/>}></Route>
            
            <Route path='orders' element={<OrderListPage/>}></Route>
            
            <Route path='users' element={<UserListPage/>}></Route>
            <Route path='userDetail/:id' element={<UserDetailPage/>}></Route>
            <Route path='userAdd' element={<UserAddPage/>}></Route>
            <Route path='userEdit/:id' element={<UserEditPage/>}></Route>
            
            <Route path='roles' element={<RoleListPage/>}></Route>
            <Route path='roleDetail/:id' element={<RoleDetailPage/>}></Route>
            <Route path='roleEdit/:id' element={<RoleEditPage/>}></Route>
            <Route path='roleAdd' element={<RoleAddPage/>}></Route>            
            
            <Route path='setting' element={<SettingPage/>}></Route>
          </Route>
         </Route>
         
        </Routes>      
      </Box>
    </BrowserRouter>
  )
}

export default App
