import React from "react";
import '../../css/login/Login.css';
import Membership from "./Membership";
import FindId from "./FindId";
import FindPw from "./FindPw";
import { Link } from 'react-router-dom'
import { useState } from "react";

let a = 3;

const Login = () => {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputePw] = useState('');

    const onChangeId = (e) => { setInputId(e.target.value) }
    const onChangePw = (e) => { setInputePw(e.target.value) }
    const isExistId = (inputId.length > 0);
    const isExistPw = (inputPw.length > 0);

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
                        <div className="inputArea">
                            <p>아이디</p>
                            <input type="text" value={inputId} onChange={onChangeId} />
                        </div>
                        <div className="inputArea">
                            <p>비밀번호</p>
                            <input type='password' value={inputPw} onChange={onChangePw} />
                        </div>
                        <p>아이디 또는 비밀번호를 다시 입력해주세요</p>
                        <button>로그인</button>
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

// import React, { useState, useRef, useEffect } from 'react';
// import '../../css/login/Login.css';
// import { Link } from 'react-router-dom';

// const Login = () => {
//     const [inputId, setInputId] = useState('');
//     const [inputPw, setInputPw] = useState('');
//     const inputRefs = useRef([]);
//     const labelRefs = useRef([]);

//     const addInputRef = (target) => {
//         if (target && !inputRefs.current.includes(target)) {
//             inputRefs.current.push(target);
//         }
//     };

//     const addLabelRef = (el) => {
//         if (el && !labelRefs.current.includes(el)) {
//             labelRefs.current.push(el);
//         }
//     };

//     const onChangeId = (e) => setInputId(e.target.value);
//     const onChangePw = (e) => setInputPw(e.target.value);

//     const IsExistValue = (input) => input.value.length > 0;

//     useEffect(() => {
//         inputRefs.current.forEach((input, i) => {
//             input.addEventListener("focus", () => {
//                 labelRefs.current[i].style.fontSize = '13px';
//                 labelRefs.current[i].style.top = '10px';
//             });

//             input.addEventListener("blur", () => {
//                 if (!IsExistValue(input)) {
//                     labelRefs.current[i].style.position = 'absolute';
//                     // labelRefs.current[i].style.left = '10px';
//                     labelRefs.current[i].style.top = '15px';
//                     labelRefs.current[i].style.fontSize = '20px';
//                 }
//             });
//         });
//     }, []);

//     return (
//         <div className="login-body">
//             <div className="login-Area">
//                 <div className="login_video">
//                     <video muted autoPlay loop >
//                         <source className="video" src="/images/login/login_.mp4" type="video/mp4" />
//                     </video>
//                 </div>
//                 <div className="textarea">
//                     <div className="login-imgBox">
//                         <Link to='/'><img src="/images/main/main1.png" alt="로고이미지" /></Link>
//                     </div>
//                     <h4>Welcome to MU:DS</h4>
//                     <form className="login-Box">
//                         <div className="inputArea">
//                             <label ref={addLabelRef} htmlFor="userId">아이디</label>
//                             <input
//                                 id="userId"
//                                 type="text"
//                                 value={inputId}
//                                 onChange={onChangeId}
//                                 ref={addInputRef}
//                             />
//                         </div>
//                         <div className="inputArea">
//                             <label ref={addLabelRef} htmlFor="userPw">비밀번호</label>
//                             <input
//                                 id="userPw"
//                                 type='password'
//                                 value={inputPw}
//
//                             />
//                         </div>
//                         <p>아이디 또는 비밀번호를 다시 입력해주세요</p>
//                         <button>로그인</button>
//                     </form>
//                     <ul>
//                         <li><Link to='/Login/Membership'>회원가입 | </Link></li>
//                         <li><Link to='/Login/FindId'>아이디 찾기 | </Link></li>
//                         <li><Link to='/Login/FindPw'>비밀번호 찾기</Link></li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;