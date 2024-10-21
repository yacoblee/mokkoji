import React, { useState, useEffect } from "react";
import { useParams, NavLink } from 'react-router-dom';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import ReserveObject from './ReserveObject';
import ReservationImg from "./ReservationImg";
import ReservationIntro from "./ReservationIntro";
import ReservationDeatil from "./ReservationDetail";

import { API_BASE_URL } from "../../service/app-config";
import axios from "axios";
import '../../css/Reserve/reserve.css';




const Reservation = () => {
    // const existingReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    const [reservationCounts, setReservationCounts] = useState({});
    const [date, setDate] = useState(new Date());
    const [registsData, setRegistsData] = useState([]);
    const today = new Date(); // 오늘 날짜
    const oneMonthLater = moment(today).add(1, 'months').toDate();
    const [showCalendar, setShowCalendar] = useState(false);
    const [reserveImage, setReserveImage] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.iamport.kr/v1/iamport.js";
        script.async = true;

        document.body.appendChild(script);

        script.onload = () => {
            if (window.IMP) {
                const { IMP } = window;
                IMP.init('imp12042271'); // 가맹점 식별코드
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const onClickPay = async () => {
        const { IMP } = window;


        const teenager = btnValue.teenSelect;
        const adult = btnValue.adultSelect;
        const personCnt = teenager + adult; // 청소년과 성인의 합

        // registsData가 로딩된 상태에서만 계산
        if (registsData.length > 0) {
            const teenagerTotal = teenager * registsData[0].teenager; // 청소년 총 가격 계산
            const adultTotal = adult * registsData[0].adult; // 성인 총 가격 계산

            // 결제 정보를 위한 데이터 객체
            const data = {
                pg: "html5_inicis",
                pay_method: "card",
                merchant_uid: `merchant_${new Date().getTime()}`,
                //amount: teenagerTotal + adultTotal,  // 총 가격
                amount: 100,  // 테스트용 가격
                teenager: teenager,
                adult: adult,
                personCnt: personCnt,  // 총 인원수
                reserve_date: moment(date).format("YYYY-MM-DD"),
            };
            setLoading(true);
            IMP.request_pay(data, async (rsp) => {
                if (rsp.success) {
                    try {
                        // 비동기 API 호출
                        const response = await axios.post(`${API_BASE_URL}/purchase/${rsp.imp_uid}`, {
                            registId: data.merchant_uid,
                            activeDate: data.reserve_date,
                            adult: data.adult,
                            teenager: data.teenager,
                            personCnt: data.personCnt,
                            registCnt: data.amount,

                        });

                        console.log("결제 성공:", response.data);
                        alert("결제가 완료되었습니다.");
                    } catch (error) {
                        console.error("결제 처리 중 오류 발생:", error);
                        alert("결제에 실패했습니다. 다시 시도해 주세요.");
                    }
                } else {
                    console.log("결제 실패:", rsp.error_msg);
                    alert("결제 실패: " + rsp.error_msg);
                }

                setLoading(false);
            });
        } else {
            alert('예약 데이터 불러오는중입니다.');
        }
    }


    useEffect(() => {
        let uri = API_BASE_URL + "/reserve";
        axios.get(uri)
            .then(response => {
                const { regists, dateCounts, reserveImage } = response.data;

                if (dateCounts && Array.isArray(dateCounts)) {
                    const counts = {};  // 예약 카운트를 저장할 객체
                    dateCounts.forEach((data) => {
                        const formattedDate = moment(data.date).format("YYYY-MM-DD");
                        counts[formattedDate] = data.count;
                    });
                    // 예약 카운트 상태 업데이트
                    setReservationCounts(counts);
                }
                setReserveImage(reserveImage);
                setRegistsData(regists);
            })
            .catch(err => {
                console.log(err);

            })
    }, []);
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
        setShowCalendar(false);
    };

    const toggleCalendar = () => { // 날짜 확인 클릭되고 있음을 알려주는 이벤트
        setShowCalendar((prevShowCalendar) => !prevShowCalendar);
        if (!showCalendar) {
            document.querySelector('.calendar-toggle-button').focus();
        }
    };


    return (
        <div className="reservation-container">
            <div className="reserve_head">
                <h1>체험 예약</h1>
                <p>{registsData.length > 0 ? registsData[0].name : '로딩 중...'}</p>
            </div>
            <section className="reservation">
                <div className="reservation_img">
                    <ReservationImg reserveImage={reserveImage} />
                </div>
                <div className="reservation_calendar">
                    <form onSubmit={(event) => event.preventDefault()}>

                        {/* 우즉 예약 버튼 위치 */}
                        <div className="calendar-toggle">

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
                                </ul>
                            </div>
                            <div className="personPrice">
                                {registsData && registsData.length > 0 ? (
                                    <p> 청소년: {registsData[0].teenager} ₩ 성인: {registsData[0].adult} ₩</p>
                                ) : (
                                    <p>로딩 중...</p>
                                )}
                            </div>
                            <button type="button" onClick={onClickPay} className="calendar-toggle-submit" disabled={loading}>
                                {loading ? "처리 중..." : "예약하기"}
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
                    <ReservationIntro regists={registsData} />
                </div>
            </section>
            <section className="reservation_detail">

                <ReservationDeatil regists={{ registsData, reserveImage }} />
            </section>
        </div>
    );
};

export default Reservation;
