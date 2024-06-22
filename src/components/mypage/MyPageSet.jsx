import '../../css/mypage/MyPageMain.css';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MyPageSet() {

    const [emailType, setEmailType] = useState('');
    const [emailDisabled, setEmailDisabled] = useState(false);

    const handleEmailChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue !== "type") {
            setEmailType(selectedValue);
            setEmailDisabled(true);
        } else {
            setEmailType('');
            setEmailDisabled(false);
        }
    }

    return (
        <div className='MyPageSet'>
            <div className='MyInfoList'>
                <div>이름</div>
                <div>이름 못바꿈 Data에서 이름값 갖고옴</div>

                <div>생일</div>
                <div>생일 못바꿈 Data에서 생일 갖고옴</div>

                <div>전화번호</div>
                <div>(전화번호)</div>

                <div>이메일</div>
                <div>
                    <input type="text" placeholder='이메일 입력' />
                    @
                    <input
                        type="text"
                        id="EmailType"
                        value={emailType}
                        onChange={(e) => setEmailType(e.target.value)}
                        disabled={emailDisabled}
                    />
                    <select id="EmailList" onChange={handleEmailChange}>
                        <option value="type">직접 입력</option>
                        <option value="naver.com">naver.com</option>
                        <option value="google.com">google.com</option>
                        <option value="hanmail.net">hanmail.net</option>
                        <option value="nate.com">nate.com</option>
                        <option value="kakao.com">kakao.com</option>
                    </select>
                </div>

                <div>아이디</div>
                <div>
                    아이디 못바꿈 Data에서 아이디값 갖고오기
                </div>

                <div>비밀번호</div>
                <div>
                    <input type="password" />
                </div>
                <div>비번 확인</div>
                <div>
                    <input type="password" />
                </div>

                <div>주소</div>
                <div>(주소) 옆에 주소 API</div>
                <div>상세주소</div>
                <div>
                    <input type="text" />
                </div>
            </div>

            <Link to='/mypage'>
                <button className='MyInfoSave'>수정 완료</button>
            </Link>
        </div>
    )
}

export default MyPageSet;
