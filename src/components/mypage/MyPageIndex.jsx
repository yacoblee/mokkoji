import React from 'react';
import '../../css/mypage/MyPageIndex.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOM from 'react-dom'
import { faCartShopping, faClockRotateLeft, faHeartCirclePlus, faListCheck, faTruckFast } from '@fortawesome/free-solid-svg-icons';

// header높이 100px 가정하고 할 것

function MyPageIndex() {
    return (

        <div className='MyPage'>
            <h1>내 정보</h1>

            <div className='MyPageIndex'>
                <div className='MyPageMain'>
                    <div className='MyInfoGrid'>
                        <div className="MyInfo">
                            <h1>@ 안녕하세요!</h1>
                            <div class="MyInfoSet">내정보수정</div>
                        </div>
                        <div className="MyOrder">
                            <ul>
                                <li>
                                    <span>
                                        <h3>대기</h3>
                                    </span>
                                    <span>
                                        <a href="">0</a>
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        <h3>완료</h3>
                                    </span>
                                    <span>
                                        <a href="">0</a>
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        <h3>확정</h3>
                                    </span>
                                    <span>
                                        <a href="">0</a>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='MyGrid'>
                    <a href="">
                        <div className='MyLike'>
                            <div className='IconLike'>
                                <FontAwesomeIcon icon={faHeartCirclePlus} />
                            </div>
                            <span>찜목록</span>
                        </div>
                    </a>
                    <a href="">
                        <div className='MyCart'>
                            <div className='IconCart'>
                                <FontAwesomeIcon icon={faCartShopping} />
                            </div>
                            <span>장바구니</span>
                        </div>
                    </a>
                    <a href="">
                        <div className='MyPost'>
                            <div className='IconPost'>
                                <FontAwesomeIcon icon={faTruckFast} />
                            </div>
                            <span>배송 현황</span>
                        </div>
                    </a>
                    <a href="">
                        <div className='MyRecent'>
                            <div className='IconRecent'>
                                <FontAwesomeIcon icon={faClockRotateLeft} />
                            </div>
                            <span>최근 본 상품</span>
                        </div>
                    </a>
                    <a href="">
                        <div className='MyList'>
                            <div className='IconList'>
                                <FontAwesomeIcon icon={faListCheck} />
                            </div>
                            <span>구매내역</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MyPageIndex;
