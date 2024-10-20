import React, { useEffect } from 'react';
import './index.css';
import Main from './components/main/Main';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import ProductContainer from './components/product/ProductContainer';
import Header from './components/modules/Header';
import ProductList from './components/product/ProductList';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/login/Login';
import Membership from './components/login/Membership';
import FindPw from './components/login/FindPw';
import FindId from './components/login/FindId';
import Footer from './components/modules/Footer';
import Reservation from './components/Reserve/Reservation';
import ProductBuy from './components/buy/ProductBuy';
import ScrollToTop from './components/modules/ScrollToTop';
import Introduction from './components/Introduction/Introduction';
import Buy from './components/mypage/MyPageBuy'
import Admin from './components/administrator/Admin';
import Dashboard from './components/administrator/Dashboard';
import UserManagement from './components/administrator/UserManager';
import ProductManagement from './components/administrator/ProductManagement';
import ProductInserts from './components/administrator/ProductsInsert';
import OrderManagement from './components/administrator/OrderManagement';
import RegistManagement from './components/administrator/RegistManagement'
import MyPageMain from './components/mypage/MyPageMain';
import VerifyCode from './components/login/VerifyCode';
import ResetPassword from './components/login/ResetPassword';
import ProductImageSave from './components/administrator/ProductImageSave';
import MultipleBuy from './components/mypage/MultipleBuy';

import ProductRelatedStorage from './components/administrator/ProductRelatedStorage';
import ProductsInsert from './components/administrator/ProductsInsert.jsx';
import Userinfo from './components/administrator/Userinfo.jsx';
import UserSendMail from './components/administrator/UserSendMail.jsx';

const App = () => {

  const noHeaderPaths = ['/login', '/login/membership', '/login/findid', '/login/findpw'];
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/*" element={<Main />} /> */}
        <Route path="/goods/*" element={<ProductContainer />} />
        <Route path='/goods/:category' element={<ProductList />}></Route>
        <Route path="/goods/:category/:id/*" element={<ProductDetails />} />
        <Route path="/orderpage" element={<ProductBuy />} />
        <Route path="/reserve/*" element={<Reservation />} />
        <Route path="/login/*" element={<Login />} />
        <Route path='/login/membership' element={<Membership />} />
        {/* <Route path="/address-search" element={<AddressSearch />} /> */}
        <Route path='/login/findId' element={<FindId />} />
        <Route path='/login/findPw' element={<FindPw />} />
        <Route path='/login/findPw/verifyCode' element={<VerifyCode />} />
        <Route path='/login/findPw/verifyCode/resetPassword' element={<ResetPassword />} />
        <Route path="/mypage/*" element={<MyPageMain />} />
        <Route path='/buym' element={<MultipleBuy />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/buy" element={<Buy />} />
        {/* <div id="map" className="map"/> */}

        {/* 관리자 페이지 라우팅 S */}
        <Route path="/administrator/*" element={<Admin />} >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="users/userinfo" element={<Userinfo />} />
          <Route path="users/userinfo/userSendMail" element={<UserSendMail />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/insert" element={<ProductInserts />} />
          <Route path='products/allinsert' element={<ProductRelatedStorage />} />
          <Route path="products/image" element={<ProductImageSave />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="reserve" element={<RegistManagement />} />
        </Route>
        {/** 관리자 페이지 라우팅 E */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
