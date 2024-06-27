import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import ReserveObject from './ReserveObject'
import '../../css/Reserve/reserve.css'
import ReservationImg from "./ReservationImg";
const Reservation = () => {

    const [reservationCounts, setReservationCounts] = useState({});
    const [date, setDate] = useState(new Date());

    const today = new Date(); //오늘 날짜
    const oneMonthLater = moment(today).add(1, 'months').toDate();



    useEffect(() => {
        calculateReservationCounts();
    }, []);

    const calculateReservationCounts = () => {
        const counts = {};

        ReserveObject.forEach((month) => {
            month.days.forEach((dayData) => {
                const dayDate = new Date(dayData.year, dayData.month - 1, dayData.day);
                if (dayDate >= today && dayDate <= oneMonthLater) {
                    const formattedDate = moment(dayDate).format("YYYYMMDD");
                    counts[formattedDate] = dayData.id.length;
                }
            });
        });
        setReservationCounts(counts);
    };

    const onDateChange = (newDate) => {
        const formattedDate = moment(newDate).format("YYYY-MM-DD");
        const year = parseInt(moment(newDate).format("YYYY"));
        const month = parseInt(moment(newDate).format("MM"));
        const day = parseInt(moment(newDate).format("DD"));

        const monthData = ReserveObject.find(monthObj => monthObj.year === year && monthObj.month === month);
        const dayData = monthData?.days.find(dayObj => dayObj.day === day);

        if (dayData && dayData.id.length >= 5) {
            alert('해당 날짜에는 예약이 가득 찼습니다.');
        } else {
            setDate(newDate);
        }

        console.log(formattedDate);
    };

    return (
        <div className="reservation-container">
            <div className="reserve_head">
                <h1>체험 예약</h1>
            </div>
            <section className="reservation">
                <div className="reservation_img">
                    <ReservationImg />
                </div>
                <div className="reservation_calendar">
                    <Calendar
                        className="react-calendar"
                        onChange={onDateChange}
                        next2Label={null}
                        prev2Label={null}
                        formatDay={(locale, date) => moment(date).format("DD")}
                        value={date}
                        minDate={today}
                        maxDate={oneMonthLater}
                        tileContent={({ date, view }) => {
                            if (view === 'month') {
                                const formattedDate = moment(date).format("YYYYMMDD");
                                const count = reservationCounts[formattedDate] || 0;
                                return <span style={{ fontSize: '0.7rem', color: '#4759a2' }}>{count} / 5 팀</span>;
                            }
                            return null;
                        }}
                    />
                </div>
                <div className="reservation_content">
                    <div>

                    </div>

                </div>
            </section>
        </div>
    );
};

export default Reservation;
