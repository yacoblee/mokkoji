import '../../css/mypage/MyPageMain.css';

import userInfo from "../login/UserInforData";

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyPageSet() {

    const user = JSON.parse(sessionStorage.getItem("LoginUserInfo"));

    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [emailType, setEmailType] = useState('');
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [addressDetail, setAddressDetail] = useState('');

    const [emailDisabled, setEmailDisabled] = useState(false);

    const history = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호 확인 로직 추가
        if (password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 업데이트된 사용자 정보
        const updatedUser = {
            ...user,
            phoneNumber,
            email,
            emailType,
            password,
            addressDetail
        };

        try {
            // 서버에 업데이트된 정보 저장
            const response = await axios.put('http://your-server-endpoint/api/users', updatedUser);
            console.log("Updated User Response:", response.data);
            // 저장 후 페이지 이동 또는 상태 업데이트 로직 추가
            history.push('/mypage');
        } catch (error) {
            console.error("There was an error updating the user!", error);
        }
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
                    <input />
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

            <Link to='/mypage'>
                <button className='MyInfoSave' type='submit'>수정 완료</button>
            </Link>
        </form>
    )
}

export default MyPageSet;
