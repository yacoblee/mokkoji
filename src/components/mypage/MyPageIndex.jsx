import React from 'react';
import '../../css/mypage/MyPageIndex.css';

// header높이 100px 가정하고 할 것

function MyPageIndex() {
    return (

        <div>
            <header>여기는 헤더입니다 / 높이는 100px로 차지하고 있음</header>
            <h1>내 정보</h1>
            <div class='MyPageIndex'>
                <div class='MyPageMain'>
                    <h2>@ 안녕하세요!</h2>
                    <div class="MyOrder">주문 완료 건 : @건</div>
                    <div class="MyInfo">내정보수정</div>
                </div>
                <div class='MyGrid'>
                    <div class='MyCart'>장바구니</div>
                    <div class='MyLike'>찜목록</div>
                    <div class='MyRecent'>최근 본 상품</div>
                    <div class='MyList'>구매내역</div>
                    <div class='MyPost'>배송 현황</div>
                </div>
            </div>

        </div>
    );
};

export default MyPageIndex;
