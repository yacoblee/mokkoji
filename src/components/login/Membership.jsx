import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/login/Membership.css';
import Clausearea01 from './Clausearea01'
import Clausearea02 from './Clausearea02';
import Marketing from './Marketing';
import FindId from './FindId';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import About from './../main/About';
import Background from './../main/Backgroud';
import userInfo from './UserInforData';

<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

const Membership = () => {
    // 사용자 입력값 저장 객체
    const [formData, setFormData] = useState({
        name: '',
        id: '',
        pw: '',
        pwCheck: '',
        addrees: '',
        firstNumber: '',
        secondNumber: '',
        lastNumber: '',
        gender: '',
        email: '',
        domain: '',
    })

    // 사용자 입력값 유효성 검사 후 상태값 저장하는 객체 
    const [formErrors, setFormErrors] = useState({
        name: "",
        id: "",
        pw: "",
        pwCheck: "",
        addrees: "",
        firstNumber: "",
        secondNumber: "",
        lastNumber: "",
        gender: "",
        email: "",
        domain: "",
        clausearea: "",
    });

    const [AllCheck, setAllCheck] = useState(false)
    const [check, setCheck] = useState({
        check1: false,
        check2: false,
        check3: false,
    })
    // 아이디 중복체크 확인 상태값 
    const [isOkIdChek, setisOkIdChek] = useState(false);
    // 체크박스 개별적 체크
    const btnCheeck = (num) => {
        if (check[num] === false) {
            setCheck((it) => ({
                ...it,
                [num]: true,
            }))
        }
        else {
            setAllCheck(false)
            setCheck((it) => ({
                ...it,
                [num]: false
            }))
        }
    }

    // 전체선택 체크박스 처리 
    const AllBtnCheck = () => {
        if (AllCheck === true) {
            setCheck(() => ({
                check1: false,
                check2: false,
                check3: false,
            }))
            setAllCheck(false)
        }

        if (AllCheck === false) {
            setCheck(() => ({
                check1: true,
                check2: true,
                check3: true,
            }))
            setAllCheck(true)
        }
    }

    useEffect(() => {
        const isClauseAreaValid = (check.check1 && check.check2) || (check.check1 && check.check2 && check.check3) || AllCheck;
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            clausearea: isClauseAreaValid,
        }));
    }, [check, AllCheck,]);

    useEffect(() => {
    }, [formErrors]);
    // =============================================================


    const genderBtnAble = useRef(null);

    const getInputInfo = (e) => {
        const { name, value } = e.target;
        setFormData((prevformData) => ({
            ...prevformData,
            [name]: value,
        }));

        if (name === 'id' && value === '') {
            setFormErrors((prevformErrors) => ({
                ...prevformErrors,
                id: false,
            }))
        }
        else if (name === 'gender') {
            const btnGender = e.target.value
            setFormData((it) => ({
                ...it,
                [name]: btnGender,

            }));
            setFormErrors((prevformErrors) => ({
                ...prevformErrors,
                gender: true,
            }))

        }

        else {
            const validationResult = validate(name, value);
            setFormErrors((prevformErrors) => ({
                ...prevformErrors,
                [name]: validationResult,
            }));
        }
    };



    const domainR = useRef(null);
    
    const getDomain = (e) => {
        const selectedDomain = e.target.value;

        setFormData((prevformData) => ({
            ...prevformData,
            domain: selectedDomain === 'self' ? '' : selectedDomain,
        }))

        if (selectedDomain !== 'self') {
            domainR.current.value = selectedDomain;
            setFormErrors((it) => ({
                ...it,
                domain: true,
            }))
        } else {
            domainR.current.value = '';
            setFormErrors((it) => ({
                ...it,
                domain: false,
            }))
        }
    }
    console.log(formErrors);
    console.log(formData);


    const [terms, setTerms] = useState({
        userID: /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$/,
        userPSW: /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]+$/,
        userName: /^[가-힣]+$/,
        firstNum: /^\d+$/,
        secondNum: /^\d+$/,
        lastNumber: /^\d+$/,
        email: /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$/,
        domain: /^[a-zA-Z]+\.[a-zA-Z]+$/,

    }); //terms

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
                return (value === formData.pw);
            case 'addrees':
                return inputLength > 0;
            case 'firstNumber':
                return (inputLength < 6 && inputLength >= 2);
            case 'secondNumber':
                return (inputLength < 5 && inputLength >= 3);
            case 'lastNumber':
                return (inputLength === 4);
            case 'email':
                return inputLength >= 1;
            case 'domain':
                return inputLength >= 1;
            default:
                return false;
        }
    };

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
            case 'addrees':
                return (value !== '' && CheckLength(name, value));
            case 'firstNumber':
                return (value !== '' && terms.firstNum.test(value) && CheckLength(name, value));
            case 'secondNumber':
                return (value !== '' && terms.secondNum.test(value) && CheckLength(name, value));
            case 'lastNumber':
                return (value !== '' && terms.lastNumber.test(value) && CheckLength(name, value));
            case 'email':
                return (value !== '' && terms.email.test(value) && CheckLength(name, value));
            case 'domain':
                return (value !== '' && terms.domain.test(value) && CheckLength(name, value));
            default:
                return false;
        }
    };

    const [btnAble, setBtnAble] = useState(false)
    const IdCheck = () => {
        if (terms.userID.test(formData.id)) {
            console.log('아이디 유효성 검사 완료');
            setBtnAble(true);
        }
        else {
            setBtnAble(false);
        }

    } //IdCheck


    const allUserData = JSON.parse(localStorage.getItem('userInfo'));

    //아이디 중복 검사 
    const inputR = useRef(null);
    const IsSameId = () => {
        const userExists = allUserData.find(it => it.id === formData.id);
        setisOkIdChek(true);

        if (userExists) {

            alert('동일한 아이디가 존재합니다. 아이디를 다시 입력해주세요');
            setTimeout(() => { // setTimeout을 사용하여 다음 렌더링 사이클에서 값 변경
                inputR.current.value = ''; // 값 비우기
            }, 0);

            setisOkIdChek(true)
        }
        else {
            setFormErrors({
                ...formErrors,
                id: true,
            })
        }
    };


    // ==== 주소

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [zoneCode, setZoneCode] = useState('');
    const [address2, setAddress2] = useState('');




    const handleComplete = (data) => {
        console.log(data);
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
        setIsModalOpen(false);
    };

    const openAddress = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    }

    // =============
    const navi = useNavigate();
    const goToHone = () => {
        const isCheck = Object.values(formErrors).every(value => value === true);
        if (isCheck) {
            navi('/')
        }
        else {
            alert('조건에 맞게 정보를 다시 입력해주세요.')

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
                            <Link to={'/Login/Membership'}><li>Membership</li></Link>
                        </ul>
                    </div>
                </div>
                <div className="container">
                    <div className="clausearea">
                        <h3>약관동의 및 개인정보처리방침</h3>

                        <h4>필수 약관동의(필수)</h4>
                        <Clausearea01 />
                        <div className='innerclausearea'>
                            <h5>이용약관에 동의합니다</h5>
                            <input type='checkbox' id="check1" onChange={() => btnCheeck('check1')} checked={check.check1}></input>
                        </div>

                        <h4>개인정보 수집 및 이용 동의(필수)</h4>
                        <Clausearea02 />
                        <div className='innerclausearea'>
                            <h5>이용약관에 동의합니다.</h5>
                            <input type='checkbox' id="check2" onChange={() => btnCheeck('check2')} checked={check.check2}></input>
                        </div>


                        <h4>마케팅 정보 수신 동의(선택)</h4>
                        <Marketing />
                        <div className='innerclausearea'>
                            <h5>이용약관에 동의합니다.</h5>
                            <input type='checkbox' id="check2" onChange={() => btnCheeck('check3')} checked={check.check3}></input>
                        </div>

                        <div className='innerclausearea'>
                            <h5>회원가입 약관에 모두 동의 합니다.</h5>
                            <input type='checkbox' id="all-check" onChange={AllBtnCheck} checked={AllCheck}

                            ></input>

                        </div>
                    </div>
                    <hr />

                    <h3>개인정보를 입력해주세요</h3>
                    <form className="formcontainer" id='membership' onSubmit={validate}>
                        <label>이름</label>
                        <input type="text"
                            placeholder='2글자 이상 5글자 이하 이름을 입력해주세요'
                            name="name"
                            maxLength={4}
                            value={formData.name}
                            onChange={getInputInfo}

                        />
                        <p>에러</p>


                        <label>아이디</label>
                        <div className="rowarea">
                            <input type="text"
                                name="id"
                                value={formData.id}
                                onChange={getInputInfo}
                                maxLength={13}
                                placeholder='7~14글자 이하 영문 숫자 조합으로 아이디를 입력해주세요'
                                onBlur={IdCheck}
                                ref={inputR}
                            />
                            <button
                                disabled={!btnAble}
                                type='button'
                                onClick={IsSameId}
                            >아이디중복검사</button>
                        </div>
                        <p>에러</p>


                        <label>비밀번호</label>
                        <input type="text"
                            placeholder='7~14글자 이하 영문 숫자 특수문자 조합으로 비밀번호를 입력해주세요'
                            maxLength={14}
                            name="pw"
                            value={formData.pw}
                            onChange={getInputInfo}
                        />
                        <p>에러</p>

                        <label>비밀번호 확인</label>
                        <input type="text"
                            placeholder='위에서 입력한 비밀번호와 동일하게 입력해주세요'
                            name="pwCheck"
                            value={formData.pwCheck}
                            maxLength={14}
                            onChange={getInputInfo}
                        />
                        <p>에러</p>


                        <label>주소</label>
                        <div className="rowarea address">
                            <input type="text"
                                placeholder='우편번호'
                                name='zipcode'
                                value={zoneCode}
                                maxLength={5} readOnly />
                            <button id='btn' onClick={openAddress}>우편번호 검색</button>
                        </div>
                        <input type="text"
                            placeholder='도로명주소 또는 지번주소'
                            name='addr1' value={address} readOnly />
                        <input type="text"
                            name='addrees'
                            placeholder='상세주소'
                            value={formData.addrees}
                            onChange={getInputInfo} />
                        <p></p>

                        <label>전화번호</label>
                        <div className='phoneNumber'>
                            <input type="text"
                                maxLength={5}
                                placeholder='2~4자리'
                                name='firstNumber'
                                value={formData.firstNumber}
                                onChange={getInputInfo}
                            />
                            <span>-</span>
                            <input type="text"
                                placeholder='3~4자리'
                                maxLength={4}
                                name='secondNumber'
                                value={formData.secondNumber}
                                onChange={getInputInfo} />
                            <span>-</span>
                            <input type="text"
                                placeholder='4자리'
                                maxLength={4}
                                name='lastNumber'
                                value={formData.lastnumber}
                                onChange={getInputInfo}
                            />
                        </div>
                        <p>에러</p>



                        <label>성별</label>
                        <div className='genderbutton'>
                            <button type='button'
                                name='gender'
                                value='M'
                                onClick={getInputInfo}
                                ref={genderBtnAble}
                                style={{
                                    backgroundColor: formData.gender === 'M' ? 'black' : 'white',
                                    color: formData.gender === 'M' ? 'white' : 'black',
                                }}
                            >
                                남성</button>

                            <button type='button'
                                name='gender'
                                value='F'
                                onClick={getInputInfo}
                                ref={genderBtnAble}
                                style={{
                                    backgroundColor: formData.gender === 'F' ? 'black' : 'white',
                                    color: formData.gender === 'F' ? 'white' : 'black',
                                }}
                            >여성</button>
                        </div>
                        <p></p>
                        <label>이메일</label>
                        <div className='emailArea'>
                            <input type="text" name='email' onChange={getInputInfo} />
                            <span>@</span>
                            <input type="text"
                                name='domain'
                                onChange={getInputInfo}
                                ref={domainR}
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
                        <p>에러</p>
                        <div className='buttonarea'>
                            <button type='button' onClick={goToHone}>가입하기</button>
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
}

export default Membership;
