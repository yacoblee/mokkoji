import '../../css/mypage/MyPageIndex.css';

import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import MyPageGrid from './MyPageGrid';
import MyPageMain from './MyPageMain';

import MyPageLike from './mypagesub/MyPageLike';
import MyPageCart from './mypagesub/MyPageCart';
import MyPagePost from './mypagesub/MyPagePost';
import MyPageFAQ from './mypagesub/MyPageFAQ';
import MyPageList from './mypagesub/MyPageList';

import userInfo from '../login/UserInforData';
import GoodsItems from '../product/ProductObject';

function MyPageIndex() {

    const user = userInfo[0];   // 임의 지정
    const items = GoodsItems;

    const [storageCheck, setStorageCheck] = useState(false);    // 유저 정보 상품 정보가 스토리지에 있느냐?=로그인 됐느냐?

    if (!storageCheck) {
        const getUserDetail = JSON.parse(localStorage.getItem("userDetail"));  // 어떤 이름으로 저장을 할 것인가?
        const getGoodsList = JSON.parse(localStorage.getItem("goodsList"));

        if (getUserDetail === null) {
            localStorage.setItem("userDetail", JSON.stringify(user));
        }

        if (getGoodsList === null) {
            localStorage.setItem("goodsList", JSON.stringify(items));
        }

        setStorageCheck(true);
    }

    return (

        <div className='MyPage'>
            <h1>내 정보</h1>
            <MyPageGrid />

            <Routes>
                <Route path='/*' element={<MyPageMain />} />
                <Route path='like' element={<MyPageLike />} />
                <Route path='cart' element={<MyPageCart />} />
                <Route path='post' element={<MyPagePost />} />
                <Route path='list' element={<MyPageList />} />
                <Route path='faq' element={<MyPageFAQ />} />
            </Routes>
        </div>
    );
};

export default MyPageIndex;
