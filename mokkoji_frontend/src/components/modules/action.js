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
    sessionStorage.removeItem('LoginUserInfo');

    return {
        type: 'LOGOUT'
    };
};
