import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faClockRotateLeft, faHeartCirclePlus, faListCheck, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import '../../css/mypage/MyPageGrid.css';

import React, { useEffect, useState } from 'react';
import { Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import { apiCall } from '../../service/apiService';

function MyPageGrid({ favoritesCnt, cartCnt }) {

    return (
        <div className='MyGrid'>
            <NavLink to="/mypage/favorites" >
                <div className='MyLike'>
                    <div className='IconLike'>
                        <FontAwesomeIcon icon={faHeartCirclePlus} />
                        {favoritesCnt}
                    </div>
                    <span>찜목록</span>
                </div>
            </NavLink>
            <NavLink to="/mypage/cart" >
                <div className='MyCart'>
                    <div className='IconCart'>
                        <FontAwesomeIcon icon={faCartShopping} />
                        {cartCnt}
                    </div>
                    <span>장바구니</span>
                </div>
            </NavLink>
            <NavLink to='/mypage/orders'>
                <div className='MyOrders'>
                    <div className='IconOrders'>
                        <FontAwesomeIcon icon={faTruckFast} />
                    </div>
                    <span>구매내역</span>
                </div>
            </NavLink>
            <NavLink to='/mypage/review'>
                <div className='MyReview'>
                    <div className='IconReview'>
                        <FontAwesomeIcon icon={faListCheck} />
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
