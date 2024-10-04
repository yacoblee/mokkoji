import React, { useEffect, useState } from 'react';

import '../../../css/mypage/subpage/MyPageCart.css';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from "../../../service/app-config";

function MyPageCart({ userCart, cartKeyList, myPageCart, cartUpdate, cartDelete, cartCheckDelete, cartCheckBoxChange, cartAllCheckBoxChange }) {

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

    useEffect(() => {
        myPageCart("/mypage/cart")
    }, [])



    return (

        <div className='MyCartList' >

            <div className='MyCartHeader'>

                <div >
                    <input
                        type="checkbox"
                        checked={cartKeyList.length === userCart.length}
                        onChange={cartAllCheckBoxChange}
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
                        const cartKey = `${cart.productId}-${cart.optionContent}-${cart.packagingOptionContent}`;

                        return (
                            <div className="MyCartGrid" key={cartKey} >
                                <div className='MyCartCheck'>
                                    <input
                                        type="checkbox"
                                        checked={cartKeyList.includes(cartKey)}
                                        onChange={() => cartCheckBoxChange(cartKey)}
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
                                        onMouseEnter={() => handleMouseEnter(cartKey)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {hoveredButton === (cartKey) ? '구매하기' : `${formatNumber(cart.productTotalPrice)} 원`}
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
                        checked={cartKeyList.length === userCart.length}
                        onChange={cartAllCheckBoxChange}
                    />
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                    <button className='SelectDeleteButton' onClick={() => { cartCheckDelete("/mypage/cart") }} >선택 삭제</button>
                </div>
                <div>
                    <button className='SelectBuyButton' >선택 구매</button>
                </div>
            </div>


        </div >  // mycartlist

    );  // return
}

export default MyPageCart;
