import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faClockRotateLeft, faHeartCirclePlus, faListCheck, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import '../../css/mypage/MyPageIndex.css';

import React from 'react';

function MyPageGrid() {
    return (
        <div className='MyGrid'>
            <a href="./MyPageLike">
                <div className='MyLike'>
                    <div className='IconLike'>
                        <FontAwesomeIcon icon={faHeartCirclePlus} />
                    </div>
                    <span>찜목록</span>
                </div>
            </a>
            <a href="./MyPageCart">
                <div className='MyCart'>
                    <div className='IconCart'>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </div>
                    <span>장바구니</span>
                </div>
            </a>
            <a href="./MyPagePost">
                <div className='MyPost'>
                    <div className='IconPost'>
                        <FontAwesomeIcon icon={faTruckFast} />
                    </div>
                    <span>배송 현황</span>
                </div>
            </a>
            <a href="./MyPageRecent">
                <div className='MyRecent'>
                    <div className='IconRecent'>
                        <FontAwesomeIcon icon={faClockRotateLeft} />
                    </div>
                    <span>최근 본 상품</span>
                </div>
            </a>
            <a href="./MyPageList">
                <div className='MyList'>
                    <div className='IconList'>
                        <FontAwesomeIcon icon={faListCheck} />
                    </div>
                    <span>구매내역</span>
                </div>
            </a>
        </div>
    )
}

export default MyPageGrid;
