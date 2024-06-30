import { Link } from "react-router-dom";
import '../../css/login/FindId.css';
import { useRef, useState } from "react";
import userInfo from "./UserInforData";


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

    const [userInputName, setUserInputName] = useState('');
    const [userInputPN, setUserInputPN] = useState('');

    const onChangeName = (e) => { setUserInputName(e.target.value) }
    const onChangePN = (e) => { setUserInputPN(e.target.value) }
    console.log(userInputName, userInputPN)
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
                                <Link to={'/'}><li>로그인 &gt;</li></Link>
                                <Link to={'/'}><li>아이디 찾기</li></Link>
                            </ul>
                            <div className="findId-imgBox"><Link to='/'><img src="/images/main/main1.png" alt="로고이미지" /></Link></div>
                            <h4>Finding ID</h4>

                            <div className="findId-Box">
                                <div className="findId-inputArea">
                                    <label className="findId-label"
                                        ref={labeNameRed}
                                        onClick={() => LabelClick(inputNameRef)}
                                    >이름</label>
                                    <input type="text"
                                        maxLength={4}
                               
                                        ref={inputNameRef}
                                        onChange={onChangeName}
                                        onFocus={() => MoveToOutLabel(labeNameRed)}
                                        onBlur={() => MoveToInLabel(labeNameRed, inputNameRef)} />
                                </div>
                                <div className="findId-inputArea">
                                    <label className="findId-label"
                                        ref={labelPNRed}
                                        onClick={() => LabelClick(inputNameRef)}
                                    >핸드폰 번호</label>
                                    <input type="text"
                                        ref={inputPNRef}
                                        maxLength={11}
                                        onChange={onChangePN}
                                        onFocus={() => MoveToOutLabel(labelPNRed)}
                                        onBlur={() => MoveToInLabel(labelPNRed, inputPNRef)} />
                                </div>
                                <div>
                                    <p>{userInfo.name}님의 아이디는 : {userInfo.id}입니다.</p>
                                </div>

                                <button>아이디 찾기</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindId;