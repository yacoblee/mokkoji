import '../../css/mypage/MyPageMain.css';

import userInfo from "../login/UserInforData";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MyPageSet() {

    const user = userInfo[0];   // 임의 지정

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
                <div className='ListTitle'>이름</div>
                <div>{user.name}</div>

                <div className='ListTitle'>생일</div>
                <div>{user.birth}</div>

                <div className='ListTitle'>전화번호</div>
                <div>
                    <input type="tel" placeholder='전화번호 입력' />
                </div>

                <div className='ListTitle'>이메일</div>
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

                <div className='ListTitle'>아이디</div>
                <div>{user.id}</div>

                <div className='ListTitle'>비밀번호</div>
                <div>
                    <input type="password" placeholder='비밀번호 변경' />
                </div>
                <div></div>
                <div>
                    <input type="password" placeholder='비밀번호 확인' />
                </div>

                <div className='ListTitle'>주소</div>
                <div>
                    <input type="text" />
                </div>
                <div></div>
                <div>
                    <input type="text" placeholder='상세 주소 입력' />
                </div>
            </div>

            <Link to='/mypage'>
                <button className='MyInfoSave'>수정 완료</button>
            </Link>
        </div>
    )
}

export default MyPageSet;
