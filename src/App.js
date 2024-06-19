import React, { useEffect } from 'react';
import './index.css';
import Main from './components/main/Main';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductContainer from './components/product/ProductContainer';
import Header from './components/modules/Header';
import ProductList from './components/product/ProductList';
import ProductDetails from './components/product/ProductDetails';
import MyPageIndex from './components/mypage/MyPageIndex';

const App = () => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('header');
      if (window.scrollY > 10) {
        header.classList.remove('deactive');
        header.classList.add('active');
      } else {
        header.classList.remove('active');
        header.classList.add('deactive');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/goods/*" element={<ProductContainer />} />
        <Route path='/goods/:category' element={<ProductList />}></Route>
        <Route path="/goods/:category/:id" element={<ProductDetails />} />
        <Route path="/reserve/*" element={<div>Reserve Page</div>} />
        {/* <Route path="/login/*" element={<Login />} /> */}
        <Route path="/mypage/*" element={<MyPageIndex />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
