import React, { useEffect, useState } from "react";


const ReservationIntro = () => {



    return (
        <div className="intro_inner">
            <h3>하이라이트</h3>
            <ul>
                <li>빛에 따라 색이 달라지는 오묘한 매력의 자개로 나만의 나전칠기 작품을 만들어 보세요.</li>
                <li>우리나라 전통 소반을 귀여운 미니어처로 제작하여 세상에 단 하나뿐인 작품을 간직할 수 있어요.</li>
                <li>직접 디자인한 영롱한 자개소반을 소중한 사람에게 선물해보는 건 어떠세요?</li>
                <li>소반 미니어처 외에 손거울, 스마트폰 그립톡, 머리끈 등 자개를 이용한 다양한 제품을 만들 수 있습니다.</li>
            </ul>
            <img className="hilights" src="/images/reserve/free-icon-highlighter-5351707.png" alt="highlighter" />
        </div>
    );
}

export default ReservationIntro