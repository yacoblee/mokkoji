import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../../css/mypage/subpage/MyPageBook.css';

function MyPageBook({ change, setChange }) {

    const userData = JSON.parse(sessionStorage.getItem("LoginUserInfo"));

    const [user, setUser] = useState(userData)

    console.log(user.mypage.Reservation);


    // 어른 인원수 변경 로직
    const changeAdultCount = (date, variation) => {
        const newReservation = user.mypage.Reservation.map((item) => {
            if (item.date === date) {

                if (variation === 'decrease') {
                    if (item.adult === 1)
                        alert('성인의 동행이 필요한 활동입니다.');
                    else
                        item.adult = item.adult - 1;
                } else if (variation === 'increase')
                    item.adult = item.adult + 1
            }
            return item;

        }   // Reservation.map
        )   // newReservation

        const updatedUser = {
            ...user,
            mypage: {
                ...user.mypage,
                Reservation: newReservation
            }
        };

        setUser(updatedUser);

    }   // changeAdultCount


    // 청소년 인원수 변경 로직
    const changeTeenCount = (date, variation) => {
        const newReservation = user.mypage.Reservation.map((item) => {
            if (item.date === date) {

                if (variation === 'decrease') {
                    if (item.teenager === 0)
                        alert('인원 수가 음수가 되어서는 안됩니다.');
                    else
                        item.teenager = item.teenager - 1;
                } else if (variation === 'increase')
                    item.teenager = item.teenager + 1
            }
            return item;
        }   // Reservation.map
        )   // newReservation

        const updatedUser = {
            ...user,
            mypage: {
                ...user.mypage,
                Reservation: newReservation
            }
        };

        setUser(updatedUser);

    }   // changeTeenCount


    // 버튼으로 sessionStorage 덮어쓰기
    const handleSubmit = () => {
        sessionStorage.setItem("LoginUserInfo", JSON.stringify(user));

        alert('예약 내역이 수정되었습니다.')
    }


    // 삭제 버튼 로직(날짜만 비교, 추후 조건 추가 해야함)
    const handleDelete = (date) => {        // 해당 날짜가 없어진 새로운 예약 배열을 생성
        const newBooks = user.mypage.Reservation.filter((item) =>
            // item.reserveItem !== id && item.date !== date
            date !== item.date
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



    // 이 아래로 checkbox 전체선택 + 선택 상품 삭제 로직(진행중: 체크된 id값이 매번 갱신되는 문제 있음=최근 체크한 1개만 삭제됨)





    return (

        <div className='MyPageBook'>
            <div className='BookHeader'>
                <div>
                    <input
                        type="checkbox"
                    // onChange={}
                    // checked={}
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
                                        // checked={ }
                                        // onChange={ }
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
                                        <button className='buttonChange' onClick={() => handleSubmit()}>예약 수정</button>
                                        <button onClick={() => handleDelete(book.date)}>예약 취소</button>
                                    </div>
                                </div>
                            )
                        }))}


            <div className='BookFooter'>
                <div>
                    <input
                        type="checkbox"
                    // onChange={}
                    // checked={}
                    />
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                    <button
                        className='SelectDeleteButton'
                    // onClick={}
                    >
                        선택 취소
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MyPageBook;
