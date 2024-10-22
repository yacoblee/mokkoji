import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from "../../../service/app-config";
import moment from 'moment';
import Calendar from 'react-calendar';
import ReserveObject from '../../Reserve/ReserveObject';

import '../../../css/mypage/subpage/MyPageBook.css';

function MyPageBook({ myPageRegist, userRegist, bookUpdateAdult, bookUpdateTeen, bookDelete }) {

    const [showCalendar, setShowCalendar] = useState(false);
    const [date, setDate] = useState(new Date());
    const today = new Date(); // 오늘 날짜
    const oneMonthLater = moment(today).add(1, 'months').toDate();
    const [reservationCounts, setReservationCounts] = useState({});

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
            document.querySelector('.SelectDateChangeButton').focus();
        }
    };



    useEffect(() => {
        myPageRegist("/mypage/book")
    }, [])



    return (
        <>
            {userRegist.length === 0 ?
                (
                    <div className='TextNoItems'>
                        <h2>예약 목록이 존재하지 않습니다.</h2>
                        <div>
                            <Link to='/reserve'>
                                체험활동 둘러보러 가기
                            </Link>
                        </div>
                    </div>
                ) :
                (
                    <div>
                        {userRegist.map((regist) => (
                            <table className='BookTableList' key={regist.registId}>
                                <tr>
                                    <td className='BookImageCell' rowSpan={2}>
                                        <img src={`${API_BASE_URL}/resources/reserveImages/${regist.imageName}`} alt={regist.name} />
                                    </td>
                                    <td rowSpan={2}>{regist.name}</td>
                                    <td>성인</td>
                                    <td>청소년</td>
                                    <td rowSpan={2}>총 금액 : {regist.registCnt}</td>
                                    <td>예약 일자 : {moment(date).format("YYYY-MM-DD")} </td>
                                    <td rowSpan={2}>
                                        <button className='SelectDeleteButton' onClick={() => { bookDelete(`/mypage/${regist.registId}`) }}>
                                            삭제
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='MyCartCount'>
                                            <div className='MyProductCount'>
                                                <img
                                                    src="/images/buy/minus.png"
                                                    alt="minus"
                                                    onClick={() =>
                                                        regist.adultCnt === 1
                                                            ? alert('성인 수는 1보다 적을 수 없습니다.')
                                                            : bookUpdateAdult(`/mypage/adult/${regist.registId}/${regist.adultCnt - 1}`)
                                                    }
                                                />
                                                <input type="text" min={1} value={regist.adultCnt} />
                                                <img
                                                    src="/images/buy/plus.png"
                                                    alt="plus"
                                                    onClick={() => {
                                                        if ((regist.adultCnt + regist.teenagerCnt) >= 25) { // 활동에 따른 최대 인원수를 DTO로 가져와도 될듯?
                                                            alert("최대 인원은 25인입니다.")
                                                        } else {
                                                            bookUpdateAdult(`/mypage/adult/${regist.registId}/${regist.adultCnt + 1}`)
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='MyCartCount'>
                                            <div className='MyProductCount'>
                                                <img
                                                    src="/images/buy/minus.png"
                                                    alt="minus"
                                                    onClick={() =>
                                                        regist.teenagerCnt === 1
                                                            ? alert('청소년 수는 1보다 적을 수 없습니다.')
                                                            : bookUpdateTeen(`/mypage/teen/${regist.registId}/${regist.teenagerCnt - 1}`)
                                                    }
                                                />
                                                <input type="text" min={1} value={regist.teenagerCnt} />
                                                <img
                                                    src="/images/buy/plus.png"
                                                    alt="plus"
                                                    onClick={() => {
                                                        if ((regist.adultCnt + regist.teenagerCnt) >= 25) {
                                                            alert("최대 인원은 25인입니다.")
                                                        } else {
                                                            bookUpdateTeen(`/mypage/teen/${regist.registId}/${regist.teenagerCnt + 1}`)
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <button type="button" onClick={toggleCalendar} className="SelectDateChangeButton">
                                            날짜 변경
                                        </button>
                                    </td>
                                </tr>
                            </table>
                        ))}

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
                    </div >
                )
            }
        </> // 삼항식
    );  //return

}

export default MyPageBook;
