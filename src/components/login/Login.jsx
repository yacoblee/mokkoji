import React, { useRef } from "react";
import '../../css/login/Login.css';
import Membership from "./Membership";
import FindId from "./FindId";
import FindPw from "./FindPw";
import { Link, useFetcher, useNavigate } from 'react-router-dom'
import { useState } from "react";
import LoginValidityCheck from "./LoginValidityCheck";
import userInfo from "./UserInforData";

const Login = () => {
    const navi = useNavigate();
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputePw] = useState('');
    const [loginSuccese, setLoginSuccese] = useState('');
    const onChangeId = (e) => { setInputId(e.target.value) }
    const onChangePw = (e) => { setInputePw(e.target.value) }

    const labelIdRed = useRef(null);
    const inputIdRef = useRef(null);

    const labelPwRed = useRef(null);
    const inputPwRef = useRef(null);
    const MoveToOutLabel = (labelRef) => {
        if (labelRef.current) {
            labelRef.current.style.fontSize = '15px';
            labelRef.current.style.top = '-20px';
        }
    }

    const MoveToInLabel = (labelRef, inputRef) => {
        if (inputRef.current && inputRef.current.value.length === 0) {
            if (labelRef.current) {
                labelRef.current.style.fontSize = '20px';
                labelRef.current.style.top = '0';
            }
        }
    }

    const LabelClick = (inputRef) => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const loginFailure = useRef(null);
    const CheckLogin = () => {
        const isLogin = userInfo.find(item => (item.id === inputId && item.pw === inputPw));
        if (isLogin) {
            alert('로그인 완료')
        }
        else {
            alert('로그인 실패')
            // loginFailure.current.style.visibility = 'visible';
        }
    }



    return (
        <div className="login-body">
            <div className="login-Area">
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
                        <p >아이디 또는 비밀번호를 다시 입력해주세요</p>
                        <button onClick={CheckLogin}>Login</button>
                    </form>
                    <ul>
                        <li><Link to='/Login/Membership'>회원가입 | </Link></li>
                        <li><Link to='/Login/FindId'>아이디 찾기 | </Link></li>
                        <li><Link to='/Login/FindPw'>비밀번호 찾기</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Login;
