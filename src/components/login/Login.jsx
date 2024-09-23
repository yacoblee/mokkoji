import React, { useRef } from "react";
import '../../css/login/Login.css';
import Membership from "./Membership";
import FindId from "./FindId";
import FindPw from "./FindPw";
import { useDispatch } from 'react-redux';
import { login } from '../modules/action';
import { Link, useFetcher, useNavigate, useParams } from 'react-router-dom'
import { useState } from "react";
import LoginValidityCheck from "./LoginValidityCheck";
import userInfo from "./UserInforData";
import LoginSuccess from "./loginSuccess";
import userInfoData from "./UserInforData";

sessionStorage.setItem('LoginSuccess', 'false');


const Login = () => {
    localStorage.setItem('userInfo', JSON.stringify(userInfoData));
    const navi = useNavigate();
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputePw] = useState('');
    // const [errorCount, setErrorCount] = useState(1);

    const labelIdRed = useRef(null);
    const inputIdRef = useRef(null);

    const labelPwRed = useRef(null);
    const inputPwRef = useRef(null);

    const loginP = useRef(null);

    // input창에 onChange이벤트 발생 시 입력값 저장 
    const onChangeId = (e) => { setInputId(e.target.value) }
    const onChangePw = (e) => { setInputePw(e.target.value) }

    // input에 포커스 이벤트 발생시 라벨 밖으로 이동 
    const MoveToOutLabel = (labelRef) => {
        if (labelRef.current) {
            labelRef.current.style.fontSize = '15px';
            labelRef.current.style.top = '-20px';
        }
    }

    // inputdp 포커스해제 이벤트 발생 시 라벨 안으로 이동
    const MoveToInLabel = (labelRef, inputRef) => {
        if (inputRef.current && inputRef.current.value.length === 0) {
            if (labelRef.current) {
                labelRef.current.style.fontSize = '20px';
                labelRef.current.style.top = '0';
            }
        }
    }

    // label과 input 포커스 기능 연결 
    const LabelClick = (inputRef) => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const dispatch = useDispatch();
    // 로그인 검사 함수 (로그인 시 홈 화면으로 이동 : 로그인실패 횟수 p태그에 연결하여 텍스트 표현)
    const CheckLogin = (e) => {
        const isLogin = userInfo.find(item => (item.id === inputId && item.pw === inputPw));
        if (isLogin) {
            const userInfo = { id: inputId, pw: inputPw, LoginSuccess: true }
            dispatch(login(userInfo));

            const filteredUserInfoID = userInfoData.find(it => it.id == inputId && it.pw === inputPw);
            sessionStorage.setItem('LoginUserInfo', JSON.stringify(filteredUserInfoID));
            navi('/');
        }
        else {
            e.preventDefault();
            // setErrorCount(prventCount => prventCount + 1);
            loginP.current.textContent = `아이디 비밀번호를 다시 입력해주세요.`
            // \n 로그인 실패 횟수: ${errorCount};
            loginP.current.style.visibility = 'visible';
        }
        // 버튼 클릭 후 input 빈문자열로 초기화 
        setInputId("");
        setInputePw("");
    }



    return (
        <div className="login-body">
            <div className="login-Area">
                <div className="boxshadowcontainer">
                    <div className="login_video">
                        <video muted autoPlay loop >
                            <source className="video" src="/images/login/login_.mp4" type="video/mp4" />
                        </video>
                    </div>

                    <div className="textarea">
                        <div className="login-imgBox"><Link to='/'><img src="/images/main/main1.png" alt="로고이미지" /></Link></div>
                        <h4>Welcom to MU:DS</h4>
                        <form className="login-Box">

                            <div className="login-inputArea">
                                <label
                                    className="login-label"
                                    ref={labelIdRed}
                                    onClick={() => LabelClick(inputIdRef)}
                                >아이디</label>
                                <input
                                    ref={inputIdRef}
                                    type="text" value={inputId}
                                    onChange={onChangeId}
                                    onFocus={() => MoveToOutLabel(labelIdRed)}
                                    onBlur={() => MoveToInLabel(labelIdRed, inputIdRef)}
                                />
                            </div>

                            <div className="login-inputArea">
                                <label
                                    className="login-label"
                                    ref={labelPwRed}
                                    onClick={() => LabelClick(inputPwRef)}>
                                    비밀번호</label>
                                <input
                                    ref={inputPwRef}
                                    type='password' value={inputPw}
                                    onChange={onChangePw}
                                    onFocus={() => MoveToOutLabel(labelPwRed)}
                                    onBlur={() => MoveToInLabel(labelPwRed, inputPwRef)}
                                />
                            </div>

                            <LoginValidityCheck inputId={inputId} inputPw={inputPw} />
                            <p ref={loginP} />
                            <button onClick={CheckLogin}>로그인</button>
                        </form>
                        <ul>
                            <li><Link to='/Login/Membership'>회원가입 | </Link></li>
                            <li><Link to='/Login/FindId'>아이디 찾기 | </Link></li>
                            <li><Link to='/Login/FindPw'>비밀번호 찾기</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
