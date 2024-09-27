import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faClockRotateLeft, faHeartCirclePlus, faListCheck, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import '../../css/mypage/MyPageGrid.css';

import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function MyPageGrid() {

    let userDetailData = JSON.parse(sessionStorage.getItem("userDetailData"));

    // Grid의 각 항목을 실행시킬때 필요한 데이터들을 가져옴
    const myPageMain = (url) => {
        let userBasicData = JSON.parse(sessionStorage.getItem("inputId"));
        apiCall(url, 'GET', null, userBasicData.token)
            .then((response) => {
                //alert(`** myPageMain 성공 url=${url}`);
                sessionStorage.setItem("userDetailData", JSON.stringify(response.data));
                navigate("/mypage");
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** myPageMain 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //myPageMain

    return (
        <div className='MyGrid'>
            <NavLink to='/mypage/like'>
                <div className='MyLike'>
                    <div className='IconLike'>
                        <FontAwesomeIcon icon={faHeartCirclePlus} />
                        {userDetailData.favoritesCnt}
                    </div>
                    <span>찜목록</span>
                </div>
            </NavLink>
            <NavLink to='/mypage/cart'>
                <div className='MyCart'>
                    <div className='IconCart'>
                        <FontAwesomeIcon icon={faCartShopping} />
                        {userDetailData.cartCnt}
                    </div>
                    <span>장바구니</span>
                </div>
            </NavLink>
            <NavLink to='/mypage/orders'>
                <div className='MyOrders'>
                    <div className='IconOrders'>
                        <FontAwesomeIcon icon={faListCheck} />
                    </div>
                    <span>구매내역</span>
                </div>
            </NavLink>
            <NavLink to='/mypage/review'>
                <div className='MyReview'>
                    <div className='IconReview'>
                        <FontAwesomeIcon icon={faTruckFast} />
                    </div>
                    <span>리뷰 관리</span>
                </div>
            </NavLink>
            <NavLink to='/mypage/book'>
                <div className='MyBook'>
                    <div className='IconBook'>
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                    </div>
                    <span>나의 예약</span>
                </div>
            </NavLink>
        </div>
    )

}

export default MyPageGrid;
