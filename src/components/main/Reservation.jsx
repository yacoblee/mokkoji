import React, { useState } from "react";
import Calendar from 'react-calendar';
import '../../css/reserve.css'
const Reservation = () => {
    const [date, setDate] = useState(new Date());

    const onDateChange = (newDate) => {
        setDate(newDate);
    };

    return (
        <div className="reservation-container">
            <div className="reserve_head">
                <h1>체험 예약</h1>
            </div>
            <section className="reservation">
                <div className="reservation_img">

                </div>

                <div className="reservation_content">

                </div>
            </section>
        </div>
    );
};


export default Reservation