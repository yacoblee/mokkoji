import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faClockRotateLeft, faHeartCirclePlus, faListCheck, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import '../../css/mypage/MyPageGrid.css';

import React from 'react';
import { Link } from 'react-router-dom';

function MyPageGrid() {
    return (
        <div className='MyGrid'>
            <Link to='/mypage/like' >
                <div className='MyLike'>
                    <div className='IconLike'>
                        <FontAwesomeIcon icon={faHeartCirclePlus} />
                        {localStorage.length}
                    </div>
                    <span>찜목록</span>
                </div>
            </Link>
            <Link to='/mypage/cart'>
                <div className='MyCart'>
                    <div className='IconCart'>
                        <FontAwesomeIcon icon={faCartShopping} />
                        {localStorage.length}
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
            <Link to='/mypage/recent'>
                <div className='MyRecent'>
                    <div className='IconRecent'>
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                    </div>
                    <span>문의 예정</span>
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
        </div>
    )

}

export default MyPageGrid;
