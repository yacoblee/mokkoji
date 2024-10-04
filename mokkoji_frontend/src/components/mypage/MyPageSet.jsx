import '../../css/mypage/MyPageUser.css';

import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal'
import DaumPostcode from 'react-daum-postcode';


function MyPageSet({ userMain }) {

    // userMain에 대한 data 해체+분해 : phoneNumber
    const [phoneParts, setPhoneParts] = useState(userMain.phoneNumber.split('-'));

    // userMain에 대한 data 해체+분해 : email
    const [emailParts, setEmailParts] = useState(userMain.email.split('@'));

    // 전화번호 입력 처리
    const handlePhoneChange = (index, value) => {
        const updatedPhoneParts = [...phoneParts];
        updatedPhoneParts[index] = value;
        setPhoneParts(updatedPhoneParts);
    };

    // 이메일 입력 처리
    const handleEmailChange = (index, value) => {
        const updatedEmailParts = [...emailParts];
        updatedEmailParts[index] = value;
        setEmailParts(updatedEmailParts);
    };

    // select 옵션 변경 처리
    const handleEmailSelectChange = (e) => {
        const updatedEmailParts = [...emailParts];
        updatedEmailParts[1] = e.target.value; // 선택한 도메인으로 뒷부분 설정
        setEmailParts(updatedEmailParts);
    };



    return (
        <form className='MyPageSet' method="post" >
            <div className='MyInfoList'>
                <div className='ListTitle'>아이디</div>
                <div>{userMain.userId}</div>

                <div className='ListTitle'>비밀번호</div>
                <div>따로 제작 필요</div>

                <div></div>
                <div>따로 제작 필요(비번 확인)</div>


                <div className='ListTitle'>이름</div>
                <div>{userMain.name} ({userMain.gender})</div>

                <div className='ListTitle'>생일</div>
                <div>{userMain.birthDate}</div>

                <div className='ListTitle'>전화번호</div>
                <div>
                    <input
                        type="text"
                        value={phoneParts[0]}
                        onChange={(e) => handlePhoneChange(0, e.target.value)} // 앞자리
                        minLength={3} maxLength={3}
                    />
                    <span>&nbsp;-&nbsp;</span>
                    <input
                        type="text"
                        value={phoneParts[1]}
                        onChange={(e) => handlePhoneChange(1, e.target.value)} // 중간자리
                        minLength={3} maxLength={4}
                    />
                    <span>&nbsp;-&nbsp;</span>
                    <input
                        type="text"
                        value={phoneParts[2]}
                        onChange={(e) => handlePhoneChange(2, e.target.value)} // 뒷자리
                        minLength={4} maxLength={4}
                    />
                </div>

                <div className='ListTitle'>이메일</div>
                <div>
                    <input
                        type="text"
                        value={emailParts[0]} // 이메일 앞부분
                        onChange={(e) => handleEmailChange(0, e.target.value)} // 이메일 앞부분 처리
                    />
                    <span>&nbsp;@&nbsp;</span>
                    <input
                        type="text"
                        value={emailParts[1]}
                    />
                    &nbsp;
                    <select id="EmailList" value={emailParts[1] === '' ? 'type' : emailParts[1]} onChange={handleEmailSelectChange} >
                        <option value="type">직접 입력</option>
                        <option value="naver.com">naver.com</option>
                        <option value="google.com">google.com</option>
                        <option value="hanmail.net">hanmail.net</option>
                        <option value="nate.com">nate.com</option>
                        <option value="kakao.com">kakao.com</option>
                    </select>
                </div>


            </div>

            <button className='MyInfoSave' type='submit'>수정 완료</button>

        </form>
    )
}

export default MyPageSet;
