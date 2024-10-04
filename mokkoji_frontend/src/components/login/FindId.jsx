import { Link } from "react-router-dom";
import '../../css/login/FindId.css';
import { useRef, useState } from "react";
import userInfo from "./UserInforData";
import { apiCall } from "../../service/apiService";


const FindId = () => {
    const labeNameRed = useRef(null);
    const inputNameRef = useRef(null);

    const labelPNRed = useRef(null);
    const inputPNRef = useRef(null);

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


    const [findinguserinfo, setFindinguserinfo] = useState({
        findingPw: '',
        findingName: ''
    });

    const pRef2 = useRef(null);


    // 유저 이름, 전화번호 유효성 조건  
    const checkName =  /^[가-힣]+$/;
    const checkPN = /^\d{2,5}-\d{3,4}-\d{4}$/;


    const UserFindID = () => {
        // 클릭시 유효성 검사 
        const nameValue = inputNameRef.current.value;
        const isName = checkName.test(nameValue);
        const pwValue = inputPNRef.current.value;
        const isPW = checkPN.test(pwValue);
        
        if (isName== false){
          alert("⚠️ 이름을 다시 입력하세요")
            inputNameRef.current.value='';
            inputPNRef.current.value='';
            return;
        } else if(isPW==false){
            alert("⚠️ -를 포함하여 핸드폰 번호를 다시 입력하세요")
            inputNameRef.current.value='';
            inputPNRef.current.value='';
            return;
        } 
      
        // apicall 
        let url = '/Login/FindId'
        const data = {name : inputNameRef.current.value , phoneNumber : inputPNRef.current.value }
        apiCall(url,'POST', data, null)
        .then((response)=>{
            console.log("아이디 찾기 API 호출 성공:", response);  // 응답 전체 출력
            console.log("아이디 찾기 응답 상태 코드:", response.status);  // 상태 코드 출력

            if(response.status === 200){
                    setFindinguserinfo({
                    findingName: inputNameRef.current.value,
                    findingId: response.data
                });
                pRef.current.style.visibility = 'visible'
                pRef2.current.style.visibility = 'visible'
           }
        }).catch((err)=>{    
            console.log("아이디 찾기 중 오류발생 ", err);
            const errCode = err.data
            const errStatus = err.status;
            console.log(errCode);
            if(errStatus === 502){
                pRef.current.style.visibility = 'hidden';
                pRef2.current.style.visibility='hidden';
                inputNameRef.current.value='';
                inputPNRef.current.value='';
                alert(errCode);
            }
            else if (errStatus === 500 || errStatus === 404 ){
                pRef.current.style.visibility = 'hidden';
                pRef2.current.style.visibility='hidden';
                inputNameRef.current.value='';
                inputPNRef.current.value='';
                alert("⚠️ 서버에 문제가 발생하였습니다. 잠시 후 다시 시도해주세요");
            } else{
                console.log("아이디 찾기 응답 객체에 상태 코드가 없습니다 " , err.message);
                alert('⚠️ 네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }
        })
    };



    return (
        <div>
            <div className="findId-body">
                <div className="findId-Area">
                    <div className="boxshadowcontainer">
                        <div className="findID-imgBox">
                            <img className="findID-img" src="/images/login/mudsmembershippageimg.jpg" alt="아이디 찾기 이미지" />
                        </div>
                        <div className="findId-textarea">
                            <ul>
                                <Link to={'/'}><li>홈 &gt;</li></Link>
                                <Link to={'/Login'}><li>로그인 &gt;</li></Link>
                                <Link to={'/Login/FindId'}><li>아이디 찾기</li></Link>
                            </ul>
                            <div className="findId-imgBox"><Link to='/'><img src="/images/main/main1.png" alt="로고이미지" /></Link></div>
                            <h4>아래 개인 정보를 입력해주세요</h4>
                            <div className="findId-Box">
                                <div className="findId-inputArea">
                                    <label className="findId-label"
                                        ref={labeNameRed}
                                        onClick={() => LabelClick(inputNameRef)}
                                    >이름</label>
                                    <input type="text"
                                    placeholder="                                 공백없이 한글만 입력하세요"  
                                        maxLength={4}
                                        name="username"
                                        ref={inputNameRef}
                                        onFocus={() => MoveToOutLabel(labeNameRed)}
                                        onBlur={() => MoveToInLabel(labeNameRed, inputNameRef)} />
                                </div>
                                <div className="findId-inputArea">
                                    <label className="findId-label"
                                        ref={labelPNRed}
                                        onClick={() => LabelClick(inputNameRef)}
                                    >핸드폰 번호</label>
                                    <input type="text"
                                    placeholder="                                 - 포함하여 번호를 입력하세요"  
                                        ref={inputPNRef}
                                        name='PhoneNumber'
                                        maxLength={16}
                                        onFocus={() => MoveToOutLabel(labelPNRed)}
                                        onBlur={() => MoveToInLabel(labelPNRed, inputPNRef)} />
                                </div>
                                <div>
                                    <p className="ptag" ref={pRef}><span className="showname">{findinguserinfo.findingName}</span>님의 아이디는 : <span className="showname">{findinguserinfo.findingId}</span>입니다.</p>
                                    <p  ref={pRef2} className="goLogin"><Link to={'/Login'}><span className="find-span">
                                    로그인 페이지로 돌아가기</span></Link></p>
                                </div>

                                <button onClick={UserFindID}>아이디 찾기</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindId;