import React, { useEffect, useState } from "react";
import '../../css/Reserve/reserve.css'
import ReserveSource from './ReserveSource'

const ReservationImg = () => {

    const [slideImgBox, setSlideImgBox] = useState(0);

    const reservImg = ReserveSource.flatMap((item) =>
        item.slideSrc.map((src, i) => (
            <img src={src} key={`${i}`} alt={`slide ${i}`} />
        ))
    );


    return (
        <div className='reservation_img_inner'>
            <div className="reservation_main_img">
                {reservImg}

            </div>
            <div className="reservation_sub_img">
                {/* {reservImg} */} {reservImg}

            </div>
            <div className="reservation_fin_img">
                {/* {reservImg} */} {reservImg}

            </div>
        </div>
    );
}


export default ReservationImg