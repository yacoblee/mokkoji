import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import '../../css/login/FindPw.css';
import axios from "axios";


const ResetPassword = () => {
    const labelPWRef = useRef(null);
    const inputPWRef = useRef(null);

    const labelPWCheckRef = useRef(null);
    const inputPWCheckRef = useRef(null);

    const location = useLocation();
    let dbData = location.state;  // 전달된 dbData 객체

    // dbData가 문자열인지 확인 후, JSON 파싱
    if (typeof dbData === 'string') {
        dbData = JSON.parse(dbData);  // JSON 문자열을 객체로 변환
    }

    // 객체에서 dbUserID 추출
    const dbuserid = dbData?.dbUserID || "값이 없습니다";



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
    //==============
    const pRef = useRef(null)

    useEffect(() => {

    }, [dbuserid]);


    const navigate = useNavigate();
    // 유저 아이디, 전화번호 유효성 조건  
    const termsPW = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*]{7,14}$/;
    // 비밀번호 찾기 버튼 눌렀을 경우 
    const UserFindPW = () => {
        // 클릭시 유효성 검사 
        const inputPWvalue = inputPWRef.current.value;
        const inputCheck = termsPW.test(inputPWvalue);
        const inputDoubleCheckPW = inputPWvalue == inputPWCheckRef.current.value;
        if (!inputCheck) {
            alert("⚠️ 조건에 맞게 비밀번호를 다시 입력하세요");
            inputPWvalue = "";
        } else if (!inputDoubleCheckPW) {
            alert("⚠️ 입력한 비밀번호가 다릅니다. 다시 입력하세요");
            inputPWCheckRef.current.value = "";

        } else {
            const url = 'http://localhost:8080/login/findPw/verifyCode/resetPassword';
            const data = { userId: dbuserid, password: inputPWvalue, updatedAt: new Date().toISOString().slice(0, 10) };
            axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                // console.log("비밀번호찾기 API 호출 성공:", response);  // 응답 전체 출력
                // console.log("비밀번호찾기 응답 상태 코드:", response.status);  // 상태 코드 출력

                // 정상적인 응답 처리 (200번대 응답)
                //console.log(response.data);
                alert('비밀번호 변경 완료');
                navigate('/login');  // 상태가 맞으면 '/verifyCode'로 이동
            })
                .catch((err) => {
                    // 오류 발생 시 처리
                    if (err.response) {
                        console.log("API 오류 응답 상태 코드:", err.response);  // 상태 코드 출력

                        // 404 상태 코드 처리
                        if (err.response.status == 502) {
                            inputPWRef.current.value = '';
                            inputPWCheckRef.current.value = '';
                            alert('⚠️ 입력하신 정보와 일치하는 회원 정보를 찾을 수 없습니다.');
                        } else {
                            // 다른 상태 코드에 대한 처리
                            alert('⚠️ 서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
                        }
                    } else {
                        console.log("응답 객체에 상태 코드가 없습니다:", err.message);
                    }
                });
        }

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
                                <Link to={'/login/findPw'}><li>비밀번호 찾기&gt;</li></Link>
                                <Link to={'/login/findPw/verifyCode'}><li>인증코드 검증&gt;</li></Link>
                                <Link to={'/login/findPw/verifyCode/resetPassword'}><li>비밀번호 변경</li></Link>
                            </ul>
                            <div className="findId-imgBox"><Link to='/'><img src="/images/main/main1.png" alt="로고이미지" /></Link></div>
                            <h4>변경할 비밀번호를 입력하세요</h4>

                            <div className="findId-Box">
                                <div className="findId-inputArea">
                                    <label className="findId-label"
                                        ref={labelPWCheckRef}
                                        onClick={() => LabelClick(inputPWRef)}
                                    >비밀번호 입력</label>

                                    <input type="text"
                                        ref={inputPWCheckRef}
                                        name='userId'
                                        maxLength={11}
                                        onFocus={() => MoveToOutLabel(labelPWCheckRef)}
                                        onBlur={() => MoveToInLabel(labelPWCheckRef, inputPWCheckRef)} />
                                </div>
                                <div className="findId-inputArea">
                                    <label className="findId-label"
                                        ref={labelPWRef}
                                        onClick={() => LabelClick(inputPWRef)}
                                    >비밀번호 확인</label>

                                    <input type="text"
                                        maxLength={16}
                                        name="PhoneNumber"
                                        ref={inputPWRef}
                                        onFocus={() => MoveToOutLabel(labelPWRef)}
                                        onBlur={() => MoveToInLabel(labelPWRef, inputPWRef)} />
                                </div>

                                <div>

                                </div>

                                <button onClick={UserFindPW}>비밀번호 변경
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

export default ResetPassword;