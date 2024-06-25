import { Link } from "react-router-dom";
import '../../css/login/Membership.css';
import { useRef, useState } from "react";
import userInfo from "./UserInforData";

const Membership = () => {

    return (
        <div className="Body">
            <div className="text">
            {/* <div className="logo-imgBox"><Link to='/'><img src="/images/main/main1.png" alt="로고이미지" /></Link></div> */}
                <h1>회원가입</h1>
                <ul className="navi">
                    <li>홈 &gt;</li>
                    <li>로그인 &gt;</li>
                    <li>회원가입 </li>
                </ul>
                <form className="membership-form">
                    <div className="grid-container">

                        <label > 이름 </label>
                        <div className="columnadd">
                            <input type="text" name="name" />
                            <p className="error">에러</p>

                        </div>

                        <label> 성별 </label>
                        <div className="columnadd gender">
                            <input type="radio" name="gender" value="man" /> 남
                            <input type="radio" name="gender" value="woman" /> 여
                        </div>

                        <label> 아이디 </label>
                        <div className="center columnadd">
                            <input type="text" name="id" />
                            <button>중복검색</button>
                            <p className="error">에러</p>
                        </div>


                        <label> 비밀번호 </label>
                        <div className="columnadd">
                            <input type="password" name="pw" />
                            <p className="error">에러</p>
                        </div>

                        <label> 비밀번호 확인 </label>
                        <div className="columnadd">
                            <input type="password" name="confirmPw" />
                            <p className="error">에러</p>
                        </div>

                        <label> 생년월일 </label>
                        <div className="columnadd">
                            <input type="date" name="birth" />
                            <p className="error">에러</p>
                        </div>

                        <label className="address"> 주소 </label>
                        <div className="columnadd">
                            <input className="center" type="text" name="address" placeholder="우편번호" />
                            <button>우편번호</button>
                        </div>

                        <div className="columnadd">
                            <input type="text" name="addressDetail" placeholder="주소1" />
                        </div>

                        <div className="columnadd">
                            <input className="columnadd" type="text" name="addressDetail2" placeholder="주소2" />
                            <p className="error columnadd">에러</p>
                        </div>

                        <label> 핸드폰 번호 </label>
                        <div className="columnadd">
                            <input type="tel" name="phoneNumber" />
                            <p className="error">에러</p>
                        </div>
                    </div>
                    <div className="btnArea">
                    <button className="btn add" type="submit">회원가입</button>
                    </div>

                </form>

            </div>

        </div>
    );
};

export default Membership;
