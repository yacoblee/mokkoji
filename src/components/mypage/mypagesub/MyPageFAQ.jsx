import '../../../css/mypage/subpage/MyPageFAQ.css';

function MyPageFAQ() {
    return (

        <div className='MyPageFAQ'>
            <div className='PrivateFAQ'>
                <h2>개인 문의</h2>
                <textarea></textarea>
                <button>제출</button>
            </div>

            <div className='BusinessFAQ'>
                <h2>비즈니스 문의</h2>
                <textarea></textarea>
                <button>제출</button>
            </div>
        </div>
    )
}

export default MyPageFAQ;
