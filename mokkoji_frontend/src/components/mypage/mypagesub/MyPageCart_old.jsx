import React, { useEffect, useState } from 'react';

import '../../../css/mypage/subpage/MyPageCart.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../../../service/app-config";
import { apiCall } from '../../../service/apiService';

function MyPageCart({ userMain, userCart, cartKeyList, myPageCart, cartUpdate, cartDelete, cartCheckDelete, cartCheckBoxChange, cartAllCheckBoxChange }) {

    const navigate = useNavigate();

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

    const insertOrder = async (productId, optionContent, packagingOptionContent, productCnt, productTotalPrice) => {

        let token = JSON.parse(sessionStorage.getItem("userData"));

        // 구매하기 정보 추가할 항목 생성
        const sendBasket = {// 이형태는 Cart Entity구조 와 동일함
            userId: userMain.userId, // userId 를 찾아 보내줘야함.(String)
            productId: productId, // 해당하는 productId를 찾아 보냄.(String)
            optionContent: optionContent, // 해당하는 상품옵션내용(String)
            packagingOptionContent: packagingOptionContent,//해당하는 포장옵션내용(String)
            productCnt: productCnt,//해당하는 갯수(int)
            productTotalPrice: productTotalPrice,//총계산을 마친 금액 (int)
        };

        try {
            const response = await apiCall(`/order/cartpage`, 'POST', sendBasket, token);
            const { product, option, packaging, productBuy } = response.data; //(products Entity)(productOptions Entity)(packaing Entity)를 받아 state에 넣어줌.
            //setLike(liked);
            //alert(message);
            // console.log(product);
            // console.log(option);
            // console.log(packaging);
            // console.log(productBuy);
            //alert('insertOrder 성공');
            // 구매 페이지로 이동하며 선택한 옵션과 수량, 총 금액을 전달
            navigate(`/orderpage`, {
                state: {
                    productBuy: productBuy
                }
            });
        } catch (error) {
            //setLike(false);
            // console.log(`insert order error =>${error.message}`)
            alert(`insertOrder 실패`);
        }
    }



    const takeListToBuy = () => {
        navigate(`/buym`, {
            state: {
                cartKeyList: cartKeyList
            }
        })
    }



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
                                        onMouseEnter={() => handleMouseEnter(cartKey)}
                                        onMouseLeave={handleMouseLeave}
                                        // onclick으로 구매 연결 필요
                                        onClick={() => insertOrder(cart.productId, cart.optionContent, cart.packagingOptionContent, cart.productCnt, cart.productTotalPrice)}
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
                    <button
                        className='SelectBuyButton'
                        onClick={() => takeListToBuy()}
                    >선택 구매</button>
                </div>

            </div>


        </div >  // mycartlist

    );  // return
}

export default MyPageCart;
