import '../../css/mypage/MyPageMain.css';

// import userInfo from "../login/UserInforData";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

function MyPageSet() {

    const user = JSON.parse(sessionStorage.getItem("LoginUserInfo"));

    const [emailDisabled, setEmailDisabled] = useState(false);      // 이메일 직접입력 칸 활성화
    const handleEmailChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue !== "type") {
            setEmailType(selectedValue);
            setEmailDisabled(true);
        } else {
            setEmailType('');
            setEmailDisabled(false);
        }
    };

    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [emailType, setEmailType] = useState('');
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [address, setAddress] = useState('')
    const [addressDetail, setAddressDetail] = useState('');

    const navigate = useNavigate();     // 버튼으로 링크 이동

    const handleSubmit = async (e) => {     // 버튼으로 sessionstorage에 데이터 저장 로직
        e.preventDefault();

        if (password !== passwordConfirm) {     // 비밀번호 확인 절차
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 업데이트된 사용자 정보
        const updatedUser = {
            ...user,
            phoneNumber: phoneNumber || user.phoneNumber,       // 빈값이 저장되지 않도록 함
            email: email || user.email,
            emailType: emailType || user.emailType,
            password: password || user.password,
            addressDetail: addressDetail || user.addressDetail
        };

        sessionStorage.setItem("LoginUserInfo", JSON.stringify(updatedUser));       // 변경값 sessionsotrage에 저장

        navigate('/mypage');        // 버튼 이동 경로 지정(마이페이지)

    };



    return (
        <form className='MyPageSet' onSubmit={handleSubmit}>
            <div className='MyInfoList'>
                <div className='ListTitle'>이름</div>
                <div>{user.name} ({user.gender})</div>

                <div className='ListTitle'>생일</div>
                <div>{user.birth}</div>

                <div className='ListTitle'>전화번호</div>
                <div>
                    <input
                        type="number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder='전화번호 입력'
                    />
                </div>

                <div className='ListTitle'>이메일</div>
                <div>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='이메일 입력'
                    />
                    <span> @ </span>
                    <input
                        type="text"
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
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='비밀번호 변경'
                    />
                </div>
                <div></div>
                <div>
                    <input
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        placeholder='비밀번호 확인'
                    />
                </div>

                <div className='ListTitle'>주소</div>
                <div>
                    <input type='text' value={address} disabled />
                    <button>우편 번호 검색</button>
                </div>
                <div></div>
                <div>
                    <input
                        type="text"
                        value={addressDetail}
                        onChange={(e) => setAddressDetail(e.target.value)}
                        placeholder='상세 주소 입력'
                    />
                </div>
            </div>

            <button className='MyInfoSave' type='submit'>수정 완료</button>
        </form>
    )
}

export default MyPageSet;
