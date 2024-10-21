import '../../../css/mypage/MyPageUser.css';

import React, { useState } from 'react';
import axios from 'axios'; // axios 추가
import { API_BASE_URL } from "../../../service/app-config";
import { useForm } from "react-hook-form";

function MyPageSet({ userMain }) {



    const { register, toSubmit, getValues, formState: { isSubmitting, isSubmitted, errors } }
        = useForm({
            mode: "onBlur",
            shouldFocusError: true,
            reValidateMode: "onChange",
            defaultValues: { email: "", password: "" },
            criteriaMode: "all",
        })



    const [userInfo, setUserInfo] = useState(userMain);

    // userMain에 대한 data 해체+분해 : phoneNumber
    const [phoneParts, setPhoneParts] = useState(userInfo.phoneNumber.split('-'));

    // 전화번호 입력 처리
    const handlePhoneChange = (index, value) => {
        const updatedPhoneParts = [...phoneParts];
        updatedPhoneParts[index] = value;
        setPhoneParts(updatedPhoneParts);
    };



    // userMain에 대한 data 해체+분해 : email
    const [emailParts, setEmailParts] = useState(userInfo.email.split('@'));

    // select 옵션 변경 처리
    const [emailDisabled, setEmailDisabled] = useState(false);
    const handleEmailSelectChange = (e) => {
        const updatedEmailParts = [...emailParts];
        const selectedValue = e.target.value;
        if (selectedValue === 'type') {
            // "직접 입력"을 선택하면 뒷부분을 빈 값으로 설정
            updatedEmailParts[1] = '';
            setEmailDisabled(false);
        } else {
            // 선택한 도메인으로 뒷부분 설정
            updatedEmailParts[1] = selectedValue;
            setEmailDisabled(true);
        }
        setEmailParts(updatedEmailParts);
    };

    // 이메일 입력 처리 (뒷부분도 직접 입력 가능하도록)
    const handleEmailChange = (index, value) => {
        const updatedEmailParts = [...emailParts];
        updatedEmailParts[index] = value;
        setEmailParts(updatedEmailParts);
    };



    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작을 막음

        const token = JSON.parse(sessionStorage.getItem("userData"));

        try {
            const updatedUserInfo = {
                ...userInfo,
                phoneNumber: phoneParts.join('-'),
                email: emailParts.join('@'),
            };

            const response = await axios.patch(`${API_BASE_URL}/mypage/set`, updatedUserInfo, {
                headers: {
                    'Authorization': `Bearer ${token}`, // 필요한 경우 토큰 추가
                    'Content-Type': 'application/json',
                },
            });

            // alert("개인정보 수정 성공");
            window.location.href = '/mypage';
        } catch (error) {
            // console.error('Error:', error.response);
            alert("수정 실패");
        }
    };



    return (
        <form className='MyPageSet' method="patch" onSubmit={handleSubmit} >
            <div className='MyInfoList'>
                <div className='ListTitle'>아이디</div>
                <div>{userInfo.userId}</div>

                <div className='ListTitle'>이름</div>
                <div>{userInfo.name} ({userInfo.gender})</div>

                <div className='ListTitle'>생일</div>
                <div>{userInfo.birthDate}</div>

                <div className='ListTitle'>전화번호</div>
                <div>
                    <input className="MyPagePhoneInput"
                        type="text"
                        value={phoneParts[0]}
                        onChange={(e) => handlePhoneChange(0, e.target.value)} // 앞자리
                        minLength={3} maxLength={3}
                    />
                    <span>&nbsp;-&nbsp;</span>
                    <input className="MyPagePhoneInput"
                        type="text"
                        value={phoneParts[1]}
                        onChange={(e) => handlePhoneChange(1, e.target.value)} // 중간자리
                        minLength={3} maxLength={4}
                    />
                    <span>&nbsp;-&nbsp;</span>
                    <input className="MyPagePhoneInput"
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
                        value={emailParts[0]}
                        onChange={(e) => handleEmailChange(0, e.target.value)}
                        placeholder={userInfo.email}
                    />
                    <span>&nbsp;@&nbsp;</span>
                    <input
                        type="text"
                        value={emailParts[1]}
                        onChange={(e) => handleEmailChange(1, e.target.value)}
                        disabled={emailDisabled}
                    />
                    <span> </span>
                    <select id="EmailList" onChange={handleEmailSelectChange}>
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
