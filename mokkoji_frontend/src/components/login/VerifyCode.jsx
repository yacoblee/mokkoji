import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";
import '../../css/login/FindPw.css';
import axios from "axios";

const VerifyCode = () => {
    const labelCodeRef = useRef(null);
    const inputCodeRef = useRef(null);
    // 전달된 데이터가 state에 저장됨
    const location = useLocation(); // navigate로 전달된 state 받기
    const dbData = JSON.stringify(location.state);

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
    //console.log('프론트 저장 데이터 ' + dbData);

    // label과 input 포커스 기능 연결 
    const LabelClick = (inputRef) => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }
    //==============
    const pRef = useRef(null)
    const navigate = useNavigate();

    // 비밀번호 찾기 버튼 눌렀을 경우 
    const checkverifyCode = () => {
        const inputUserCode = inputCodeRef.current.value;
        const data = { userCode: inputUserCode }
        const url = 'http://localhost:8080/login/findPw/verifyCode';
        axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                //console.log("메일인증 호출 성공:", response.status);
                navigate('/login/findPw/verifyCode/resetPassword', {
                    state: dbData
                });
            
            })
            .catch((error) => {
                if (error.response) {
                    // 응답이 있는 경우 상태 코드를 로그에 출력
                    //console.log("응답 상태 코드:", error.response.status);

                    if (error.response.status == 502) {
                        alert("인증번호를 다시 입력하세요");
                        inputCodeRef.current.value = "";
                    } else {
                        alert("다른 에러가 발생했습니다: " + error.response.status);
                    }
                }
            });



    }
    return (
        <div>
            <div className="findId-body">
                <div className="findId-Area">
                    <div className="boxshadowcontainer">
                        <div className="findID-imgBox">
                            <img className="findID-img" src="/images/login/mudsmembershippageimg1.png" alt="아이디 찾기 이미지" />
                        </div>
                        <div className="findId-textarea">
                            <ul>
                                <Link to={'/'}><li>홈 &gt;</li></Link>
                                <Link to={'/login'}><li>로그인 &gt;</li></Link>
                                <Link to={'/login/findPw'}><li>비밀번호 찾기 &gt;</li></Link>
                                <Link to={'/login/findPw/verifyCode'}><li>인증번호 작성</li></Link>
                            </ul>
                            <div className="findId-imgBox"><Link to='/'><img src="/images/main/main1.png" alt="로고이미지" /></Link></div>
                            <h4>메일로 발송된 인증코드를 작성해주세요</h4>

                            <div className="findId-Box">
                                <div className="findId-inputArea">
                                    <label className="findId-label"
                                        ref={labelCodeRef}
                                        onClick={() => LabelClick(inputCodeRef)}
                                    >인증코드</label>

                                    <input type="text"
                                        ref={inputCodeRef}
                                        name='userId'
                                        maxLength={11}
                                        onFocus={() => MoveToOutLabel(labelCodeRef)}
                                        onBlur={() => MoveToInLabel(labelCodeRef, inputCodeRef)} />
                                </div>

                                <div>

                                </div>

                                <button onClick={checkverifyCode}>비밀번호 찾기
                                </button>

                                <p>아이디가 기억나지 않는다면 <Link to={'/Login/FindId'} className="findIdLink">아이디 찾기</Link> 페이지로 이동해주세요</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyCode;