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
    sessionStorage.removeItem('userDetail');
    sessionStorage.removeItem('goodsList');
    return {
        type: 'LOGOUT'
    };
};
