import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/login/Membership.css';
import Clausearea01 from './Clausearea01'
import Clausearea02 from './Clausearea02';

const Membership = () => {
    return (
        <div className="body">
            <div className="bodycontainer">
                <div className="stickyarea">
                    <Link to={'/'}>
                        <div className="imgcontainer">
                            <img src="/images/main/main1.png" alt="로고이미지" />
                        </div>
                    </Link>
                    <h1>MU:DS </h1>
                    <h1>회원 가입 페이지</h1>
                    <br />
                    <p>에러 메세지</p>
                </div>
                <div className="container">
                    <div className="clausearea">
                        <h3>약관동의 및 개인정보처리방침</h3>

                        <h4>필수 약관동의(필수)</h4>
                        <Clausearea01 />
                        <div className='innerclausearea'>
                            <h5>이용약관에 동의합니다</h5>
                            <input type='radio'></input>
                        </div>

                        <h4>개인정보 수집 및 이용 동의(필수)</h4>
                        <Clausearea02 />
                        <div className='innerclausearea'>
                            <h5>이용약관에 동의합니다.</h5>
                            <input type='radio'></input>
                        </div>

                        <div className='innerclausearea'>
                            <h5>회원가입 약관에 모두 동의 합니다.</h5>
                            <input type='radio'></input>

                        </div>
                    </div>
                    <hr />

                    <h3>개인정보를 입력해주세요</h3>
                    <form className="formcontainer">
                        <label>이름</label>
                        <input type="text" />
                        <p>에러</p>
                        <label>아이디</label>
                        <div className="rowarea">
                            <input type="text" />
                            <button>아이디중복검사</button>
                        </div>
                        <p>에러</p>
                        <label>비밀번호</label>
                        <input type="text" />
                        <p>에러</p>
                        <label>비밀번호 확인</label>
                        <input type="text" />
                        <p>에러</p>
                        <label>주소</label>
                        <div className="rowarea address">
                            <input type="text" />
                            <button>우편번호 검색</button>
                        </div>
                        <input type="text" />
                        <input type="text" />
                        <p></p>
                        <label>전화번호</label>
                        <input type="text" />
                        <p>에러</p>
                        <label>성별</label>
                        <div className='genderbutton'>
                            <button>남성</button>
                            <button>여성</button>
                        </div>
                        <p></p>
                        <label>이메일</label>
                        <input type="text" />
                        <p>에러</p>
                        <div className='buttonarea'>
                            <button>가입하기</button>
                        </div>
                    </form>
                </div>
                <div className='route'>
                    <ul>
                        <Link to={'/'}><li>Home</li></Link>
                        <Link to={'/Login'}><li>Login</li></Link>
                        <Link to={'/Login/Membership'}><li>Membership</li></Link>
                    </ul>
                </div>
            </div>
        </div >
    );
}

export default Membership;
