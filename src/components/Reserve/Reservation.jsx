import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import ReserveObject from './ReserveObject';
import '../../css/Reserve/reserve.css';
import ReservationImg from "./ReservationImg";
import ReservationIntro from "./ReservationIntro";

const Reservation = () => {
    const [reservationCounts, setReservationCounts] = useState({});
    const [date, setDate] = useState(new Date());

    const today = new Date(); // 오늘 날짜
    const oneMonthLater = moment(today).add(1, 'months').toDate();
    const [showCalendar, setShowCalendar] = useState(false);

    // 숫자 클릭에 대한 state
    const [btnValue, setBtnValue] = useState({
        adultSelect: 1, // 성인 옵션의 갯수
        teenSelect: 1,  // 청소년 옵션의 갯수
    });

    // 클릭이벤트 -> 숫자 클릭에 대한 state 함수
    const onClickbtn = (type, name) => {
        if (type === '-') {
            if (btnValue[name] > 1) {
                setBtnValue(it => ({
                    ...it,
                    [name]: btnValue[name] - 1
                }));
            } else {
                setBtnValue(it => ({
                    ...it,
                    [name]: btnValue[name]
                }));
            }
        } else {
            setBtnValue(it => ({
                ...it,
                [name]: btnValue[name] + 1
            }));
        }
    };

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
        setShowCalendar(false); // Close calendar on date selection
        console.log(formattedDate);
    };

    const toggleCalendar = () => {
        setShowCalendar((prevShowCalendar) => !prevShowCalendar);
        if (!showCalendar) {
            document.querySelector('.calendar-toggle-button').focus();
        }
    };

    const handleFormSubmit = () => {
        const reservationData = {
            date: moment(date).format("YYYY-MM-DD"),
            adults: btnValue.adultSelect,
            teens: btnValue.teenSelect
        };

        // Retrieve existing reservations from local storage
        const existingReservations = JSON.parse(localStorage.getItem('reservations')) || [];

        // Add the new reservation to the array
        existingReservations.push(reservationData);

        // Save the updated reservations array to local storage
        localStorage.setItem('reservations', JSON.stringify(existingReservations));

        alert('예약이 완료되었습니다!');
    };

    return (
        <div className="reservation-container">
            <div className="reserve_head">
                <h1>체험 예약</h1>
                <p>영롱한 자개소반 미니어처 만들기</p>
            </div>
            <section className="reservation">
                <div className="reservation_img">
                    <ReservationImg />
                </div>
                <div className="reservation_calendar">
                    <form onSubmit={(event) => event.preventDefault()}>

                        {/* 우즉 예약 버튼 위치 */}
                        <div className="calendar-toggle">
                            <p>₩ 무료</p>
                            <button type="button" onClick={toggleCalendar} className="calendar-toggle-button">
                                날짜 확인
                            </button>
                            <div className='personSelect'>
                                <ul>
                                    <li>
                                        <p>성인: </p>
                                        <button type='button' onClick={() => { onClickbtn('-', 'adultSelect') }}>-</button>
                                        {btnValue.adultSelect}
                                        <button type='button' onClick={() => { onClickbtn('+', 'adultSelect') }}>+</button>
                                    </li>
                                    <li>
                                        <p>청소년: </p>
                                        <button type='button' onClick={() => { onClickbtn('-', 'teenSelect') }}>-</button>
                                        {btnValue.teenSelect}
                                        <button type='button' onClick={() => { onClickbtn('+', 'teenSelect') }}>+</button>
                                    </li>
                                    <li className="personSelect_check">
                                        <span>예약 날짜: {moment(date).format("YYYYMMDD")}</span>
                                    </li>
                                    <hr />
                                    <li>
                                        <button type="button" onClick={handleFormSubmit} className="calendar-toggle-submit">
                                            예약 하기
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {showCalendar && (
                            <div className="reservation_calendar_inner">
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
                        )}
                    </form>
                </div>

                <div className="reservation_intro">
                    <ReservationIntro />
                </div>
            </section>
        </div>
    );
};

export default Reservation;


// import React, { useState, useEffect } from "react";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import moment from 'moment';
// import ReserveObject from './ReserveObject';
// import '../../css/Reserve/reserve.css';
// import ReservationImg from "./ReservationImg";
// import ReservationIntro from "./ReservationIntro";

// const Reservation = () => {
//     const [reservationCounts, setReservationCounts] = useState({});
//     const [date, setDate] = useState(new Date());
//     const [showCalendar, setShowCalendar] = useState(false);
//     const [btnValue, setBtnValue] = useState({
//         adultSelect: 0,
//         teenSelect: 0,
//     });
//     const [reservations, setReservations] = useState([]);
//     const userData = JSON.parse(sessionStorage.getItem('LoginUserInfo')); // 세션에서 사용자 정보 가져오기

//     const today = new Date(); // 오늘 날짜
//     const oneMonthLater = moment(today).add(1, 'months').toDate();

//     useEffect(() => {
//         initializeReservations();
//         calculateReservationCounts();
//     }, []);

//     // 초기값 세팅
//     const initializeReservations = () => {
//         const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
//         setReservations(storedReservations);
//     };

//     // 날짜별 예약자 현황 파악
//     const calculateReservationCounts = () => {
//         const counts = {};
//         ReserveObject.forEach((month) => {
//             month.days.forEach((dayData) => {
//                 const dayDate = new Date(dayData.year, dayData.month - 1, dayData.day);
//                 if (dayDate >= today && dayDate <= oneMonthLater) {
//                     const formattedDate = moment(dayDate).format("YYYYMMDD");
//                     counts[formattedDate] = dayData.participate.length;
//                 }
//             });
//         });
//         setReservationCounts(counts);
//     };

