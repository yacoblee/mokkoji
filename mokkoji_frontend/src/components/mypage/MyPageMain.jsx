import '../../css/mypage/MyPageMain.css';

import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { API_BASE_URL } from "../../service/app-config";
import { getStorageData } from '../../service/apiService';
import { apiCall } from '../../service/apiService';
import axios from "axios";

import MyPageGrid from './MyPageGrid';

import MyPageLike from './mypagesub/MyPageLike';
import MyPageCart from './mypagesub/MyPageCart';
import MyPageReview from './mypagesub/MyPageReview';
import MyPageBook from './mypagesub/MyPageBook';
import MyPageOrders from './mypagesub/MyPageOrders';
import MyPageUser from './MyPageUser';

function MyPageMain() {

    const [userMain, setUserMain] = useState({});   //userMain은 객체
    const [favoritesCnt, setFavoritesCnt] = useState();
    const [cartCnt, setCartCnt] = useState();

    const [myPageNumber, setMyPageNumber] = useState(1);    // 첫 PageNation 번호(1페이지) = currentNum
    const [myPageMaker, setMyPageMaker] = useState({});



    // myPage로 넘어갈때 로그인된 사용자의 상세 정보를 담아서 이동
    const myPageMain = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'GET', null, userToken)
            .then((response) => {
                //alert(`** myPageMain 성공 url=${url}`);
                setUserMain(response.data);
                setFavoritesCnt(response.data.favoritesCnt);
                setCartCnt(response.data.cartCnt);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** myPageMain 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //myPageMain

    useEffect(() => {
        myPageMain("/mypage/user")
    }, [])



    // ** favorites ===============================================================================

    const [userFavorites, setUserFavorites] = useState([]);
    const [productIdList, setProductIdList] = useState([]); // State to store checked product IDs

    // favorites 데이터들을 가져옴
    const myPageLike = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));

        let pageSize = 5;

        axios.get(API_BASE_URL + url, {
            params: {
                size: pageSize,
                page: myPageNumber, // 페이지 값은 별도 관리
            },
            headers: {
                Authorization: `Bearer ${userToken}`, // JWT 토큰 추가
            }
        })
            .then(response => {
                setUserFavorites(response.data.favoritesDTOList);
                setMyPageMaker(response.data.pageMaker)
            })
            .catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** myPageLike 시스템 오류, err = ${err}`);
            });
    }; //myPageLike

    // 개별 삭제
    const favoritesDelete = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'DELETE', null, userToken)
            .then((response) => {
                // alert("삭제 성공");
                setUserFavorites(response.data);
                setFavoritesCnt(favoritesCnt - 1)
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** favoritesDelete 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //favoritesDelete

    // 체크 삭제
    const favoritesCheckDelete = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'DELETE', productIdList, userToken)
            .then((response) => {
                // alert(`${productIdList.length}개 삭제 성공`);
                setUserFavorites(response.data);
                setFavoritesCnt(favoritesCnt - productIdList.length)
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** favoritesCheckDelete 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //favoritesCheckDelete

    // 개별 체크박스
    const favoritesCheckBoxChange = (productId) => {
        if (productIdList.includes(productId)) {
            setProductIdList(productIdList.filter((id) => id !== productId));
        } else {
            setProductIdList([...productIdList, productId]);
        }
    };

    // 전체 체크박스
    const favoritesAllCheckBoxChange = () => {
        if (productIdList.length === userFavorites.length) {
            setProductIdList([]); // 전체 해제
        } else {
            const allProductId = userFavorites.map((favorite) => favorite.productId);
            setProductIdList(allProductId); // 전체 체크
        }
    };



    // ** cart ====================================================================================

    const [userCart, setUserCart] = useState([]);
    const [cartKeyList, setCartKeyList] = useState([]); // State to store checked cart Keys

    // Cart 데이터들을 가져옴
    const myPageCart = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'GET', null, userToken)
            .then((response) => {
                //alert(`** myPageCart 성공 url=${url}`);
                setUserCart(response.data);
                // console.log(response.data)
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** myPageCart 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //myPageCart

    // 수량 업데이트
    const cartUpdate = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'PATCH', null, userToken)
            .then((response) => {
                //alert(`** cartUpdate 성공 url=${url}`);
                setUserCart(response.data);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** cartUpdate 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //cartUpdate

    // 개별 삭제
    const cartDelete = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'DELETE', null, userToken)
            .then((response) => {
                // alert("삭제 성공");
                setUserCart(response.data);
                setCartCnt(cartCnt - 1)
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** cartDelete 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //cartDelete

    // 체크 삭제
    const cartCheckDelete = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'DELETE', cartKeyList, userToken)
            .then((response) => {
                // alert(`${cartKeyList.length}개 삭제 성공`);
                setUserCart(response.data);
                setCartCnt(cartCnt - cartKeyList.length)
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** cartCheckDelete 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //cartCheckDelete

    // 개별 체크박스
    const cartCheckBoxChange = (cartKey) => {
        if (cartKeyList.includes(cartKey)) {
            setCartKeyList(cartKeyList.filter((key) => key !== cartKey));
        } else {
            setCartKeyList([...cartKeyList, cartKey]);
        }
    };

    // 전체 체크박스
    const cartAllCheckBoxChange = () => {
        if (cartKeyList.length === userCart.length) {
            setCartKeyList([]); // 전체 해제
        } else {
            const allCartKey = userCart.map((cart) => `${cart.productId}-${cart.optionContent}-${cart.packagingOptionContent}`);
            setCartKeyList(allCartKey); // 전체 체크
        }
    };

    //장바구니 항목 체크 박스에 대해 정보를 저장할 배열 변수.
    // 이부분state cart로 가고 프롭스를 지워도 무방. ************************ -혜미가
    const [checkedCartItems, setCheckedCartItems] = useState([]);



    // ㅁㄴㅇㄹ 껍데기만 전달?
    // 장바구니 항목 체크박스 상태 변경 함수 // 하위컴포넌트로 프롭스로 전달.
    const onChangeChildCheckbox = (isChecked, items) => {
        //체크된 항목을 하위 컴포넌트로 전송하기 위한 배열 형성.

        // setCheckedCartItems(prevItems => {
        //     if (isChecked) {
        //         return [...prevItems, items]
        //     } else {
        //         return prevItems.filter(cartItem =>
        //             !(cartItem.productId === items.productId &&
        //                 cartItem.optionContent === items.optionContent &&
        //                 cartItem.packagingOptionContent === items.packagingOptionContent)
        //         );
        //     }
        // });
    };



    // ** review ==================================================================================

    const [userReview, setUserReview] = useState([]);

    // Review 데이터들을 가져옴
    const myPageReview = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'GET', null, userToken)
            .then((response) => {
                //alert(`** myPageReview 성공 url=${url}`);
                setUserReview(response.data);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** myPageReview 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //myPageReview



    // ** address =================================================================================

    const [userAddress, setUserAddress] = useState([]);

    // Address 데이터들을 가져옴
    const myPageAddress = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'GET', null, userToken)
            .then((response) => {
                //alert(`** myPageAddress 성공 url=${url}`);
                setUserAddress(response.data);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** myPageAddress 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //myPageAddress

    // 기본 주소지 변경 로직
    // myPage로 넘어갈때 로그인된 사용자의 상세 정보를 담아서 이동
    const changeDefaultAddress = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'PATCH', null, userToken)
            .then((response) => {
                //alert(`** changeDefaultAddress 성공 url=${url}`);
                setUserAddress(response.data);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** changeDefaultAddress 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //changeDefaultAddress

    // 개별 삭제
    const addressDelete = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'DELETE', null, userToken)
            .then((response) => {
                // alert("삭제 성공");
                setUserAddress(response.data);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** addressDelete 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //addressDelete



    // ** Orders ==================================================================================

    const [userOrders, setUserOrders] = useState([]);

    // List 불러오기
    const myPageOrders = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'GET', null, userToken)
            .then((response) => {
                //alert(`** myPageOrders 성공 url=${url}`);
                setUserOrders(response.data);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** myPageOrders 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //myPageOrders



    // ** Book ====================================================================================

    const [userRegist, setUserRegist] = useState([]);

    // List 불러오기
    const myPageRegist = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'GET', null, userToken)
            .then((response) => {
                //alert(`** myPageRegist 성공 url=${url}`);
                setUserRegist(response.data);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** myPageRegist 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //myPageRegist

    // 수량 업데이트
    const bookUpdateAdult = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'PATCH', null, userToken)
            .then((response) => {
                //alert(`** bookUpdateAdult 성공 url=${url}`);
                setUserRegist(response.data);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** bookUpdateAdult 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //bookUpdateAdult

    const bookUpdateTeen = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'PATCH', null, userToken)
            .then((response) => {
                //alert(`** bookUpdateTeen 성공 url=${url}`);
                setUserRegist(response.data);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** bookUpdateTeen 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //bookUpdateTeen

    // 개별 삭제
    const bookDelete = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'DELETE', null, userToken)
            .then((response) => {
                // alert("삭제 성공");
                setUserRegist(response.data);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** bookDelete 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //bookDelete




    return (
        <div className='MyPage'>
            <h1>
                <div>
                    <Link to='/mypage'>내 정보</Link>
                </div>
            </h1>

            <MyPageGrid favoritesCnt={favoritesCnt} cartCnt={cartCnt} />

            <Routes>
                <Route
                    path='/*'
                    element={<MyPageUser
                        userMain={userMain}
                        userAddress={userAddress}
                        myPageAddress={myPageAddress}
                        changeDefaultAddress={changeDefaultAddress}
                        addressDelete={addressDelete}
                        myPageMain={myPageMain}
                    />}
                />

                <Route
                    path='favorites'
                    element={<MyPageLike
                        userFavorites={userFavorites}
                        productIdList={productIdList}
                        myPageNumber={myPageNumber}
                        myPageMaker={myPageMaker}
                        myPageLike={myPageLike}
                        favoritesDelete={favoritesDelete}
                        favoritesCheckDelete={favoritesCheckDelete}
                        favoritesCheckBoxChange={favoritesCheckBoxChange}
                        favoritesAllCheckBoxChange={favoritesAllCheckBoxChange}
                        setMyPageNumber={setMyPageNumber}
                    />}
                />
                <Route
                    path='cart'
                    element={<MyPageCart
                        userMain={userMain}
                        userCart={userCart}
                        cartKeyList={cartKeyList}
                        checkedCartItems={checkedCartItems}
                        myPageCart={myPageCart}
                        cartUpdate={cartUpdate}
                        cartDelete={cartDelete}
                        onChangeChildCheckbox={onChangeChildCheckbox}
                        cartCheckDelete={cartCheckDelete}
                        cartCheckBoxChange={cartCheckBoxChange}
                        cartAllCheckBoxChange={cartAllCheckBoxChange}
                        setCheckedCartItems={setCheckedCartItems}   // ㅁㄴㅇㄹ 새로 추가된 부분(useState에서 Set도 보내기)
                    />}
                />
                <Route
                    path='orders'
                    element={<MyPageOrders
                        userOrders={userOrders}
                        myPageOrders={myPageOrders}
                    />}
                />
                <Route
                    path='review'
                    element={<MyPageReview
                        userReview={userReview}
                        myPageReview={myPageReview}
                    />}
                />
                <Route
                    path='book'
                    element={<MyPageBook
                        myPageRegist={myPageRegist}
                        bookUpdateAdult={bookUpdateAdult}
                        bookUpdateTeen={bookUpdateTeen}
                        bookDelete={bookDelete}
                        userRegist={userRegist}
                    />}
                />
            </Routes>
        </div>
    );
};

export default MyPageMain;
