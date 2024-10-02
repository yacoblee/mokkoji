import React, { useEffect, useState } from 'react';

import '../../../css/mypage/subpage/MyPageCart.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../../../service/app-config";
import { apiCall } from '../../../service/apiService';

function MyPageCart({ change, setChange }) {

    // 숫자를 금액처럼 표기하기
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    };

    // 여러 개의 버튼에 대해 hover 상태를 관리할 수 있도록 상태 배열 사용
    const [hoveredButton, setHoveredButton] = useState(null);

    // 버튼의 hover 상태를 설정하는 함수
    const handleMouseEnter = (key) => {
        setHoveredButton(key);
    };

    // 버튼의 hover 상태를 해제하는 함수
    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    const [userCart, setUserCart] = useState([]);
    const [cartKeyList, setCartKeyList] = useState([]); // State to store checked cart Keys

    // Cart 데이터들을 가져옴
    const myPageCart = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        apiCall(url, 'GET', null, userToken)
            .then((response) => {
                //alert(`** myPageCart 성공 url=${url}`);
                setUserCart(response.data);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** myPageCart 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //myPageCart

    useEffect(() => {
        myPageCart("/mypage/cart")
    }, [])

    // 수량 업데이트
    const cartUpdate = (url) => {
        let userToken = JSON.parse(sessionStorage.getItem("userData"));
        console.log(url)
        apiCall(url, 'GET', null, userToken)
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
                //alert(`** cartDelete 성공 url=${url}`);
                setUserCart(response.data);
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
                //alert(`** cartCheckDelete 성공 url=${url}`);
                setUserCart(response.data);
            }).catch((err) => {
                if (err === 502) {
                    alert(`처리도중 오류 발생, err = ${err}`);
                } else if (err === 403) {
                    alert(`Server Reject : 접근권한이 없습니다. => ${err}`);
                } else alert(`** cartCheckDelete 시스템 오류, err = ${err}`);
            }) //apiCall
    }; //cartCheckDelete

    // 개별 체크박스
    const handleCheckboxChange = (cartKey) => {
        if (cartKeyList.includes(cartKey)) {
            setCartKeyList(cartKeyList.filter((key) => key !== (key.productId === cartKey.productId && key.optionContent === cartKey.optionContent && key.packagingOptionContent === cartKey.packagingOptionContent)));
        } else {
            setCartKeyList([...cartKeyList, cartKey]);
        }
    };

    // 전체 체크박스
    const handleAllCheckboxChange = () => {
        if (cartKeyList.length === userCart.length) {
            setCartKeyList([]); // 전체 해제
        } else {
            const allCartKey = userCart.map((cart) => cart.cartKey);
            setCartKeyList(allCartKey); // 전체 체크
        }
    };



    return (

        <div className='MyCartList' >

            <div className='MyCartHeader'>

                <div >
                    <input
                        type="checkbox"
                    // checked={cartKeyList.length === userCart.length}
                    // onChange={handleAllCheckboxChange}
                    />
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>


            {userCart.length === 0 ?
                (
                    <div className='TextNoItems'>
                        <h2>장바구니에 상품이 존재하지 않습니다.</h2>
                        <div>
                            <Link to='/goods'>
                                굿즈 둘러보러 가기
                            </Link>
                        </div>
                    </div>
                ) :
                (
                    userCart.map((cart) => {
                        const cartKey = {
                            productId: cart.productId,
                            optionContent: cart.optionContent,
                            packagingOptionContent: cart.packagingOptionContent
                        };

                        return (
                            <div className="MyCartGrid" key={cartKey} >
                                <div className='MyCartCheck'>
                                    <input
                                        type="checkbox"
                                        checked={cartKeyList.includes(cartKey)}
                                        onChange={() => handleCheckboxChange(cartKey)}
                                    />
                                </div>
                                <div className="MyCartPhoto">
                                    <img src={`${API_BASE_URL}/resources/productImages/${cart.mainImageName}`} alt={cart.productId} />
                                </div>
                                <div className='MyCartInfo'>
                                    <h5>{cart.productName}</h5>
                                </div>
                                <div className='MyCartDetail'>
                                    <h5>{cart.optionContent}</h5>
                                    <h5>{cart.packagingOptionContent}</h5>
                                </div>
                                <div className='MyCartCount'>
                                    <div className='MyProductCount'>
                                        <img src="/images/buy/minus.png" alt="minus" onClick={() =>
                                            cartUpdate(`/mypage/cart/${cart.productId}/${cart.optionContent}/${cart.packagingOptionContent}/${cart.productCnt - 1}/${cart.productTotalPrice}`)} />
                                        <input type="text" min={1} value={cart.productCnt} />
                                        <img src="/images/buy/plus.png" alt="plus" onClick={() =>
                                            cartUpdate(`/mypage/cart/${cart.productId}/${cart.optionContent}/${cart.packagingOptionContent}/${cart.productCnt + 1}/${cart.productTotalPrice}`)} />
                                    </div>
                                </div>
                                <div className='MyCartButton'>
                                    <button
                                        className='buttonChange'
                                        // onclick으로 구매 연결 필요
                                        onMouseEnter={() => handleMouseEnter(cartKey.productId + cartKey.optionContent + cartKey.packagingOptionContent)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {hoveredButton === (cartKey.productId + cartKey.optionContent + cartKey.packagingOptionContent) ? '구매하기' : `${formatNumber(cart.productTotalPrice)} 원`}
                                    </button>
                                    <button onClick={() => cartDelete(`/mypage/cart/${cart.productId}/${cart.optionContent}/${cart.packagingOptionContent}`)}>삭제</button>
                                </div>
                            </div >  // mycartgird
                        )   // return
                    })  // map
                )}

            <div className='MyCartFooter'>

                <div>
                    <input
                        type="checkbox"
                    />
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                    <button className='SelectDeleteButton' onClick={() => { cartCheckDelete('') }} >선택 삭제</button>
                </div>
                <div>
                    <button className='SelectBuyButton' >선택 구매</button>
                </div>
            </div>


        </div >  // mycartlist

    );  // return
}

export default MyPageCart;
