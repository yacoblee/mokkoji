import '../../css/mypage/MyPageMain.css';

// import userInfo from "../login/UserInforData";

import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from 'react-modal'
import DaumPostcode from 'react-daum-postcode';

// import axios from 'axios';

function MyPageSet() {

    const userData = JSON.parse(sessionStorage.getItem("LoginUserInfo"));

    const navigate = useNavigate();     // 버튼으로 링크 이동

    const [user, setUser] = useState(userData);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [emailType, setEmailType] = useState('');
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [address, setAddress] = useState('')
    const [addressDetail, setAddressDetail] = useState('');
    const [zoneCode, setZoneCode] = useState()


    //모달 상태창에 대한 true , false
    const [isModalOpen, setIsModalOpen] = useState(false);


    //모달창 오픈
    const openAddress = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };


    //모달창에서 클릭하고 나면 , 값을 가지고 userInfo에 저장 -> value 값으로 전송. / 모달창 닫음.
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setUser((info) => ({
            ...info,
            zoneCode: data.zonecode,
            address: fullAddress
        }));
        setIsModalOpen(false);
    };


    // 이메일 타입 '직접 입력'시에만 작성이 활성화되기 위한 로직
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
    };



    // 업데이트된 사용자 정보 저장
    const updatedUser = {
        ...user,
        phoneNumber: phoneNumber || user.phoneNumber,       // 빈값이 저장되지 않도록 함
        email: email || user.email,
        emailType: emailType || user.emailType,
        password: password || user.password,
        addressDetail: addressDetail || user.addressDetail,
        zoneCode: zoneCode || user.zoneCode
    };


    const handleSubmit = async (e) => {     // 버튼으로 sessionstorage에 데이터 저장 로직
        e.preventDefault();

        // 비밀번호 확인하는 절차
        if (password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        sessionStorage.setItem("LoginUserInfo", JSON.stringify(updatedUser));       // 변경값 sessionsotrage에 저장

        navigate('/mypage');        // 버튼 이동 경로 지정(마이페이지)

    };

    const [errorMessagePhone, setErrorMessagePhone] = useState('');
    const [errorMessagePW, setErrorMessagePW] = useState('');
    const [errorMessagePWC, setErrorMessagePWC] = useState('');

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
                        type="text"
                        value={phoneNumber}
                        onChange={(num) => {
                            // 입력된 값이 숫자만 포함하는지 정규식으로 검사
                            if (/^\d$/.test(num.target.value)) {
                                // 숫자만 포함하면 phoneNumber state 업데이트
                                setPhoneNumber(num.target.value);
                                setErrorMessagePhone(''); // 오류 메시지 초기화
                            } else
                                setErrorMessagePhone('전화번호 형식이 올바르지 않습니다'); // 오류 메시지 설정
                        }}
                        placeholder={user.phoneNumber}
                    />
                    {errorMessagePhone && <span style={{ color: 'red', fontSize: '15px' }}>{errorMessagePhone}</span>}
                </div>

                <div className='ListTitle'>이메일</div>
                <div>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={user.email}
                    />
                    <span> @ </span>
                    <input
                        type="text"
                        value={emailType}
                        onChange={(e) => setEmailType(e.target.value)}
                        disabled={emailDisabled}
                    />
                    <span> </span>
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
                        onChange={(pw) => {
                            if (/[a-z.0-9.!-*.@]$/.test(pw.target.value)) {
                                setPassword(pw.target.value);
                                setErrorMessagePW(''); // 오류 메시지 초기화
                            } else
                                setErrorMessagePW('비밀번호 형식이 올바르지 않습니다'); // 오류 메시지 설정
                        }}
                        placeholder={'비밀번호 변경'}
                    />
                    {errorMessagePW && <span style={{ color: 'red', fontSize: '15px' }}>{errorMessagePW}</span>}
                </div>

                <div></div>
                <div>
                    <input
                        type="password"
                        value={passwordConfirm}
                        onChange={(pwc) => {
                            if (/[a-z.0-9.!-*.@]$/.test(pwc.target.value)) {
                                setPasswordConfirm(pwc.target.value);
                                setErrorMessagePWC(''); // 오류 메시지 초기화
                            } else
                                setErrorMessagePWC('비밀번호 형식이 올바르지 않습니다'); // 오류 메시지 설정
                        }}
                        placeholder={'비밀번호 확인'}
                    />
                    {errorMessagePWC && <span style={{ color: 'red', fontSize: '15px' }}>{errorMessagePWC}</span>}
                </div>

                <div className='ListTitle'>주소</div>
                <div>
                    <input
                        type='text'
                        value={setZoneCode}
                        maxLength={5}
                        placeholder={user.zoneCode}
                        readOnly
                    />
                    <button
                        type='button
                        'onClick={openAddress}
                    >
                        우편 번호 검색
                    </button>
                </div>
                <div></div>
                <div>
                    <input
                        className='InputAddress'
                        type="text"
                        value={setAddress}
                        placeholder={user.address}
                        readOnly
                    />
                </div>
                <div></div>
                <div>
                    <input
                        className='InputAddressDetail'
                        type="text"
                        value={addressDetail}
                        onChange={(e) => setAddressDetail(e.target.value)}
                        placeholder={user.addressDetail} />
                </div>
            </div>

            <button className='MyInfoSave' type='submit'>수정 완료</button>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="주소 검색"
                style={{
                    content: {
                        width: '500px',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <button
                    className='modalbtn'
                    onClick={() => setIsModalOpen(false)}
                >
                    X
                </button>
                <DaumPostcode onComplete={handleComplete} />
            </Modal>
        </form>
    )
}

export default MyPageSet;
