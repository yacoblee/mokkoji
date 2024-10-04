import '../../css/mypage/MyPageMain.css';

import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { API_BASE_URL } from "../../service/app-config";
import { getStorageData } from '../../service/apiService';
import { apiCall } from '../../service/apiService';

import MyPageGrid from './MyPageGrid';

import MyPageLike from './mypagesub/MyPageLike';
import MyPageCart from './mypagesub/MyPageCart';
import MyPageReview from './mypagesub/MyPageReview';
import MyPageBook from './mypagesub/MyPageBook';
import MyPageOrders from './mypagesub/MyPageOrders';
import MyPageUser from './MyPageUser';

function MyPageMain() {

    const [userMain, setUserMain] = useState([]);
    const [favoritesCnt, setFavoritesCnt] = useState();
    const [cartCnt, setCartCnt] = useState();

    // myPage로 넘어갈때 로그인된 사용자의 상세 정보를 담아서 이동
    const myPageMain = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'GET', null, userToken)
            .then((response) => {
                //alert(`** myPageMain 성공 url=${url}`);
                setUserMain(response.data);
                setFavoritesCnt(response.data.favoritesCnt);
                setCartCnt(response.data.cartCnt);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** myPageMain 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //myPageMain

    useEffect(() => {
        myPageMain("/mypage/user")
    }, [])

    return (
        <div className='MyPage'>
            <h1>
                <div>
                    <Link to='/mypage'>내 정보</Link>
                </div>
            </h1>

            <MyPageGrid favoritesCnt={favoritesCnt} cartCnt={cartCnt} />

            <Routes>
                <Route path='/*' element={<MyPageUser userMain={userMain} />} />

                <Route path='favorites' element={<MyPageLike />} />
                <Route path='cart' element={<MyPageCart />} />
                <Route path='review' element={<MyPageReview />} />
                <Route path='orders' element={<MyPageOrders />} />
                <Route path='book' element={<MyPageBook />} />
            </Routes>
        </div>
    );
};

export default MyPageMain;