//     // 날짜 클릭 변경 이벤트
//     const onDateChange = (newDate) => {
//         const formattedDate = moment(newDate).format("YYYY-MM-DD");
//         const year = parseInt(moment(newDate).format("YYYY"));
//         const month = parseInt(moment(newDate).format("MM"));
//         const day = parseInt(moment(newDate).format("DD"));

//         const monthData = ReserveObject.find(monthObj => monthObj.year === year && monthObj.month === month);
//         const dayData = monthData?.days.find(dayObj => dayObj.day === day);

//         if (dayData && dayData.participate.length >= 5) {
//             alert('해당 날짜에는 예약이 가득 찼습니다.');
//         } else {
//             setDate(newDate);
//         }
//         setShowCalendar(false);
//     };

//     // 달력 토글 이벤트
//     const toggleCalendar = () => {
//         setShowCalendar((prevShow) => !prevShow);
//         if (!showCalendar) {
//             document.querySelector('.calendar-toggle-button').focus();
//         }
//     };

//     // 인원 수 변경 이벤트
//     const onClickbtn = (type, name) => {
//         if (type === '-') {
//             if (btnValue[name] > 1) {
//                 setBtnValue(it => ({
//                     ...it,
//                     [name]: btnValue[name] - 1
//                 }));
//             }
//         } else {
//             setBtnValue(it => ({
//                 ...it,
//                 [name]: btnValue[name] + 1
//             }));
//         }
//     };

//     // 예약 제출 이벤트
//     const reserveSubmit = () => {
//         const reservationData = {
//             date: moment(date).format("YYYY-MM-DD"),
//             adults: btnValue.adultSelect,
//             teens: btnValue.teenSelect,
//             userId: userData.id // 세션에서 가져온 사용자 ID 사용
//         };

//         const updatedReservations = [...reservations, reservationData];
//         setReservations(updatedReservations);
//         localStorage.setItem('reservations', JSON.stringify(updatedReservations));

//         const { year, month, day } = reservationData.date.split('-').reduce((acc, val) => ({ ...acc, year: val }), {});

//         const monthData = ReserveObject.find(monthObj => monthObj.year === year && monthObj.month === month);

//         if (monthData) {
//             const dayData = monthData.days.find(dayObj => dayObj.day === day);
//             if (dayData) {
//                 dayData.participate.push({ id: reservationData.userId, adult: reservationData.adults, teenager: reservationData.teens });
//             } else {
//                 monthData.days.push({ year, month, day, participate: [{ id: reservationData.userId, adult: reservationData.adults, teenager: reservationData.teens }] });
//             }
//         } else {
//             ReserveObject.push({
//                 year,
//                 month,
//                 days: [{ year, month, day, participate: [{ id: reservationData.userId, adult: reservationData.adults, teenager: reservationData.teens }] }]
//             });
//         }

//         calculateReservationCounts();
//         alert('예약이 완료되었습니다!');
//     };

//     return (
//         <div className="reservation-container">
//             <div className="reserve_head">
//                 <h1>체험 예약</h1>
//                 <p>영롱한 자개소반 미니어처 만들기</p>
//             </div>
//             <section className="reservation">
//                 <div className="reservation_img">
//                     <ReservationImg />
//                 </div>
//                 <div className="reservation_calendar">
//                     <form onSubmit={(event) => event.preventDefault()}>
//                         <div className="calendar-toggle">
//                             <p>₩ 무료</p>
//                             <button onClick={toggleCalendar} className="calendar-toggle-button">
//                                 날짜 확인
//                             </button>
//                             <div className='personSelect'>
//                                 <ul>
//                                     <li>
//                                         <p>성인: </p>
//                                         <button type='button' onClick={() => { onClickbtn('-', 'adultSelect') }}>-</button>
//                                         {btnValue.adultSelect}
//                                         <button type='button' onClick={() => { onClickbtn('+', 'adultSelect') }}>+</button>
//                                     </li>
//                                     <li>
//                                         <p>청소년: </p>
//                                         <button type='button' onClick={() => { onClickbtn('-', 'teenSelect') }}>-</button>
//                                         {btnValue.teenSelect}
//                                         <button type='button' onClick={() => { onClickbtn('+', 'teenSelect') }}>+</button>
//                                     </li>
//                                     <li className="personSelect_check">
//                                         <span>예약 날짜: {moment(date).format("YYYY-MM-DD")}</span>
//                                     </li>
//                                     <hr />
//                                     <li className=" ">
//                                         <button onClick={reserveSubmit} className="calendar-toggle-submit">
//                                             예약 하기
//                                         </button>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                         {showCalendar && (
//                             <div className="reservation_calendar_inner">
//                                 <Calendar
//                                     className="react-calendar"
//                                     onChange={onDateChange}
//                                     next2Label={null}
//                                     prev2Label={null}
//                                     formatDay={(locale, date) => moment(date).format("DD")}
//                                     value={date}
//                                     minDate={today}
//                                     maxDate={oneMonthLater}
//                                     tileContent={({ date, view }) => {
//                                         if (view === 'month') {
//                                             const formattedDate = moment(date).format("YYYYMMDD");
//                                             const count = reservationCounts[formattedDate] || 0;
//                                             return <span style={{ fontSize: '0.7rem', color: '#4759a2' }}>{count} / 5 팀</span>;
//                                         }
//                                         return null;
//                                     }}
//                                 />
//                             </div>
//                         )}
//                     </form>
//                 </div>
//                 <div className="reservation_intro">
//                     <ReservationIntro />
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Reservation;
