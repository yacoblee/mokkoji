import React, { useEffect, useState } from "react";
import '../../css/Reserve/reserve.css'
import ReserveSource from './ReserveSource'

const ReservationImg = () => {

    const [slideImgBox, setSlideImgBox] = useState(0);

    // 각 ReserveSource 항목의 slideSrc 배열에서 이미지들을 가져와서 렌더링합니다.
    const reservImg = ReserveSource.flatMap((item) =>
        item.slideSrc.map((src, i) => (
            <img src={src} key={`${item.contNum}-${i}`} alt={`slide-${i}`}
                style={{ transform: `translateX(-${slideImgBox * 100}%)` }} />
        ))
    );

    // const onClickLabelBox = (index) => {

    //     SetSlideImgBox(1);

    // }

    return (
        <div className='reservation_img_inner'>
            {reservImg}


        </div>
    );
}


export default ReservationImg