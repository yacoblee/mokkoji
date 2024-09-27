import '../../css/mypage/MyPageMain.css';

import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { API_BASE_URL } from "../../service/app-config";
import { getStorageData } from '../../service/apiService';

import MyPageGrid from './MyPageGrid';

import MyPageLike from './mypagesub/MyPageLike';
import MyPageCart from './mypagesub/MyPageCart';
import MyPageReview from './mypagesub/MyPageReview';
import MyPageBook from './mypagesub/MyPageBook';
import MyPageOrders from './mypagesub/MyPageOrders';
import MyPageUser from './MyPageUser';

function MyPageMain() {

    return (
        <div className='MyPage'>
            <h1>
                <div>
                    <Link to='/mypage'>내 정보</Link>
                </div>
            </h1>

            {/* <MyPageGrid /> */}

            <Routes>
                <Route path='/*' element={<MyPageUser />} />

                <Route path='like' element={<MyPageLike />} />
                <Route path='cart' element={<MyPageCart />} />
                <Route path='review' element={<MyPageReview />} />
                <Route path='orders' element={<MyPageOrders />} />
                <Route path='book' element={<MyPageBook />} />
            </Routes>
        </div>
    );
};

export default MyPageMain;
