import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../../css/login/FindPw.css';
import { apiCall } from "../../service/apiService";
import axios from "axios";


const FindPw = () => {
    const labelPNRef = useRef(null);
    const inputPNRef = useRef(null);

    const labelIdRef = useRef(null);
    const inputIdRef = useRef(null);

    const navigate = useNavigate();
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



    // 버튼 활성 비활성 
    const userfindpwButton = useRef(null);

    // 유저 아이디, 전화번호 유효성 조건  
    const checkID = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$/;
    const checkPN = /^\d{2,5}-\d{3,4}-\d{4}$/;

    // 비밀번호 찾기 버튼 눌렀을 경우 
    const [dbData, setDBdata] = useState({ dbUserID: '' }); // 서버에서 받은 데이터를 저장하는 상태

    // dbData 상태가 변경될 때마다 콘솔에 출력
    useEffect(() => {
        if (dbData.dbUserID) {
            //onsole.log("프론트 저장: ", dbData);
        }
    }, [dbData]);

    const UserFindPW = (e) => {
        // 클릭 시 유효성 검사
        const nameValue = inputIdRef.current.value;
        const isName = checkID.test(nameValue);
        const pwValue = inputPNRef.current.value;
        const isPW = checkPN.test(pwValue);

        if (!isName) {
            alert("⚠️ 아이디를 다시 입력하세요");
            inputIdRef.current.value = '';
            inputPNRef.current.value = '';
            return;
        } else if (!isPW) {
            alert("⚠️ -를 포함하여 핸드폰 번호를 다시 입력하세요");
            inputIdRef.current.value = '';
            inputPNRef.current.value = '';
            return;
        }

        const url = 'http://localhost:8080/login/findPw';
        const inputUserId = inputIdRef.current.value;
        const inputUserPN = inputPNRef.current.value;
        const data = { userId: inputUserId, phoneNumber: inputUserPN };

        // axios로 POST 요청 전송
        axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                // console.log("비밀번호찾기 API 호출 성공:", response);  // 응답 전체 출력
                // console.log("비밀번호찾기 응답 상태 코드:", response.status);  // 상태 코드 출력

                // 정상적인 응답 처리 (200번대 응답)
                // console.log(response.data);
                setDBdata({
                    dbUserID: response.data.userId   // userId 값을 설정
                })
                navigate('/login/findPw/verifyCode', {
                    state: { dbUserID: response.data.userId }
                });

            })
            .catch((err) => {
                if (err.response) {
                    console.log("API 오류 응답 상태 코드:", err.response.status);  // 상태 코드 출력

                    if (err.response.status === 502) {
                        inputIdRef.current.value = '';
                        inputPNRef.current.value = '';
                        alert('⚠️ 입력하신 정보와 일치하는 회원 정보를 찾을 수 없습니다.');
                    } else {
                        alert('⚠️ 서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
                    }
                } else {
                    console.log("응답 객체에 상태 코드가 없습니다:", err.message);
                }
            });
    };
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
                                <Link to={'/Login'}><li>로그인 &gt;</li></Link>
                                <Link to={'/Login/FindPw/'}><li>비밀번호 찾기</li></Link>
                            </ul>
                            <div className="findId-imgBox"><Link to='/'><img src="/images/main/main1.png" alt="로고이미지" /></Link></div>
                            <h4>아래 개인 정보를 입력해주세요</h4>

                            <div className="findId-Box">
                                <div className="findId-inputArea">
                                    <label className="findId-label"
                                        ref={labelIdRef}
                                        onClick={() => LabelClick(inputPNRef)}
                                    >아이디</label>

                                    <input type="text"
                                        ref={inputIdRef}
                                        name='userId'
                                        maxLength={11}
                                        onFocus={() => MoveToOutLabel(labelIdRef)}
                                        onBlur={() => MoveToInLabel(labelIdRef, inputIdRef)} />
                                </div>
                                <div className="findId-inputArea">
                                    <label className="findId-label"
                                        ref={labelPNRef}
                                        onClick={() => LabelClick(inputPNRef)}
                                    >핸드폰 번호</label>

                                    <input type="text"
                                        maxLength={16}
                                        name="PhoneNumber"
                                        ref={inputPNRef}
                                        onFocus={() => MoveToOutLabel(labelPNRef)}
                                        onBlur={() => MoveToInLabel(labelPNRef, inputPNRef)} />
                                </div>

                                <button onClick={UserFindPW} ref={userfindpwButton} >비밀번호 찾기
                                </button>
                                <p>아이디가 기억나지 않는다면 <Link to={'/login/findId'} className="findIdLink">아이디 찾기</Link> 페이지로 이동해주세요</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindPw;