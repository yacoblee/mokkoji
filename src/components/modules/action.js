export const login = (userInfo) => {
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    return {
        type: 'LOGIN',
        payload: userInfo
    };
};

export const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInfo');
    return {
        type: 'LOGOUT'
    };
};