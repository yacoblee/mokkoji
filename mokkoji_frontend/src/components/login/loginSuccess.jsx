import userInfoData from "./UserInforData"; // import된 모듈 이름 변경

const LoginSuccess = () => {
    const loginOk = sessionStorage.getItem('LoginSuccess');
    const loginID = sessionStorage.getItem('LoginId');
    const loginPw = sessionStorage.getItem('LoginPw');
    const filteredUserInfoID = userInfoData.find(it => it.id == loginID && it.pw === loginPw);

    if (loginOk && filteredUserInfoID) {
        sessionStorage.setItem('Loginuserinfo', JSON.stringify(filteredUserInfoID));
    }


    return (
        <div>
            {loginOk}
        </div>
    );
}

export default LoginSuccess;