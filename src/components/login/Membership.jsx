import { Link } from "react-router-dom";
import '../../css/login/Membership.css'
const minDate = 110;
const maxDate = 14;

const Membership = () => {

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
                                <input type="text" onClick={Membership} />

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
                                <label> 주소 </label>
                                <div className="adress">
                                    <input type="text" placeholder="우편번호" />
                                    <button>우편번호</button>
                                    <div className="adress-rowArea">
                                        <input type="text" placeholder="주소1" />
                                        <input type="text" placeholder="주소2" />
                                    </div>
                                </div>
                                <label>핸드폰 번호</label>
                                <input type="tel" />
                                <label>이메일</label>
                                <input type="email" />

                            </div>
                            <button className="joinus-button">회원가입</button>

                        </form>
                    </div>
                </div>
            </div>
        </div >
    );


}

export default Membership;