import '../../css/mypage/MyPageIndex.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MyPageGrid from './MyPageGrid';
import MyPageMain from './MyPageMain';

import MyPageLike from './mypagesub/MyPageLike';
import MyPageCart from './mypagesub/MyPageCart';
import MyPagePost from './mypagesub/MyPagePost';
import MyPageFAQ from './mypagesub/MyPageFAQ';
import MyPageList from './mypagesub/MyPageList';



function MyPageIndex() {
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
