import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faClockRotateLeft, faHeartCirclePlus, faListCheck, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import '../../css/mypage/MyPageGrid.css';

import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function MyPageGrid() {

    const user = JSON.parse(sessionStorage.getItem("LoginUserInfo"));
    const items = JSON.parse(sessionStorage.getItem("goodsList"));


    return (
        <div className='MyGrid'>
            <NavLink to='/mypage/like'>
                <div className='MyLike'>
                    <div className='IconLike'>
                        <FontAwesomeIcon icon={faHeartCirclePlus} />
                        {user.mypage.isLike.length}
                    </div>
                    <span>찜목록</span>
                </div>
            </NavLink>
            <NavLink to='/mypage/cart'>
                <div className='MyCart'>
                    <div className='IconCart'>
                        <FontAwesomeIcon icon={faCartShopping} />
                        {user.mypage.basket.length}
                    </div>
                    <span>장바구니</span>
                </div>
            </NavLink>
            <NavLink to='/mypage/list'>
                <div className='MyList'>
                    <div className='IconList'>
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
                        {user.mypage.Reservation.length}
                    </div>
                    <span>나의 예약</span>
                </div>
            </NavLink>
        </div>
    )

}

export default MyPageGrid;
