import React, { useEffect, useRef } from "react";
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
import { apiCall } from "../../service/apiService";



const Login = () => {
    // localStorage.setItem('userInfo', JSON.stringify(userInfoData));
    const navi = useNavigate();
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputePw] = useState('');
    // const [errorCount, setErrorCount] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 상태 관리
    const labelIdRed = useRef(null);
    const inputIdRef = useRef(null);

    const labelPwRed = useRef(null);
    const inputPwRef = useRef(null);

    const loginP = useRef(null);
    useEffect(() => {
        if (isLoggedIn) {
            console.log("네비 이동 직전임");
            //navi('/');  // 로그인 성공 후 홈으로 이동
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

    // const dispatch = useDispatch();
    // 로그인 검사 함수 (로그인 시 홈 화면으로 이동 : 로그인실패 횟수 p태그에 연결하여 텍스트 표현)
    // const CheckLogin = (e) => {
    //     const isLogin = userInfo.find(item => (item.id === inputId && item.pw === inputPw));
    //     if (isLogin) {
    //         const userInfo = { id: inputId, pw: inputPw, LoginSuccess: true }
    //         dispatch(login(userInfo));

    //         const filteredUserInfoID = userInfoData.find(it => it.id == inputId && it.pw === inputPw);
    //         sessionStorage.setItem('LoginUserInfo', JSON.stringify(filteredUserInfoID));
    //         navi('/');
    //     }
    //     else {
    //         e.preventDefault();
    //         // setErrorCount(prventCount => prventCount + 1);
    //         loginP.current.textContent = `아이디 비밀번호를 다시 입력해주세요.`
    //         // \n 로그인 실패 횟수: ${errorCount};
    //         loginP.current.style.visibility = 'visible';
    //     }
    //     // 버튼 클릭 후 input 빈문자열로 초기화 
    //     setInputId("");
    //     setInputePw("");
    // }

    const CheckLogin = (e) => {
        //const navi = useNavigate();
        let url = "/Login";
        const data = { userId: inputId, password: inputPw };

        //apiCall(url, 'POST', data, null)
        // .then((response) => {
        //     console.log("API 호출 성공:", response);
        //console.log("응답 상태 코드:", response.status);

        //     sessionStorage.setItem("inputId", JSON.stringify(response));
        //     alert('로그인 성공');
        //     setIsLoggedIn(true);
        //     setLoginInfo(response);
        //     console.log("네비 이동 직전임");
        //     navi('/');
        // }).catch((err) => {
        //     alert("id 또는 password가 다릅니다, 다시 시도하세요.");
        //     setIsLoggedIn(false);
        //     setLoginInfo('');
        //     // 상태 코드로 에러 메시지 처리
        //     if (err.response && err.response.status === 502) {
        //         alert("id 또는 password가 다릅니다, 다시 시도하세요.");
        //     } else {
        //         alert(`** onLoginSubmit 시스템 오류, err=${err}`);
        //     }
        //     navi("/Login");
        // });



        // apiCall(url, 'POST', data, null)
        // .then((response) => {
        //         console.log("API 호출 성공:", response);
        //         console.log("응답 상태 코드:", response.status);
        //         // 서버에서 200 OK 응답을 받았는지 확인
        //         if (response.status == 200) {
        //             alert('로그인 성공');
        //             navi('/');
        //             sessionStorage.setItem("inputId", JSON.stringify(response));
        //             setIsLoggedIn(true);
        //             setLoginInfo(response);
        //             console.log("네비 이동 직전임");
        //         } else {
        //             // 성공하지 않은 응답은 catch로 넘김
        //             throw new Error("로그인 실패: 잘못된 응답 코드");
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("로그인 중 오류 발생:", err);
        //         alert("***id 또는 password가 다릅니다, 다시 시도하세요.");
        //         setIsLoggedIn(false);
        //         setLoginInfo('');

        //         // 상태 코드로 에러 메시지 처리
        //         if (err.response && err.response.status === 502) {
        //             alert("id 또는 password가 다릅니다, 다시 시도하세요.");
        //         } else {
        //             alert(`** onLoginSubmit 시스템 오류, err=${err}`);
        //         }
        //         navi("/Login");
        //     });

        // apiCall(url, 'POST', data, null) -> 로그인은 되나 콘솔창이동 안되고, 홈으로 페이지 아동 또한 되지 않음 
        //     .then((response) => {
        //         console.log("API 호출 성공:", response);
        //         console.log("응답 상태 코드:", response.data);
        //         // console.log("응답 상태 코드:", response.status);
        //         // 서버에서 200 OK 응답을 받았는지 확인

        //         alert('로그인 성공');
        //         sessionStorage.setItem("inputId", JSON.stringify(response));
        //         //setIsLoggedIn(true);
        //         //setLoginInfo(response);
        //         console.log("네비 이동 직전임");
        //         navi('/');

        //     })
        //     .catch((err) => {
        //         console.log("로그인 중 오류 발생:", err);
        //         console.log("**API 호출 성공:", response);
        //         console.log("**응답 상태 코드:", response.status);
        //         alert("***id 또는 password가 다릅니다, 다시 시도하세요.");
        //         setIsLoggedIn(false);
        //         setLoginInfo('');

        //         // 상태 코드로 에러 메시지 처리
        //         if (err.response && err.response.status === 502) {
        //             alert("id 또는 password가 다릅니다, 다시 시도하세요.");
        //         } else {
        //             alert(`** onLoginSubmit 시스템 오류, err=${err}`);
        //         }
        //         navi("/Login");
        //     });

        console.log("API 호출 직전");  // 이 로그가 출력되는지 확인
        apiCall(url, 'POST', data, null)
            .then((response) => {
                console.log("API 호출 성공:", response);  // 응답 전체 출력
                console.log("응답 상태 코드:", response.status);  // 상태 코드 출력

                // 서버에서 200 OK 응답을 받았는지 확인
                if (response.status === 200) {
                    alert('로그인 성공');
                    sessionStorage.setItem("inputId", JSON.stringify(response.data));  // response.data 사용
                    setIsLoggedIn(true); //-> 상태값 미변화로 인한 이동제한이 원인일 수 있어 넣어둠 
                    sessionStorage.setItem("isLoggedIn", "true");
                    console.log("네비 이동 직전임");
                    navi('/');  // 홈으로 이동
                    console.log("네비 이동 후");
                } else {
                    throw new Error("로그인 실패: 잘못된 응답 코드");
                }
            })
            .catch((err) => {
                console.log("로그인 중 오류 발생:", err);

                // 상태 코드로 에러 메시지 처리
                if (err.response && err.response.status === 502) {
                    alert("id 또는 password가 다릅니다, 다시 시도하세요.");
                } else {
                    alert(`** onLoginSubmit 시스템 오류, err=${err}`); //=> nullException이 발생함으로 여기로 에러가 떨어짐 

                }
                setIsLoggedIn(false);
                setLoginInfo('');
                //navi("/Login");
            });

        console.log("함수 탈출");

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
