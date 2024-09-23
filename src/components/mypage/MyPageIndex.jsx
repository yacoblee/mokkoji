import '../../css/mypage/MyPageIndex.css';

import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import MyPageGrid from './MyPageGrid';
import MyPageMain from './MyPageMain';

import MyPageLike from './mypagesub/MyPageLike';
import MyPageCart from './mypagesub/MyPageCart';
import MyPageReview from './mypagesub/MyPageReview';
import MyPageBook from './mypagesub/MyPageBook';
import MyPageList from './mypagesub/MyPageList';

// import userInfoArray from '../login/UserInforData';
import GoodsItems from '../product/ProductObject';

function MyPageIndex() {
    const items = GoodsItems;

    // const storedUserInfo = sessionStorage.getItem('LoginUserInfo'); //local에서 sessionStorage 로 변경 -승현
    // const parsedUserInfo = JSON.parse(storedUserInfo);

    // // id와 pw가 일치하는 사용자를 찾기 위해 find 메서드 사용
    // const userInfoDetail = userInfoArray.find((user) => {
    //     return user.id === parsedUserInfo.id;
    // });

    const userInfoDetail = sessionStorage.getItem('LoginUserInfo')
    const user = JSON.parse(userInfoDetail);

    const [storageCheck, setStorageCheck] = useState(false); // 유저 정보 상품 정보가 스토리지에 있느냐?=로그인 됐느냐?

    if (!storageCheck) {
        //     const getUserDetail = JSON.parse(sessionStorage.getItem("LoginUserInfo")); // 어떤 이름으로 저장을 할 것인가?
        const getGoodsList = JSON.parse(sessionStorage.getItem("goodsList"));

        //     if (getUserDetail === null && user) {
        //         sessionStorage.setItem("LoginUserInfo", JSON.stringify(user));
        //     }

        if (getGoodsList === null) {
            sessionStorage.setItem("goodsList", JSON.stringify(items));
        }

        setStorageCheck(true);
    }

    if (user) {
        // console.log(`${user.id}`);
    } else {
        console.log("User not found");
    }

    // 하위 컴포넌트에서 변경시 전체 렌더링을 위한 로직
    const [change, setChange] = useState(false)


    return (
        <div className='MyPage'>
            <h1>
                <div>
                    <Link to='/mypage'>내 정보</Link>
                </div>
            </h1>
            <MyPageGrid />

            <Routes>
                <Route path='/*' element={<MyPageMain />} />
                <Route path='like' element={<MyPageLike change={change} setChange={setChange} />} />
                <Route path='cart' element={<MyPageCart change={change} setChange={setChange} />} />
                <Route path='Review' element={<MyPageReview />} />
                <Route path='list' element={<MyPageList />} />
                <Route path='book' element={<MyPageBook change={change} setChange={setChange} />} />
            </Routes>
        </div>
    );
};

export default MyPageIndex;
