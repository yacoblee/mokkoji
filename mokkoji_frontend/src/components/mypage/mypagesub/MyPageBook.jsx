import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../../css/mypage/subpage/MyPageBook.css';

function MyPageBook({ change, setChange }) {

    const currentUser = JSON.parse(sessionStorage.getItem("LoginUserInfo"));

    const [user, setUser] = useState(currentUser)


    // 어른 인원수 변경 로직
    const changeAdultCount = (date, variation) => {
        const newReservation1 = user.mypage.Reservation.map((item) => {
            if (item.date === date) {

                if (variation === 'decrease') {
                    if (item.adult + item.teenager === 1)
                        alert('최소 1명의 참가자가 있어야합니다.');
                    else if (item.adult === 0) { }
                    else
                        item.adult = item.adult - 1;
                }

                else if (variation === 'increase') {
                    if (item.adult + item.teenager === 25)
                        alert('25명까지 참여 가능합니다')
                    else
                        item.adult = item.adult + 1
                }

            }
            return item;

        }   // Reservation.map
        )   // newReservation1

        const updatedUser1 = {
            ...user,
            mypage: {
                ...user.mypage,
                Reservation: newReservation1
            }
        };

        setUser(updatedUser1);

    }   // changeAdultCount


    // 청소년 인원수 변경 로직
    const changeTeenCount = (date, variation) => {
        const newReservation2 = user.mypage.Reservation.map((item) => {
            if (item.date === date) {

                if (variation === 'decrease') {
                    if (item.adult + item.teenager === 1)
                        alert('최소 1명의 참가자가 있어야합니다.');
                    else if (item.teenager === 0) { }
                    else
                        item.teenager = item.teenager - 1;
                }

                else if (variation === 'increase') {
                    if (item.adult + item.teenager === 25)
                        alert('25명까지 참여 가능합니다')
                    else
                        item.teenager = item.teenager + 1
                }
            }
            return item;
        }   // Reservation.map
        )   // newReservation2

        const updatedUser2 = {
            ...user,
            mypage: {
                ...user.mypage,
                Reservation: newReservation2
            }
        };

        setUser(updatedUser2);

    }   // changeTeenCount


    // 버튼으로 sessionStorage 덮어쓰기
    const handleSubmit = (day) => {

        // 업데이트된 예약 배열을 저장할 변수
        let updatebook = [];

        user.mypage.Reservation.forEach((latest) => {
            if (latest.date !== day) {
                const first = currentUser.mypage.Reservation.find(res => res.date === latest.date);
                updatebook.push(first);
            } else {
                updatebook.push(latest);
            }
        })
        const updateMyPage = {
            ...user.mypage,
            Reservation: updatebook
        }
        const updateUser = {
            ...user,
            mypage: updateMyPage
        }
        // const userDataadult = currentUser.mypage.Reservation[0].adult;
        // const userDatateenager = currentUser.mypage.Reservation[0].teenager;
        // const updateUseradult = user.mypage.Reservation[0].adult;
        // const updateUserteenager = user.mypage.Reservation[0].teenager;

        // console.log('세션 어른' +userDataadult)
        // console.log('세션 아이 '+userDatateenager)
        // console.log('state 어른 '+updateUseradult)
        // console.log('state 아이 '+updateUserteenager)

        // if((userDataadult===updateUseradult)&& (userDatateenager===updateUserteenager)){
        //     alert('변동 사항이 없습니다.')
        //     return false;
        // }
        // console.log(currentUser.mypage.Reservation[0]);
        // console.log(updateUser.mypage.Reservation[0]);


        alert('예약 내역이 수정되었습니다.')
        sessionStorage.setItem("LoginUserInfo", JSON.stringify(updateUser));
        setUser(updateUser);
    }


    // 삭제 버튼 로직(날짜만 비교, 추후 조건 추가 해야함)
    const handleDelete = (day) => {        // 해당 날짜가 없어진 새로운 예약 배열을 생성
        const newBooks = user.mypage.Reservation.filter((item) =>
            // item.reserveItem !== id && item.date !== date
            day !== item.date
        )
        let newMyPage = {
            ...user.mypage,
            Reservation: newBooks
        }
        let newUser = {
            ...user,
            mypage: newMyPage
        };

        sessionStorage.setItem("LoginUserInfo", JSON.stringify(newUser));
        setUser(newUser);
        setChange(!change);     // MyPageIndex에 대한 전체 렌더링
    }   // handleDelete



    // 전체 선택, id값을 체크 배열에 넣는 로직
    const [checkedBook, setCheckedBook] = useState([]);

    const handleCheckBook = (date) => {
        setCheckedBook(prechecked => prechecked.includes(date) ? prechecked.filter(bookDay => bookDay !== date) : [...prechecked, date])
    }

    const handleCheckAll = (e) => {
        if (e.target.checked) {
            setCheckedBook(user.mypage.Reservation.map(book => book.date));
        } else {
            setCheckedBook([]);
        }

    };

    // 선택 삭제 로직
    const onCheckedDelete = () => {
        if (checkedBook.length === 0) {
            alert('선택된 상품이 존재하지 않습니다.');
            return; // 함수 종료
        }
        let newReserve = user.mypage.Reservation.filter((reserve) => {
            return !checkedBook.includes(reserve.date)
        })  // newReserve
        let newMyPage = {
            ...user.mypage,
            Reservation: newReserve
        }
        let newUser = {
            ...user,
            mypage: newMyPage
        }

        sessionStorage.setItem("LoginUserInfo", JSON.stringify(newUser))
        setUser(newUser);
        setCheckedBook([])
        setChange(!change);     // MyPageIndex에 대한 전체 렌더링
    }




    return (

        <div className='MyPageBook'>
            <div className='BookHeader'>
                <div>
                    <input
                        type="checkbox"
                        onChange={handleCheckAll}
                        checked={user.mypage.Reservation.length > 0 && checkedBook.length === user.mypage.Reservation.length && user.mypage.Reservation.length !== 0}
                    />
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            {user.mypage.Reservation.length === 0 ?
                (
                    <div className='TextNoItems'>
                        <h2>예약된 활동이 존재하지 않습니다.</h2>
                        <div>
                            <Link to='/reserve'>
                                체험활동 둘러보러 가기
                            </Link>
                        </div>
                    </div>
                ) :
                (
                    user.mypage.Reservation
                        .slice()    // 원본 배열을 변경하지 않기 위해 복사본 생성
                        .sort((a, b) => new Date(b.date) - new Date(a.date))    // date를 기준으로 내림차순 정렬
                        .map((book) => {
                            return (
                                <div className='BookGrid' key={book.date}>
                                    <div className='CheckBook'>
                                        <input
                                            type="checkbox"
                                            checked={checkedBook.includes(book.date)}
                                            onChange={() => handleCheckBook(book.date)}
                                        />
                                    </div>
                                    <div className='BookName'>
                                        <h4>{book.name}</h4>
                                    </div>
                                    <div className='BookDate'>
                                        <h5>{book.date}</h5>
                                    </div>
                                    <div className='PersonCount'>
                                        <div>성인</div>
                                        <div className='AdultCount'>
                                            <img src="/images/buy/minus.png" onClick={() => changeAdultCount(book.date, 'decrease')} />
                                            <input type="text" value={book.adult} />
                                            <img src="/images/buy/plus.png" onClick={() => changeAdultCount(book.date, 'increase')} />
                                        </div>
                                        <div>청소년</div>
                                        <div className='TeenCount'>
                                            <img src="/images/buy/minus.png" onClick={() => changeTeenCount(book.date, 'decrease')} />
                                            <input type="text" value={book.teenager} />
                                            <img src="/images/buy/plus.png" onClick={() => changeTeenCount(book.date, 'increase')} />
                                        </div>
                                    </div>
                                    <div className='BookButton'>
                                        <button className='buttonChange' onClick={() => handleSubmit(book.date)}>예약 수정</button>
                                        <button onClick={() => handleDelete(book.date)}>예약 취소</button>
                                    </div>
                                </div>
                            )
                        }))}


            <div className='BookFooter'>
                <div>
                    <input
                        type="checkbox"
                        onChange={handleCheckAll}
                        checked={user.mypage.Reservation.length > 0 && checkedBook.length === user.mypage.Reservation.length && user.mypage.Reservation.length !== 0}
                    />
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                    <button
                        className='SelectDeleteButton'
                        onClick={onCheckedDelete}
                    >
                        예약 선택 취소
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MyPageBook;
