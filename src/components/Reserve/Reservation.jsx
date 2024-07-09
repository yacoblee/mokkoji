import React, { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import ReserveObject from './ReserveObject';
import Reservesource from "./ReserveSource";
import '../../css/Reserve/reserve.css';
import ReservationImg from "./ReservationImg";
import ReservationIntro from "./ReservationIntro";
import ReservationDeatil from "./ReservationDetail";

const Reservation = () => {
    const [reservationCounts, setReservationCounts] = useState({});
    const [date, setDate] = useState(new Date());
    const existingReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const today = new Date(); // 오늘 날짜
    const oneMonthLater = moment(today).add(1, 'months').toDate();
    const [showCalendar, setShowCalendar] = useState(false);

    // 숫자 클릭에 대한 state
    const [btnValue, setBtnValue] = useState({
        adultSelect: 0, // 성인 옵션의 갯수
        teenSelect: 0,  // 청소년 옵션의 갯수
    });

    // 클릭이벤트 -> 숫자 클릭에 대한 state 함수
    const onClickbtn = (type, name) => {
        if (type === '-') {
            if (btnValue[name] >= 1) {
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
                    const formattedDate = moment(dayDate).format("YYYY-MM-DD");
                    counts[formattedDate] = dayData.id.length;
                }
            });
        });
        // 로컬 스토리지에 업데이트 될 경우 정보 리로드
        existingReservations.forEach(reservation => {
            const formattedDate = moment(reservation.date).format("YYYY-MM-DD");
            counts[formattedDate] = (counts[formattedDate] || 0) + 1;
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

        if (moment(newDate).isSame(today, 'day')) {
            alert('당일 예약은 불가능합니다.');
            return;
        }

        if (dayData && dayData.id.length >= 5) {
            alert('해당 날짜에는 예약이 가득 찼습니다.');
        } else {
            setDate(newDate);
        }
        setShowCalendar(false); // 오픈된 달력 닫기
    };

    const toggleCalendar = () => { // 날짜 확인 클릭되고 있음을 알려주는 이벤트
        setShowCalendar((prevShowCalendar) => !prevShowCalendar);
        if (!showCalendar) {
            document.querySelector('.calendar-toggle-button').focus();
        }
    };

    const handleFormSubmit = () => {
        const userData = JSON.parse(sessionStorage.getItem('LoginUserInfo'));

        const reservationData = {
            reserveItem: Reservesource[0].reserveItem,
            name: Reservesource[0].name,
            date: moment(date).format("YYYY-MM-DD"),
            adult: btnValue.adultSelect,
            teenager: btnValue.teenSelect,
        };
        if (!userData) {
            alert('로그인 후 이용 가능합니다.');
            return false;
        }
        // 기존 예약 필터링
        if (userData && (reservationData.adult !== 0 || reservationData.teenager !== 0)) {

            // 중복 예약 예외처리
            const checkDate = userData.mypage.Reservation.find(reserve => reserve.date === reservationData.date);
            if (checkDate) {
                alert('중복 예약은 불가능합니다.');
                return false;
            }

            let updatedReserve = userData.mypage.Reservation.filter(reserve => reserve.date !== reservationData.date);
            updatedReserve.push(reservationData);

            const updatedUser = {
                ...userData,
                mypage: {
                    ...userData.mypage,
                    Reservation: updatedReserve
                }
            };

            // 업데이트정보 세션에 다시 저장
            sessionStorage.setItem('LoginUserInfo', JSON.stringify(updatedUser));


            existingReservations.push(reservationData);
            localStorage.setItem('reservations', JSON.stringify(existingReservations));

            // 예약 완료 후 reservationCounts 업데이트
            setReservationCounts(prevCounts => {
                const newCounts = { ...prevCounts };
                const formattedDate = moment(date).format("YYYY-MM-DD");
                newCounts[formattedDate] = (newCounts[formattedDate] || 0) + 1;
                return newCounts;
            });

            alert('예약이 완료되었습니다!');
        } else {
            alert('예약 정보를 확인해주세요.');
            return false;
        }
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
                                    {/* <li>
                                        <button type="button" onClick={handleFormSubmit} className="calendar-toggle-submit">
                                            예약 하기
                                        </button>
                                    </li> */}
                                </ul>
                            </div>
                            <button type="button" onClick={handleFormSubmit} className="calendar-toggle-submit">
                                예약 하기
                            </button>
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
                                            const formattedDate = moment(date).format("YYYY-MM-DD");
                                            const count = reservationCounts[formattedDate] || 0;
                                            if (count >= 5) {
                                                return <span style={{ fontSize: '0.7rem', color: 'red' }}>{count} / 5 팀</span>;
                                            } else {

                                                return <span style={{ fontSize: '0.7rem', color: '#4759a2' }}>{count} / 5 팀</span>;
                                            }
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
            <section className="reservation_detail">

                <ReservationDeatil />
            </section>
        </div>
    );
};

export default Reservation;