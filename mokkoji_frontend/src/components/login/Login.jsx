import React, { useEffect, useRef } from "react";
import '../../css/login/Login.css';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from "react";
import LoginValidityCheck from "./LoginValidityCheck";
import { apiCall } from "../../service/apiService";



const Login = () => {
    const navi = useNavigate();
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputePw] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 상태 관리
    const labelIdRed = useRef(null);
    const inputIdRef = useRef(null);

    const labelPwRed = useRef(null);
    const inputPwRef = useRef(null);

    const loginP = useRef(null);
    useEffect(() => {
        if (isLoggedIn) {
            console.log("네비 이동 직전임");
            window.location.href = '/';
        }
    }, [isLoggedIn]);  // isLoggedIn 값이 변경되면 페이지 이동

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

    const CheckLogin = (e) => {
        //const navi = useNavigate();
        let url = "/Login";
        const data = { userId: inputId, password: inputPw };

        e.preventDefault();
        console.log("API 호출 직전");  // 이 로그가 출력되는지 확인
        apiCall(url, 'POST', data, null)
            .then((response) => {
                console.log("API 호출 성공:", response);  // 응답 전체 출력
                console.log("응답 상태 코드:", response.status);  // 상태 코드 출력

                // 서버에서 200 OK 응답을 받았는지 확인
                if (response.status === 200) {
                    sessionStorage.setItem("isLoggedIn", "true");
                    alert('로그인 성공');
                    sessionStorage.setItem("userData", JSON.stringify(response.data));  // response.data 사용
                    setIsLoggedIn(true); //-> 상태값 미변화로 인한 이동제한이 원인일 수 있어 넣어둠
                    console.log("네비 이동 직전임");
                    console.log("네비 이동 후");
                } else {
                    throw new Error("로그인 실패: 잘못된 응답 코드");
                }
            })
            .catch((err) => {
                console.log("로그인 중 오류 발생:", err);
                setInputId("");
                setInputePw("");

                // 상태 코드로 에러 메시지 처리
                if (err == 502) {
                    alert("id 또는 password가 다릅니다, 다시 시도하세요.");
                } else {
                    alert(`** onLoginSubmit 시스템 오류, err=${err}`); //=> nullException이 발생함으로 여기로 에러가 떨어짐

                }
                setIsLoggedIn(false);
                window.location.href = '/Login';
            });

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
