import '../../../css/mypage/subpage/MyPageBook.css';

function MyPageBook() {

    const user = JSON.parse(sessionStorage.getItem("LoginUserInfo"));



    return (

        <div className='MyPageBook'>
            <div className='BookHeader'>
                <div>체크박스</div>
                <div>활동내역</div>
                <div>활동일자</div>
                <div>인원구성/수정</div>
                <div>삭제</div>
            </div>

            <div className='BookGrid'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div className='BookFooter'>
                <div>체크박스</div>
                <div>활동내역</div>
                <div>활동일자</div>
                <div>인원구성/수정</div>
                <div>삭제</div>
            </div>
        </div>
    )
}

export default MyPageBook;
