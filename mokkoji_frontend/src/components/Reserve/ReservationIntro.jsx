import React, { useEffect, useState } from "react";


const ReservationIntro = ({regists}) => {
    const regist = regists.length > 0 ? regists[0] : {};

    const highlights = [];
    for (let i = 1; i <= 4; i++) {
        const highlight = regist[`hightlight${i}`];
        if (highlight) {
            highlights.push(highlight);
        }
    }

    return (
        <div className="intro_inner">
            <h3>하이라이트</h3>
            <ul>
                {highlights.length > 0 ? (
                    highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                    ))
                ) : (
                    <li>하이라이트 정보가 없습니다.</li>
                )}
            </ul>
            <img className="hilights" src="/images/reserve/free-icon-highlighter-5351707.png" alt="highlighter" />
        </div>
    );
}

export default ReservationIntro