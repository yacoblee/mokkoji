import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../css/login/Membership.css';
import Clausearea01 from './Clausearea01'
import Clausearea02 from './Clausearea02';
import Marketing from './Marketing';
import FindId from './FindId';

const Membership = () => {

    const [AllCheck, setAllCheck] = useState(false)
    const [check, setCheck] = useState({
        check1: false,
        check2: false,
        check3: false,
    })

    // 체크박스 개별적 체크
    const btnCheeck = (num) => {
        if (check[num] === false) {
            setCheck((it) => ({
                ...it,
                [num]: true,
            }))
        }
        else {
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
    // =============================================================
    const isUserIfroState = {
        name: false,
        id: false,
        pw: false,
        address: false,
        phoneNumber: false,
        gender: false,
        email: false,
    }

    const [userName, setUserName] = useState('');
    const error = useRef(null);
    const inputR = useRef(null);

    //이름 입력값 가져오기 
    const getName = (e) => { setUserName(e.target.value) };

    //이름 유효성 검사 
    const userNameCheck = () => {
        const userNameTest = /^[가-힣]{2,5}$/;
        if (userNameTest.test(userName)) {
            error.current.textContent = ''
            inputR.current.style.borderBottom = '1px solid #aaaaaa';
            isUserIfroState.name = true;
        }
        else if (userName === '') {
            inputR.current.style.borderBottom = '1px solid red';
            error.current.textContent = '빈칸 입니다. 이름을 입력해주세요'
            error.current.style.visibility = 'visible';
        }
        else if (!userNameTest.test(userName)) {
            inputR.current.style.borderBottom = '1px solid red';
            error.current.textContent = '조건에 맞게 이름을 입력해주세요'
            error.current.style.visibility = 'visible';
        }
    }

    const [userId, setUserId] = useState('');
    const error2 = useRef(null);
    const inputR2 = useRef(null);
    const idCheckBtn = useRef(null)

    //아이디 입력값 가져오기 
    const getId = (e) => { setUserId(e.target.value) };

    //아이디 유효성 검사 
    const userIdTest = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{8,15}$/g;

    const userIdCheck = () => {
        if (userIdTest.test(userId)) {
            error2.current.textContent = ''
            inputR2.current.style.borderBottom = '1px solid #aaaaaa';
            idCheckBtn.current.disabled = false;
        }
        else if (userId === '') {
            inputR2.current.style.borderBottom = '1px solid red';
            error2.current.textContent = '빈칸 입니다. 아이디를 입력해주세요'
            error2.current.style.visibility = 'visible';
              idCheckBtn.current.disabled= true
        }
        else if (!userIdTest.test(userId)) {
            inputR2.current.style.borderBottom = '1px solid red';
            error2.current.textContent = '조건에 맞게 아이디를 입력해주세요'
            error2.current.style.visibility = 'visible';
            idCheckBtn.current.disabled= true
        }
    }

    const userIdDoubleCheck = (e) => {
        e.preventDefault();
        const alluserData = JSON.parse(localStorage.getItem('userInfo'));
        const userExists = alluserData.find(it => it.id === userId);
        if (userExists) {
            console.log('존재하는 아이디.')
            inputR2.current.style.borderBottom = '1px solid red';
            error2.current.textContent = '이미존재하는 아이디 입니다. 아이디를 다시 입력해주세요.'
            error2.current.style.visibility = 'visible';
            userId = '';
        }
        else{
            error2.current.style.visibility = 'visible';
            error2.current.style.color= "black"
            error2.current.textContent = '사용가능한 아이디 입니다.'
            inputR2.current.style.borderBottom = '1px solid #aaaaaa';
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
                    <h1>MU:DS </h1>
                    <h1>회원 가입 페이지</h1>
                    <br />
                    <p>에러 메세지</p>
                </div>
                <div className="container">
                    <div className="clausearea">
                        <h3>약관동의 및 개인정보처리방침</h3>

                        <h4>필수 약관동의(필수)</h4>
                        <Clausearea01 />
                        <div className='innerclausearea'>
                            <h5>이용약관에 동의합니다</h5>
                            <input type='checkbox' id="check1" onClick={() => btnCheeck('check1')} checked={check.check1}></input>
                        </div>

                        <h4>개인정보 수집 및 이용 동의(필수)</h4>
                        <Clausearea02 />
                        <div className='innerclausearea'>
                            <h5>이용약관에 동의합니다.</h5>
                            <input type='checkbox' id="check2" onClick={() => btnCheeck('check2')} checked={check.check2}></input>
                        </div>


                        <h4>마케잍 정보 수신 동의(선택)</h4>
                        <Marketing />
                        <div className='innerclausearea'>
                            <h5>이용약관에 동의합니다.</h5>
                            <input type='checkbox' id="check2" onClick={() => btnCheeck('check3')} checked={check.check3}></input>
                        </div>

                        <div className='innerclausearea'>
                            <h5>회원가입 약관에 모두 동의 합니다.</h5>
                            <input type='checkbox' id="all-check" onClick={AllBtnCheck} checked={AllCheck}></input>

                        </div>
                    </div>
                    <hr />

                    <h3>개인정보를 입력해주세요</h3>
                    <form className="formcontainer">
                        <label>이름</label>
                        <input type="text"
                            placeholder='2글자 이하 5글자 미만 이름을 입력해주세요'
                            value={userName}
                            onChange={getName}
                            onBlur={userNameCheck}
                            ref={inputR} />
                        <p ref={error}>에러</p>


                        <label>아이디</label>
                        <div className="rowarea">
                            <input type="text"
                                placeholder='8글자 이상 15글자 미만 영문 숫자 조합으로 아이디를 입력해주세요'
                                value={userId}
                                onChange={getId}
                                onBlur={userIdCheck}
                                ref={inputR2} />
                            <button ref={idCheckBtn} onClick={userIdDoubleCheck}>아이디중복검사</button>
                        </div>
                        <p ref={error2}>에러</p>


                        <label>비밀번호</label>
                        <input type="text" />
                        <p>에러</p>
                        <label>비밀번호 확인</label>
                        <input type="text" />
                        <p>에러</p>
                        <label>주소</label>
                        <div className="rowarea address">
                            <input type="text" />
                            <button>우편번호 검색</button>
                        </div>
                        <input type="text" />
                        <input type="text" />
                        <p></p>
                        <label>전화번호</label>
                        <input type="text" />
                        <p>에러</p>
                        <label>성별</label>
                        <div className='genderbutton'>
                            <button>남성</button>
                            <button>여성</button>
                        </div>
                        <p></p>
                        <label>이메일</label>
                        <input type="text" />
                        <p>에러</p>
                        <div className='buttonarea'>
                            <button>가입하기</button>
                        </div>
                    </form>
                </div>
                <div className='route'>
                    <ul>
                        <Link to={'/'}><li>Home</li></Link>
                        <Link to={'/Login'}><li>Login</li></Link>
                        <Link to={'/Login/Membership'}><li>Membership</li></Link>
                    </ul>
                </div>
            </div>
        </div >
    );
}

export default Membership;
