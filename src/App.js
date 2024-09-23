import React, { useEffect } from 'react';
import './index.css';
import Main from './components/main/Main';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import ProductContainer from './components/product/ProductContainer';
import Header from './components/modules/Header';
import ProductList from './components/product/ProductList';
import ProductDetails from './components/product/ProductDetails';
import MyPageIndex from './components/mypage/MyPageIndex';
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
import OrderManagement from './components/administrator/OrderManagement';


const App = () => {
  // const new_script = src => {
  //   return new Promise((resolve, reject) => {
  //     const script = document.createElement('script');
  //     script.src = src;
  //     script.addEventListener('load', () => {
  //       resolve();
  //     });
  //     script.addEventListener('error', e => {
  //       reject(e);
  //     });
  //     document.head.appendChild(script);
  //   });
  // };
  // useEffect(() => {
  //   //카카오맵 스크립트 읽어오기
  //   const my_script = new_script('https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f3c62bc9c090cf7aac46c7809de95793');

  //   //스크립트 읽기 완료 후 카카오맵 설정
  //   my_script.then(() => {
  //     console.log('script loaded!!!');
  //     const kakao = window['kakao'];
  //     kakao.maps.load(() => {
  //       const mapContainer = document.getElementById('map');
  //       const options = {
  //         center: new kakao.maps.LatLng(37.56000302825312, 126.97540593203321), //좌표설정
  //         level: 3
  //       };
  //       const map = new kakao.maps.Map(mapContainer, options); //맵생성
  //       //마커설정
  //       const markerPosition = new kakao.maps.LatLng(37.56000302825312, 126.97540593203321);
  //       const marker = new kakao.maps.Marker({
  //         position: markerPosition
  //       });
  //       marker.setMap(map);
  //     });
  //   });
  // }, []);


  const noHeaderPaths = ['/login', '/login/membership', '/login/findid', '/login/findpw'];
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/*" element={<Main />} />
        <Route path="/goods/*" element={<ProductContainer />} />
        <Route path='/goods/:category' element={<ProductList />}></Route>
        <Route path="/goods/:category/:id/*" element={<ProductDetails />} />
        <Route path="/goods/:category/:id/:buy" element={<ProductBuy />} />
        <Route path="/reserve/*" element={<Reservation />} />
        <Route path="/Login/*" element={<Login />} />
        <Route path='/Login/Membership' element={<Membership />} />
        {/* <Route path="/address-search" element={<AddressSearch />} /> */}
        <Route path='/Login/FindId' element={<FindId />} />
        <Route path='/Login/FindPw' element={<FindPw />} />
        <Route path="/mypage/*" element={<MyPageIndex />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/buy" element={<Buy />} />
        {/* <div id="map" className="map"/> */}

        {/* 관리자 페이지 라우팅 S */}
        <Route path="/administrator/*" element={<Admin />} >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>
        {/** 관리자 페이지 라우팅 E */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
