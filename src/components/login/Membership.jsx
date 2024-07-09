import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/login/Membership.css';
import Clausearea01 from './Clausearea01'
import Clausearea02 from './Clausearea02';
import Marketing from './Marketing';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import About from './../main/About';
import Background from './../main/Backgroud';
import userInfo from './UserInforData';
import { all } from 'axios';

<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

const Membership = () => {
    // 방법 2.
    // let max = 0;
    // for (let i = 0; i < userInfo.length; i++) {
    //     if (max < userInfo[i].index)
    //         max = userInfo[i].index;
    // }
    // const userDateIndex = max + 1;

    // 가입자 index 구하고, 새로 가입하는 유저의 경우 index값 +1 한 뒤 저장 
    let userDateIndex = 1;

    if (userInfo.length > 0)
        userDateIndex = userInfo[userInfo.length - 1].index + 1;

    // 사용자 입력값 저장 객체
    const formData = useRef({
        index: '',
        name: '',
        zoneCode: '',
        address: '',
        addressDetail: '',
        gender: '',
        phoneNumber: '',
        email: '',
        emailType: '',
        id: '',
        pw: '',
        loginCount: '',
        totalPurchaseCount: '',
        totalPurchaseAmount: '',
        lastLoginDate: '',
        mypage: {
            history: [

            ],
            Reservation: [
                // { reserveItem: '', name: '', date: '', adult: '', teenager: '' },
            ],
            review: '',
            isLike: [],
            basket: [

            ]
        }
    })

    // 사용자 입력값 유효성 검사 후 상태값 저장하는 객체 
    const formErrors = useRef({
        name: "",
        id: "",
        pw: "",
        pwCheck: "",
        address: "",
        zoneCode: "",
        addressDetail: "",
        firstNumber: "",
        secondNumber: "",
        lastNumber: "",
        gender: "",
        email: "",
        emailType: "",
        clausearea: ""
    });

    // useRef 사용으로 인해 랜더링이 발생되지 않아 예외 처리가 불가능 하여, 임의의 stat 생성하여 강제로 랜더링 발생시킴
    const [forceUpdater, forceUpdate] = useState(false);


    //체크박스
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [isChecked, setIsChecked] = useState({
        check1: false,
        check2: false,
        check3: false
    });

    // 개별 체크박스 상태 변경 함수
    const btnCheck = (e) => {
        const { name, checked } = e.target;
        setIsChecked((it) => ({
            ...it,
            [name]: checked
        }));
    }

    // 전체 버튼 상태 변경 함수
    const AllCheck = (e) => {
        const { checked } = e.target;
        setIsAllChecked(checked);
        setIsChecked({
            check1: checked,
            check2: checked,
            check3: checked
        });
    }

    // 전체버튼 선택 여부에 따른 개별 체크박스 상태값 변화, stat에 콜백 실행시 랜더링 시점을 알 수 없어 즉각적인 상태변화가 발생도지 않아 useEffect 사용 
    useEffect(() => {
        const { check1, check2, check3 } = isChecked;
        if (check1 && check2 && check3) {
            setIsAllChecked(true);
            formErrors.current.clausearea = true;
        }
        else if (check1 && check2) {
            setIsAllChecked(false);
            formErrors.current.clausearea = true;
        }
        else {
            formErrors.current.clausearea = false;
            setIsAllChecked(false);
        }
    }, [isChecked]);

    // 필수약관 미동의 시 스크롤 이벤트 통해, 약관에 대한 유효성 검사 실행
    const MoveToTop = () => {
        if (formErrors.current.clausearea === false) {
            alert('⚠️ 필수 약관에 동의 하지 않은 경우 회원가입이 불가합니다.');
            window.scrollTo({ top: '30px', behavior: 'smooth' });
        }
    };


    // 유저입력 정보 가져오기 
    const getInputInfo = (e) => {
        forceUpdate(!forceUpdater); // 랜더링 위한 임의의 콜백함수 

        const { name, value } = e.target;

        formData.current[name] = value;

        // id에서 값이 input 창에 값이 없으면 유효성 검사 확인하는 객체에 false 저장 
        if (name === 'id' && value === '') {
            formErrors.current.id = false;
        }
        // 성별의 경우 유효성 검사 기본 상태가 빈 문자열임으로, 클릭이 발생하면(name===gender)라면 유효성 검사 확인 객체는 true가 됨. 
        else if (name === 'gender') {
            formErrors.current.gender = true;
        }
        else {// 아래 함수에서 진행한 유효성 검사 결과 객체에 저장 
            const validationResult = validate(name, value);
            formErrors.current[name] = validationResult;
        }
    };

    const emailTypeR = useRef(null);
    // 셀렉트 박스에서 선택한 값 input 창에 띄어 보여주고, 직접 입력의 경우 input 창 빈 문자열로 변환 
    const getDomain = (e) => {
        forceUpdate(!forceUpdater)
        const selectedDomain = e.target.value;
        formData.current.emailType = selectedDomain === 'self' ? '' : selectedDomain;

        if (selectedDomain !== 'self') {
            emailTypeR.current.value = selectedDomain;
            formErrors.current.emailType = true;
        }
        else {
            emailTypeR.current.value = '';
            formErrors.current.emailType = false;
        }
    }

    // 유효성 검사를 위한 정규식 객체 형태로 저장 
    const [terms, setTerms] = useState({
        userID: /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$/,
        userPSW: /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]+$/,
        userName: /^[가-힣]+$/,
        firstNum: /^\d+$/,
        secondNum: /^\d+$/,
        lastNumber: /^\d+$/,
        email: /^[a-z0-9\s]+$/,
        emailType: /^[a-zA-Z]+\.[a-zA-Z]+$/,

    }); //terms

    // 정규식에 길이 조사가 정상작동하지 않아, 이용자가 입력한 정보 길이 조사하는 함수 구현 
    const CheckLength = (name, value) => {
        const inputLength = value.length;
        switch (name) {
            case 'name':
                return (inputLength < 6 && inputLength >= 2);
            case 'id':
                return (inputLength < 15 && inputLength >= 7);
            case 'pw':
                return (inputLength < 15 && inputLength >= 7);
            case 'pwCheck':
                return (value === formData.current.pw);
            case 'addressDetail':
                return inputLength > 2;
            case 'firstNumber':
                return (inputLength < 6 && inputLength >= 2);
            case 'secondNumber':
                return (inputLength < 5 && inputLength >= 3);
            case 'lastNumber':
                return (inputLength === 4);
            case 'email':
                return inputLength >= 1;
            case 'emailType':
                return inputLength >= 1;
            default:
                return false;
        }
    };

    // 입력값이 정규식과 길이가 각 조건에 부합하면 true, 아니면 false 값 저장 
    const validate = (name, value) => {
        switch (name) {
            case 'name':
                return (value !== '' && terms.userName.test(value) && CheckLength(name, value));
            case 'id':
                return (value !== '' && terms.userID.test(value) && CheckLength(name, value));
            case 'pw':
                return (value !== '' && terms.userPSW.test(value) && CheckLength(name, value));
            case 'pwCheck':
                return (value !== '' && CheckLength(name, value));
            case 'addressDetail':
                return (value !== '' && CheckLength(name, value));
            case 'firstNumber':
                return (value !== '' && terms.firstNum.test(value) && CheckLength(name, value));
            case 'secondNumber':
                return (value !== '' && terms.secondNum.test(value) && CheckLength(name, value));
            case 'lastNumber':
                return (value !== '' && terms.lastNumber.test(value) && CheckLength(name, value));
            case 'email':
                return (value !== '' && terms.email.test(value) && CheckLength(name, value));
            case 'emailType':
                return (value !== '' && terms.emailType.test(value) && CheckLength(name, value));
            default:
                return false;
        }
    };

    // id 중복 검사 관련 
    // const [btnAble, setBtnAble] = useState(false)
    // id 유효성 검사 값이 true인 경우 버튼 활성화 아닌 경우 비활성화 
    // const IdCheck = () => {
    //     if (terms.userID.test(formData.current.id)) {
    //         setBtnAble(true);
    //     }
    //     else {
    //         setBtnAble(false);
    //     }

    // }

    // 비밀번호 확인먼저 입력한경우 

    const doubleCheckPw = useRef(null);
    const pwR = useRef(null)
    const NoinputPw = () => {
        if (formErrors.current.pw === '') {
            alert('⚠️ 비밀번호를 먼저 입력하세요');
            doubleCheckPw.current.value = '';
            pwR.current.focus();
        }
        else if (formErrors.current.pw === false) {
            alert('⚠️ 조건에 맞게 비밀번호를 입력하세요');
            doubleCheckPw.current.value = '';
            pwR.current.focus();
        }
    }



    // 목 데이터에서 유저정보 가져옴 
    const allUserData = JSON.parse(localStorage.getItem('userInfo'));


    // 아이디 중복체크 확인 상태값 
    const [isOkIdChek, setisOkIdChek] = useState(false);

    //아이디 중복 검사 
    const inputR = useRef(null);
    const IsSameId = () => {
        const userExists = allUserData.find(it => it.id === formData.current.id);
        setisOkIdChek(true);

        if (userExists) {

            alert('⚠️ 동일한 아이디가 존재합니다. 아이디를 다시 입력해주세요');
            setTimeout(() => { // setTimeout을 사용하여 다음 렌더링 사이클에서 값 변경
                inputR.current.value = ''; // 값 비우기

            }, 0);
            formErrors.current.id = false;
            setisOkIdChek(false)
        }
        else if (formErrors.current.id === false || formData.current.id === '') {
            alert('⚠️ 조건에 맞게 아이디를 다시 입력하세요')
            setTimeout(() => { // setTimeout을 사용하여 다음 렌더링 사이클에서 값 변경
                inputR.current.value = ''; // 값 비우기
            }, 0);
            formErrors.current.id = false;
            setisOkIdChek(false);
        }

        else {
            alert('🎉 동일한 아이디가 존재하지 않습니다 회원가입을 진행해주세요');
            formErrors.current.id = true;
            setisOkIdChek(true);

        }
    };


    // ==== 주소

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [zoneCode, setZoneCode] = useState('');

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

        setZoneCode(data.zonecode);
        setAddress(fullAddress);

        formData.current.zoneCode = data.zonecode;
        formErrors.current.zoneCode = true;

        formData.current.address = fullAddress;
        formErrors.current.address = true;

        setIsModalOpen(false);

    };

    const openAddress = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    }

    // 가입 버튼 
    const navi = useNavigate();
    const goLoginPage = () => {
        // 유효성 검사 결과 저장한 객체 값이 모두 true 인지 확인 
        const isCheck = Object.values(formErrors.current).every(value => value === true);

        // 날짜 저장 
        const today = new Date()
        const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        formData.current.lastLoginDate = date;

        if (isCheck && isOkIdChek === true) {
            // 분리되어 있던 핸드폰 번호 합치기 
            const phone = `${formData.current.firstNumber}-${formData.current.secondNumber}-${formData.current.lastNumber}`;

            formData.current.phoneNumber = phone;
            formData.current.index = userDateIndex;

            delete formData.current.firstNumber;
            delete formData.current.secondNumber;
            delete formData.current.lastNumber;

            //세션스토리지에 값 저장 
            userInfo.push(formData.current);
            sessionStorage.setItem('userInfo', 'formData');

            navi('/Login');
            alert(`${formData.current.name}님 회원가입을 축하합니다.`);
            setisOkIdChek(false);

        }
        else if (isOkIdChek === false) {
            alert('⚠️ 아이디 중복검사를 진행해 주세요.');
            window.scrollTo({
                top: inputR.current.offsetTop - 50, behavior: 'smooth'
            });
        }
        else {
            alert('⚠️ 조건에 맞게 정보를 다시 입력해주세요.');
            window.scrollTo({ top: '30px', behavior: 'smooth' });
        }
    }

    return (
        <div className="body">
            <div className="bodycontainer">
                <div className="stickyarea">
                    <Link to={'/'}>
                        <div className="imgcontainer">
                            <img src="/images/main/main1.png" alt="로고이미지" />
                        </div>
                    </Link>
                    {/* <h1>MU:DS </h1> */}
                    <h1>회원 가입 페이지</h1>
                    <br />
                    <div className='route'>
                        <ul>
                            <Link to={'/'}><li>Home</li></Link>
                            <Link to={'/Login'}><li>Login</li></Link>
                        </ul>
                    </div>
                </div>
                <div className="container">
                    <div className="clausearea">
                        <h3>약관동의 및 개인정보처리방침</h3>

                        <h4>필수 약관동의(필수)</h4>
                        <Clausearea01 className='clausearea1' />
                        <div className='innerclausearea'>
                            <h5>이용약관에 동의합니다</h5>
                            <input type='checkbox' name="check1" onChange={(e) => btnCheck(e)} checked={isChecked.check1}></input>
                        </div>

                        <h4>개인정보 수집 및 이용 동의(필수)</h4>
                        <Clausearea02 className='clausearea1' />
                        <div className='innerclausearea'>
                            <h5>이용약관에 동의합니다.</h5>
                            <input type='checkbox' name="check2" onChange={(e) => btnCheck(e)} checked={isChecked.check2}></input>
                        </div>


                        <h4>마케팅 정보 수신 동의(선택)</h4>
                        <Marketing className='clausearea1' />
                        <div className='innerclausearea'>
                            <h5>이용약관에 동의합니다.</h5>
                            <input type='checkbox' name="check3" onChange={(e) => btnCheck(e)} checked={isChecked.check3}></input>
                        </div>

                        <div className='innerclausearea'>
                            <h5>회원가입 약관에 모두 동의 합니다.</h5>
                            <input type='checkbox' name="allCheck" checked={isAllChecked} onChange={(e) => AllCheck(e)} />

                        </div>
                    </div>
                    <hr />

                    <h3>개인정보를 입력해주세요</h3>
                    <form className="formcontainer" id='membership' onSubmit={validate}>
                        <label for="name">이름</label>
                        <input type="text"
                            placeholder='2글자 이상 5글자 이하 이름을 입력해주세요'
                            name="name"
                            id="name"
                            maxLength={4}
                            onChange={getInputInfo}
                            onClick={MoveToTop}
                            style={{
                                borderBottom: formErrors.current.name === false ? '1px solid red' : '1px solid #aaaaaa'
                            }}
                        />
                        <p>에러</p>


                        <label for="id">아이디</label>
                        <div className="rowarea">
                            <input type="text"
                                name="id"
                                id="id"
                                onChange={getInputInfo}
                                maxLength={13}
                                placeholder='7~13글자 이하 영문 숫자 조합으로 아이디를 입력해주세요'
                                // onBlur={IdCheck}
                                ref={inputR}
                                style={{
                                    borderBottom: formErrors.current.id === false ? '1px solid red' : '1px solid #aaaaaa'
                                }}
                            />
                            <button
                                // disabled={!btnAble}

                                type='button'
                                onClick={IsSameId}
                            >아이디중복 검사</button>
                        </div>
                        <p>에러</p>


                        <label for="pw">비밀번호</label>
                        <input type="text"
                            placeholder='7~14글자 이하 영문 숫자 특수문자 조합으로 비밀번호를 입력해주세요'
                            maxLength={14}
                            name="pw"
                            id="pw"
                            ref={pwR}
                            onChange={getInputInfo}
                            style={{
                                borderBottom: formErrors.current.pw === false ? '1px solid red' : '1px solid #aaaaaa'
                            }}
                        />
                        <p>에러</p>

                        <label for="checkPw">비밀번호 확인</label>
                        <input type="text"
                            placeholder='위에서 입력한 비밀번호와 동일하게 입력해주세요'
                            name="pwCheck"
                            id="checkPw"
                            maxLength={14}
                            ref={doubleCheckPw}
                            onClick={NoinputPw}
                            onChange={getInputInfo}
                            style={{
                                borderBottom: formErrors.current.pwCheck === false ? '1px solid red' : '1px solid #aaaaaa'
                            }}
                        />
                        <p>에러</p>


                        <label>주소</label>
                        <div className="rowarea address">
                            <input type="text"
                                placeholder='우편번호'
                                name='zoneCode'
                                value={zoneCode}
                                maxLength={5} readOnly />
                            <button id='btn' onClick={openAddress}>우편번호 검색</button>
                        </div>
                        <input type="text"
                            placeholder='도로명주소 또는 지번주소'
                            name='address' value={address} readOnly />
                        <input type="text"
                            name='addressDetail'
                            placeholder='상세주소'
                            onChange={getInputInfo}
                            style={{
                                borderBottom: formErrors.current.addressDetail === false ? '1px solid red' : '1px solid #aaaaaa'
                            }}
                        />
                        <p></p>

                        <label for="phoneNumeber">전화번호</label>
                        <div className='phoneNumber'>
                            <input type="text"
                                id='phoneNumeber'
                                maxLength={5}
                                placeholder='2~5자리'
                                name='firstNumber'
                                onChange={getInputInfo}
                                style={{
                                    borderBottom: formErrors.current.firstNumber === false ? '1px solid red' : '1px solid #aaaaaa'
                                }}
                            />
                            <span>-</span>
                            <input type="text"
                                placeholder='3~4자리'
                                maxLength={4}
                                name='secondNumber'
                                onChange={getInputInfo}
                                style={{
                                    borderBottom: formErrors.current.secondNumber === false ? '1px solid red' : '1px solid #aaaaaa'
                                }}
                            />
                            <span>-</span>
                            <input type="text"
                                placeholder='4자리'
                                maxLength={4}
                                name='lastNumber'
                                onChange={getInputInfo}
                                style={{
                                    borderBottom: formErrors.current.lastNumber === false ? '1px solid red' : '1px solid #aaaaaa'
                                }}
                            />
                        </div>
                        <p>에러</p>



                        <label for="gender">성별</label>
                        <div className='genderbutton'>
                            <button type='button'
                                id='gender'
                                name='gender'
                                value='M'
                                onClick={getInputInfo}
                                style={{
                                    backgroundColor: formData.current.gender === 'M' ? 'black' : 'white',
                                    color: formData.current.gender === 'M' ? 'white' : 'black',
                                }}
                            >
                                남성</button>

                            <button type='button'
                                name='gender'
                                value='F'
                                onClick={getInputInfo}
                                style={{
                                    backgroundColor: formData.current.gender === 'F' ? 'black' : 'white',
                                    color: formData.current.gender === 'F' ? 'white' : 'black',
                                }}
                            >여성</button>
                        </div>
                        <p></p>
                        <label for='email'>이메일</label>
                        <div className='emailArea'>
                            <input type="text" id='email' name='email' onChange={getInputInfo}
                                style={{
                                    borderBottom: formErrors.current.email === false ? '1px solid red' : '1px solid #aaaaaa'
                                }} />
                            <span>@</span>
                            <input type="text"
                                name='emailType'
                                onChange={getInputInfo}
                                ref={emailTypeR}
                                style={{
                                    borderBottom: formErrors.current.emailType === false ? '1px solid red' : '1px solid #aaaaaa'
                                }}
                            />
                            <select className="box"
                                id="domain-list" onChange={getDomain}>
                                <option value="self">직접입력</option>
                                <option value="naver.com">naver.com</option>
                                <option value="google.com">google.com</option>
                                <option value="hanmail.net">hanmail.net</option>
                                <option value="nate.com">nate.com</option>
                                <option value="kakao.com">kakao.com</option>
                            </select>
                        </div>
                        <br />
                        <div className='buttonarea'>
                            <button type='button' onClick={goLoginPage}>가입하기</button>
                        </div>
                    </form>
                </div>

            </div>
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
                <button className='modalbtn' onClick={() => setIsModalOpen(false)}>X</button>
                <DaumPostcode onComplete={handleComplete} />
            </Modal>
        </div >

    );
};

export default Membership;
