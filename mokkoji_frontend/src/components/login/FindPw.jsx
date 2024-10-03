import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import userInfo from "./UserInforData";
import '../../css/login/FindPw.css';
import { apiCall } from "../../service/apiService";


const FindPw = () => {
    const labelPNRef = useRef(null);
    const inputPNRef = useRef(null);

    const labelIdRef = useRef(null);
    const inputIdRef = useRef(null);

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
    const userFindIdInfo = useRef({
        userId: '',
        PhoneNumber: ''
    });

    const userFindPwIdErrors = useRef({
        userId: '',
        PhoneNumber: ''
    });

    const [forceUpdater, forceUpdate] = useState(false);
  
  
  
  
    // const onChangeInputInfo = (e) => {
    //     forceUpdate(!forceUpdater); // 랜더링 위한 임의의 콜백함수 
    //     const { name, value } = e.target;
    //     userFindIdInfo.current[name] = value;

    //     if (name === 'userId') {
    //         const noneId = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$/;
    //         const isValidId = noneId.test(value);
    //         if (isValidId === false) {
    //             inputIdRef.current.style.borderBottom = '1px solid red'
    //             userFindPwIdErrors.current.userId = false;
    //         }
    //         else {
    //             inputIdRef.current.style.borderBottom = '1px solid #aaaaaa'
    //             userFindPwIdErrors.current.userId = true;
    //         }
    //     }

    //     if (name === 'PhoneNumber') {
    //         const noneNumber = /[^0-9]/g;
    //         const isValidPhoneNumber = !noneNumber.test(value);
    //         if (!isValidPhoneNumber) {
    //             alert('-을 제외한 숫자만 입력해주세요');
    //             inputPNRef.current.value = '';
    //             userFindPwIdErrors.current.PhoneNumber = false;
    //             setAlertShown(false);
    //         }
    //         else {
    //             userFindPwIdErrors.current.PhoneNumber = true;
    //             setAlertShown(true);
    //         }
    //     }

    // }







    const [findinguserinfo, setFindinguserinfo] = useState({
        findingPw: '',
        findingName: ''
    });


 // 유저 아이디, 전화번호 유효성 조건  
 const checkID =  /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$/;
 const checkPN = /^\d{2,5}-\d{3,4}-\d{4}$/;

    // 비밀번호 찾기 버튼 눌렀을 경우 
    const UserFindPW = () => {
    // 클릭시 유효성 검사 
    const nameValue = inputIdRef.current.value;
    const isName = checkID.test(nameValue);
    const pwValue = inputPNRef.current.value;
    const isPW = checkPN.test(pwValue);
    
    if (isName== false){
      alert("⚠️ 아이디를 다시 입력하세요")
      inputIdRef.current.value='';
      inputPNRef.current.value='';
        return;
    } else if(isPW==false){
        alert("⚠️ -를 포함하여 핸드폰 번호를 다시 입력하세요")
        inputIdRef.current.value='';
        inputPNRef.current.value='';
        return;
    } 


        const url = '/Login/FindPw';
        const inputUserId = inputIdRef.current.value;
        const inputUserPN = inputPNRef.current.value;
        const data = {userId : inputUserId, phoneNumber :  inputUserPN}
        apiCall(url,"POST", data, null)
        .then((response)=>{
            console.log("비밀번호찾기 API 호출 성공:", response);  // 응답 전체 출력
            console.log("비밀번호찾기 응답 상태 코드:", response.status);  // 상태 코드 

            if(response.data==false){
                inputIdRef.current.value='';
                inputPNRef.current.value='';
                pRef.current.style.visibility = 'hidden'
                alert('⚠️ 입력하신 정보와 일치하는 회원 정보를 찾을 수 없습니다.')
            }else{
             
                console.log(response.data)
                setFindinguserinfo({
                                findingPw: response.data.email,
                                findingName: response.data.name
                            });
                            pRef.current.style.visibility = 'visible'
            }

        }).catch((err)=>{

            // 오류 발생 시 응답 객체에서 상태 코드를 확인
            if (err.response) {
                console.log("아이디 찾기  오류 응답 상태 코드:", err.response.status);  // 상태 코드 출력
            } else {
                console.log("아이디 찾기 응답 객체에 상태 코드가 없습니다:", err.message);
            }
        })
        // const allUserData = JSON.parse(localStorage.getItem('userInfo'));
        // if (!allUserData) {
        //     return;
        // }

        // const isCheck = Object.values(userFindPwIdErrors.current).every(value => value === true);
        // if (isCheck) {
        //     const userExistsName = allUserData.find(it => it.id === userFindIdInfo.current.userId);
        //     const userExistsPhoneNumber = allUserData.find(it => it.phoneNumber === userFindIdInfo.current.PhoneNumber);

        //     if (userExistsName && userExistsPhoneNumber) {
        //         setFindinguserinfo({
        //             findingPw: userExistsName.pw,
        //             findingName: userExistsName.name
        //         });
        //         pRef.current.style.visibility = 'visible'
        //     } else {
        //         pRef.current.style.visibility = 'hidden'
        //         alert('⚠️ 입력하신 정보와 일치하는 회원 정보를 찾을 수 없습니다.')
        //     }
        // } else {
        //     alert('⚠️ 조건에 맞게 정보를 다시입력해주세요')
        //     inputIdRef.current.value = '';
        //     inputPNRef.current.value = '';
        //     inputPNRef.current.style.borderBottom = '1px solid #aaaaaa';
        //     inputIdRef.current.style.borderBottom = '1px solid #aaaaaa';
        //     MoveToInLabel(labelIdRef, inputIdRef)
        //     MoveToInLabel(labelPNRef, inputPNRef)
        // }
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

                                <div>
                                    <p className="ptag" ref={pRef}><span className="showname">{findinguserinfo.findingName}</span>님의 이메일은 : <span className="showname">{findinguserinfo.findingPw}</span>입니다.</p>
                                </div>

                                <button onClick={UserFindPW}>비밀번호 찾기
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

export default FindPw;