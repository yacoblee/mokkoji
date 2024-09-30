import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faClockRotateLeft, faHeartCirclePlus, faListCheck, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import '../../css/mypage/MyPageGrid.css';

import React, { useEffect } from 'react';
import { Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import { apiCall } from '../../service/apiService';

function MyPageGrid() {

    const navigate = useNavigate();

    let userMainData = JSON.parse(sessionStorage.getItem("userMainData"));

    // Grid의 각 항목을 실행시킬때 필요한 데이터들을 가져옴
    const myPageLike = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'GET', null, userToken)
            .then((response) => {
                //alert(`** myPageLike 성공 url=${url}`);
                sessionStorage.setItem("userFavorite", JSON.stringify(response.data));
                navigate("/mypage/favorites");
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** myPageLike 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //myPageLike













    return (
        <div className='MyGrid'>
            <NavLink onClick={() => { myPageLike("/mypage/favorites") }}>
                <div className='MyLike'>
                    <div className='IconLike'>
                        <FontAwesomeIcon icon={faHeartCirclePlus} />
                        {userMainData.favoritesCnt}
                    </div>
                    <span>찜목록</span>
                </div>
            </NavLink>
            <NavLink to='/mypage/cart'>
                <div className='MyCart'>
                    <div className='IconCart'>
                        <FontAwesomeIcon icon={faCartShopping} />
                        {userMainData.cartCnt}
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
