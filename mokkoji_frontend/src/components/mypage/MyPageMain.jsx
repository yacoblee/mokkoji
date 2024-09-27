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
import MyPageList from './mypagesub/MyPageList';

function MyPageMain() {

    // ** Server 요청 함수
    const serverDataRequest = (url) => {
        // let userBasicData = sessionStorage.getItem("inputId");
        let userBasicData = JSON.parse(sessionStorage.getItem("inputId"));
        let userId = userBasicData.userId;
        apiCall(url + userId, 'GET', null, null)
            .then((response) => {
                alert(`** serverDataRequest 성공 url=${url}`);
                sessionStorage.setItem("serverData", JSON.stringify(response));
                navigate("/mypage");
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** serverDataRequest 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //serverDataRequest

    return (
        <div className='MyPage'>
            <h1>
                <div>
                    <Link to='/mypage'>내 정보</Link>
                </div>
            </h1>

            <MyPageGrid />

            <Routes>
                <Route path='/' element={<MyPageUser />} />

                <Route path='like' element={<MyPageLike />} />
                <Route path='cart' element={<MyPageCart />} />
                <Route path='review' element={<MyPageReview />} />
                <Route path='list' element={<MyPageList />} />
                <Route path='book' element={<MyPageBook />} />
            </Routes>
        </div>
    );
};

export default MyPageMain;
