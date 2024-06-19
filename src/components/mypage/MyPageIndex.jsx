import React from 'react';
import '../../css/mypage/MyPageIndex.css';

// header높이 100px 가정하고 할 것

function MyPageIndex() {
    return (

        <div>
            <h1>내 정보</h1>

            <div className='MyPageIndex'>
                <div className='MyPageMain'>
                    <div className='MyInfoGrid'>
                        <div className="MyInfo">
                            <h2>@ 안녕하세요!</h2>
                            <div class="MyInfoSet">내정보수정</div>
                        </div>

                        <div className="MyOrder">
                            <ul>
                                <li>
                                    <span>
                                        <strong>대기</strong>
                                    </span>
                                    <span>
                                        <a href="">=찜</a>
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        <strong>완료</strong>
                                    </span>
                                    <span>
                                        <a href="">=배송</a>
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        <strong>확정</strong>
                                    </span>
                                    <span>
                                        <a href="">=내역</a>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='MyGrid'>
                    <div className='MyLike'>
                        <div><img src="" alt="찜" /></div>
                        <div>찜목록</div>
                    </div>
                    <div className='MyCart'>
                        <div><img src="" alt="장바구니" /></div>
                        <div>장바구니</div>
                    </div>
                    <div className='MyPost'>
                        <div><img src="" alt="배송" /></div>
                        <div>배송 현황</div>
                    </div>
                    <div className='MyRecent'>
                        <div><img src="" alt="기록" /></div>
                        <div>최근 본 상품</div>
                    </div>
                    <div className='MyList'>
                        <div><img src="" alt="내역" /></div>
                        <div>구매내역</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPageIndex;
