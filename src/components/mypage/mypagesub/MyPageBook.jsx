import { useState } from 'react';
import '../../../css/mypage/subpage/MyPageBook.css';

function MyPageBook({ change, setChange }) {

    const userData = JSON.parse(sessionStorage.getItem("LoginUserInfo"));

    const [user, setUser] = useState(userData)

    // 어른 인원수 변경 로직
    const changeAdultCount = (date, variation) => {
        const newReservation = user.mypage.Reservation.map((item) => {
            if (item.date === date) {

                // console.log(`확인 처음 개수 ${item.quantity.contentSelect}`)
                // console.log(`확인 아이템 ${item.productId}`)
                // console.log(`확인 명령 ${variation}`)

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

        const updatedMypage = {
            ...user.mypage,
            Reservation: newReservation
        }

        const updatedUser = {
            ...user,
            mypage: updatedMypage
        }

        console.log(`${JSON.stringify(updatedUser)}`)
        sessionStorage.setItem("LoginUserInfo", JSON.stringify(updatedUser));

        setUser(updatedUser);
    }   // changeAdultCount

    // 청소년 인원수 변경 로직
    const changeTeenCount = (date, variation) => {
        const newReservation = user.mypage.Reservation.map((item) => {
            if (item.date === date) {

                // console.log(`확인 처음 개수 ${item.quantity.packagingSelect}`)
                // console.log(`확인 아이템 ${item.productId}`)
                // console.log(`확인 명령 ${variation}`)

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

        const updatedMypage = {
            ...user.mypage,
            Reservation: newReservation
        }

        const updatedUser = {
            ...user,
            mypage: updatedMypage
        }

        console.log(`${JSON.stringify(updatedUser)}`)
        sessionStorage.setItem("LoginUserInfo", JSON.stringify(updatedUser));

        setUser(updatedUser);
    }   // changeTeenCount


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


    return (

        <div className='MyPageBook'>
            <div className='BookHeader'>
                <div>
                    <input type="checkbox" />
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            {user.mypage.Reservation
                .slice()    // 원본 배열을 변경하지 않기 위해 복사본 생성
                .sort((a, b) => new Date(b.date) - new Date(a.date))    // date를 기준으로 내림차순 정렬
                .map((book) => {
                    console.log(book.date)
                    return (
                        <div className='BookGrid' key={book.date}>
                            <div className='CheckBook'>
                                <input type="checkbox" />
                            </div>
                            <div className='BookName'>
                                <h3>{book.name}</h3>
                            </div>
                            <div className='BookDate'>
                                <h4>{book.date}</h4>
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
                                <button className='buttonChange'>무슨버튼</button>
                                <button onClick={() => handleDelete(book.date)}>삭제</button>
                            </div>
                        </div>
                    )
                })}


            <div className='BookFooter'>
                <div>
                    <input type="checkbox" />
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                    <button className='SelectDeleteButton'>선택 삭제</button>
                </div>
            </div>
        </div>
    )
}

export default MyPageBook;
