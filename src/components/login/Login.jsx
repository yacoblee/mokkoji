import React from "react";
import '../../css/login/Login.css';
import Membership from "./Membership";
import { Link } from 'react-router-dom'
import FindId from "./FindId";


const Login = () => {

    return (
        <div className="login-Area">
            <div>
                <video className="login_video" muted autoPlay loop>
                    <source src="/images/login/login_.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="textarea">
                <h1><Link to='/'>MU:DS</Link></h1>
                <p>welcom to MU:DS</p>
                <p><Link to='/Login/Membership'>회원가입</Link></p>
                <p><Link to='/Login/FindId'>아이디 찾기</Link></p>
                <p><Link to='/Login/FindPw'>비밀번호찾기</Link></p>

            </div>

        </div>
    );
}

export default Login;