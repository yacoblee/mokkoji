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
    const handleMouseEnter = (id) => {
        setHoveredButton(id);
    };

    // 버튼의 hover 상태를 해제하는 함수
    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    const [userCart, setUserCart] = useState([]);

    // Grid의 각 항목을 실행시킬때 필요한 데이터들을 가져옴
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



    return (
        <div className='MyCartList' >

            <div className='MyCartHeader'>

                <div >
                    <input
                        type="checkbox"
                    // onChange={handleCheckAll}
                    // checked={userCart.length > 0 && checkedGoods.length === userCart.length}
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
                        return (
                            <div className="MyCartGrid" key={cart.productId} >
                                <div className='MyCartCheck'>
                                    <input
                                        type="checkbox"
                                    // checked={checkedGoods.includes(cart.productId)}
                                    // onChange={() => handleCheckGood(cart.productId)}
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
                                        <img src="/images/buy/minus.png" />
                                        <input type="text" value={cart.productCnt} />
                                        <img src="/images/buy/plus.png" />
                                    </div>
                                </div>
                                <div className='MyCartButton'>
                                    <button
                                        className='buttonChange'
                                        onClick={() => onBuyEach(cart.productId)}
                                        onMouseEnter={() => handleMouseEnter(cart.productId)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {hoveredButton === cart.productId ? '구매하기' : `${formatNumber(cart.productTotalPrice)}원`}
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
                    // onChange={handleCheckAll}
                    // checked={userCart.length > 0 && checkedGoods.length === userCart.length}
                    />
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                    {/* <button className='SelectBuyButton' onClick={onBuy}>선택 구매</button> */}
                </div>
            </div>


        </div >  // mycartlist

    );  // return
}

export default MyPageCart;
