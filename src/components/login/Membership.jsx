import { Link } from "react-router-dom";
import '../../css/login/Membership.css'
import { useRef, useState } from "react";
import userInfo from "./UserInforData";
const minDate = 110;
const maxDate = 14;

const Membership = () => {

    const [inputinfor, setinputinfo] = useState({
        index: '10',
        name: '',
        birth: '',
        address: '',
        gender: '',
        phoneNumber: '',
        email: '',
        emailtype: '',
        id: '',
        pw: ''
    });
    const [nameError, setNameError] = useState('');
    const inputError = useRef(null);
    const errorMeg = useRef(null)

    const userInputInforNameCheak = (e) => {
        const { name, value } = e.target;
        setinputinfo((prevState) => ({
            ...prevState,
            [name]: value
        })
        )

        const namePattern = /^[가-힣]{2,6}$/;
        if (name === 'name' && !namePattern.test(value)) {
            setNameError('이름은 2자에서 5자 사이의 한글이어야 합니다.');
            errorMeg.current.textContent= '이름은 2자에서 5자 사이의 한글이어야 합니다.';
            inputError.current.style.borderColor = 'red';

        } else {
            setNameError('');
            inputError.current.style.border = '1px solid #aaaaaa'
           
        }
    };

    console.log(inputinfor.name);

    return (
        <div className="membership-body">
            <div className="membership-container">
                <div className="boxshadowcontainer">
                    <div className="membership-img">
                        <img src="/images/login/mudsmembershippageimg.JPG" alt="로그인 페이지 이미지" />
                        <ul className="route">
                            <Link to='/'><li>홈&gt;</li></Link>
                            <Link to='/Login'><li>로그인&gt;</li></Link>
                            <Link to='/Login/Membership'><li>회원가입</li></Link>
                        </ul>
                    </div>

                    <div className="membership-textArea">


                        <h4>회원정보 입력</h4>
                        <form className="membership-form" action="">

                            <div className="grid-container">
                                <label> 이름 </label>
                                <input type="text"
                                    id="userInputId"
                                    name="name"
                                    value={inputinfor.name}
                                    ref={inputError}
                                    placeholder="2글자 이상 5글자 이하 글자를 입력해주세요"
                                    minLength={2}
                                    maxLength={5}
                                    onChange={userInputInforNameCheak}
                                    onBlur={}
                                />

                                <label> 성별 </label>
                                <div className="gender">
                                    <input type="radio" name="gender" value="man" checked /> 남
                                    <input type="radio" name="gender" value="woman" /> 여
                                </div>
                                <label> 아이디 </label>
                                <input type="text" />
                                <label> 비밀번호 </label>
                                <input type="password" />
                                <label> 비밀번호 확인 </label>
                                <input type="passWord" />
                                <label> 생년월일 </label>
                                <input type="date"
                                    id="inputBirthday"
                                    min={minDate}
                                    max={maxDate} />

                                <label className="columnsadd"> 주소 </label>

                                <div className="address-button">
                                    <input type="text" placeholder="우편번호" />
                                    <button>우편번호</button>
                                </div>

                                {/* <div className="adress-rowArea"> */}
                                <input type="text" placeholder="주소1" />
                                <input type="text" placeholder="주소2" />
                                {/* </div> */}

                                <label>핸드폰 번호</label>
                                <input type="tel" />
                                <label>이메일</label>
                                <input type="email" />

                            </div>
                            <button className="joinus-button">회원가입</button>
                            <p ref={errorMeg}></p>

                        </form>
                    </div>
                </div>
            </div>
        </div >
    );


}

export default Membership;