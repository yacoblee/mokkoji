export const login = (userInfo) => {
    sessionStorage.setItem('isLoggedIn', true);
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    return {
        type: 'LOGIN',
        payload: userInfo
    };
};

export const logout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('goodsList');

    sessionStorage.removeItem('LoginId');
    sessionStorage.removeItem('LoginPw');
    sessionStorage.removeItem('LoginUserInfo'); // 기훈- 로그아웃 이후 잔류데이터 삭제용 코드 4줄입니다... 근데 LoginSuccess는 손봐야할듯요

    return {
        type: 'LOGOUT'
    };
};
