import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faClockRotateLeft, faHeartCirclePlus, faListCheck, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import '../../css/mypage/MyPageGrid.css';

import userInfo from "../login/UserInforData";

import React from 'react';
import { Link } from 'react-router-dom';

function MyPageGrid() {

    const user = userInfo[0];   // 임의 지정

    return (
        <div className='MyGrid'>
            <Link to='/mypage/like' >
                <div className='MyLike'>
                    <div className='IconLike'>
                        <FontAwesomeIcon icon={faHeartCirclePlus} />
                        {user.mypage.isLike.length}
                    </div>
                    <span>찜목록</span>
                </div>
            </Link>
            <Link to='/mypage/cart'>
                <div className='MyCart'>
                    <div className='IconCart'>
                        <FontAwesomeIcon icon={faCartShopping} />
                        {user.mypage.basket.length}
                    </div>
                    <span>장바구니</span>
                </div>
            </Link>
            <Link to='/mypage/post'>
                <div className='MyPost'>
                    <div className='IconPost'>
                        <FontAwesomeIcon icon={faTruckFast} />
                        {localStorage.length}
                    </div>
                    <span>배송 현황</span>
                </div>
            </Link>
            <Link to='/mypage/list'>
                <div className='MyList'>
                    <div className='IconList'>
                        <FontAwesomeIcon icon={faListCheck} />
                    </div>
                    <span>구매내역</span>
                </div>
            </Link>
            <Link to='/mypage/faq'>
                <div className='MyFAQ'>
                    <div className='IconFAQ'>
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                    </div>
                    <span>1대1 문의</span>
                </div>
            </Link>
        </div>
    )

}

export default MyPageGrid;
