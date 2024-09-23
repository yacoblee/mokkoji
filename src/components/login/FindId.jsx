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
    //==============
    const pRef = useRef(null)
    const userFindIdInfo = useRef({
        username: '',
        PhoneNumber: ''
    });

    const userFindIdIdErrors = useRef({
        username: '',
        PhoneNumber: ''
    });

    const [forceUpdater, forceUpdate] = useState(false);
    const [alertShown, setAlertShown] = useState(false);// alket창 1번만 발생시키기 위한 함수 
    const onChangeInputInfo = (e) => {
        forceUpdate(!forceUpdater); // 랜더링 위한 임의의 콜백함수 
        const { name, value } = e.target;
        userFindIdInfo.current[name] = value;

        if (name === 'username') {
            const noneUserName = /^[가-힣]+$/;
            const nameIsString = noneUserName.test(value);
            if (nameIsString === false) {
                inputNameRef.current.style.borderBottom = '1px solid red'
                userFindIdIdErrors.current.username = false;
            }
            else {
                inputNameRef.current.style.borderBottom = '1px solid #aaaaaa'
                userFindIdIdErrors.current.username = true;
            }
        }



        if (name === 'PhoneNumber') {
            const noneNumber = /[^0-9]/g;
            const isValidPhoneNumber = !noneNumber.test(value);
            if (!isValidPhoneNumber) {
                alert('-을 제외한 숫자만 입력해주세요');
                inputPNRef.current.value = '';
                userFindIdIdErrors.current.PhoneNumber = false;
                setAlertShown(false);
            }
            return;
        }
        else {
            userFindIdIdErrors.current.PhoneNumber = true;
            setAlertShown(true);
        }
    }

    const [findinguserinfo, setFindinguserinfo] = useState({
        findingPw: '',
        findingName: ''
    });

    const pRef2 = useRef(null);

    const UserFindID = () => {
        const allUserData = JSON.parse(localStorage.getItem('userInfo'));
        if (!allUserData) {
            return;
        }

        const isCheck = Object.values(userFindIdIdErrors.current).every(value => value === true);
        if (isCheck) {
            const userExistsName = allUserData.find(it => it.name === userFindIdInfo.current.username);
            const userExistsPhoneNumber = allUserData.find(it => it.phoneNumber === userFindIdInfo.current.PhoneNumber);

            if (userExistsName && userExistsPhoneNumber && userExistsName.name === userExistsPhoneNumber.name) {
                setFindinguserinfo({
                    findingName: userExistsName.name,
                    findingId: userExistsName.id
                });
                pRef.current.style.visibility = 'visible'
                pRef2.current.style.visibility = 'visible'

            } else {
                pRef.current.style.visibility = 'hidden'
                pRef2.current.style.visibility='hidden'
                alert('⚠️ 입력하신 정보와 일치하는 회원 정보를 찾을 수 없습니다.')
            }
        } else {
            alert('⚠️ 조건에 맞게 정보를 다시입력해주세요')
            inputPNRef.current.value = '';
            inputNameRef.current.value = '';
            inputNameRef.current.style.borderBottom = '1px solid #aaaaaa';
            inputPNRef.current.style.borderBottom = '1px solid #aaaaaa';
            MoveToInLabel(labelPNRed, inputPNRef)
            MoveToInLabel(labeNameRed, inputNameRef)
        }
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
                                        maxLength={4}
                                        name="username"
                                        ref={inputNameRef}
                                        onChange={onChangeInputInfo}
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
                                        name='PhoneNumber'
                                        maxLength={11}
                                        onChange={onChangeInputInfo}
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