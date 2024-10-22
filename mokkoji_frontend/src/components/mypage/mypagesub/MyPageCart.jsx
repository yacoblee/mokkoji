import React, { useEffect, useState } from 'react';

import '../../../css/mypage/subpage/MyPageCart.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../../../service/app-config";
import { apiCall } from '../../../service/apiService';

function MyPageCart({ userMain, userCart, cartKeyList, cartCheckDelete, myPageCart, cartUpdate, cartDelete, onChangeChildCheckbox, checkedCartItems, setCheckedCartItems, cartCheckBoxChange }) {

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

    const insertOrder = async (cart) => {

        let token = JSON.parse(sessionStorage.getItem("userData"));

        // 구매하기 정보 추가할 항목 생성
        const sendBasket = {// 이형태는 Cart Entity구조 와 동일함
            userId: userMain.userId, // userId 를 찾아 보내줘야함.(String)
            productId: cart.productId, // 해당하는 productId를 찾아 보냄.(String)
            optionContent: cart.optionContent, // 해당하는 상품옵션내용(String)
            packagingOptionContent: cart.packagingOptionContent,//해당하는 포장옵션내용(String)
            productCnt: cart.productCnt,//해당하는 갯수(int)
            productTotalPrice: cart.productTotalPrice,//총계산을 마친 금액 (int)
        };
        // console.log(`${sendBasket.userId}`);
        // console.log(`${sendBasket.productId}`);
        // console.log(`${sendBasket.optionContent}`);
        // console.log(`${sendBasket.packagingOptionContent}`);
        // console.log(`${sendBasket.productCnt}`);
        // console.log(`${sendBasket.productTotalPrice}`);
        try {
            const response = await apiCall(`/order/page`, 'POST', sendBasket, token);
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
                    productBuy: cart
                }
            });
        } catch (error) {
            //setLike(false);
            // console.log(`insert order error =>${error.message}`)
            alert(`insertOrder 실패 => ${error.message}`);
        }
    }



    // 체크리스트를 들고 구매페이지로 이동
    const takeListToBuy = () => {
        navigate(`/buym`, {
            state: {
                checkedCartItems: checkedCartItems
            }
        })
    }



    // 각 장바구니 항목의 체크 상태를 관리하는 배열
    const [checkedItems, setCheckedItems] = useState(
        userCart.map(() => false)
    );

    // 체크박스 상태 변경 함수
    const onChangeCheckBox = (index, event) => {
        const isChecked = (event.target.checked);

        const item = userCart[index];

        // 해당 인덱스의 체크 상태를 업데이트
        setCheckedItems((it) => {
            const copyIschecked = [...it];
            copyIschecked[index] = isChecked;
            return copyIschecked;
        });



        // ㅁㄴㅇㄹ 추가된 부분
        setCheckedCartItems(prevItems => {
            if (isChecked) {
                return [...prevItems, item]
            } else {
                return prevItems.filter(cartItem =>
                    !(cartItem.productId === item.productId &&
                        cartItem.optionContent === item.optionContent &&
                        cartItem.packagingOptionContent === item.packagingOptionContent)
                );
            }
        });



        // 상위 컴포넌트에 상태 변경 알림
        onChangeChildCheckbox(isChecked, item);
    };



    // ㅁㄴㅇㄹ 해결된 부분
    // 전체 선택/해제 체크박스 처리
    const cartAllCheckBoxChange = (event) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            // 모두 선택
            const allCartKeys = userCart.map(cart => `${cart.productId}-${cart.optionContent}-${cart.packagingOptionContent}`);
            setCheckedItems(userCart.map(() => true));
            setCheckedCartItems(userCart); // 전체 선택된 항목을 checkedCartItems로 설정
        } else {
            // 모두 해제
            setCheckedItems(userCart.map(() => false));
            setCheckedCartItems([]); // 모든 항목 선택 해제
        }


    };

    return (

        <div className='MyCartList' >

            <div className='MyCartHeader'>

                <div >
                    <input
                        type="checkbox"
                        checked={checkedCartItems.length === userCart.length && userCart.length > 0}
                        //checked={cartKeyList.length === userCart.length}  // ㅁㄴㅇㄹ 삭데된 부분
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
                    userCart.map((cart, index) => {
                        const cartKey = `${cart.productId}-${cart.optionContent}-${cart.packagingOptionContent}`;

                        return (
                            <div className="MyCartGrid" key={index} >
                                <div className='MyCartCheck'>
                                    <input
                                        type="checkbox"
                                        checked={cartKeyList.includes(cartKey) || checkedItems[index]}
                                        value={+cart.productTotalPrice}
                                        onChange={(e) => {
                                            cartCheckBoxChange(cartKey);
                                            onChangeCheckBox(index, e);  // e 이벤트 객체를 onChangeCheckBox로 전달
                                        }}
                                    />
                                </div>
                                <div className="MyCartPhoto">
                                    <img src={`${API_BASE_URL}/resources/productImages/${cart.mainImageName}`} alt={cart.productId} />
                                </div>
                                <div className='MyCartInfo'>
                                    <h5>{cart.productName}</h5>
                                    <h5>{formatNumber(+cart.price)}</h5>
                                </div>
                                <div className='MyCartDetail'>
                                    <h5>{cart.optionContent}
                                        {+cart.optionPrice > 0 && `(+ ${formatNumber(+cart.optionPrice)}원 )`}
                                    </h5>
                                    <h5>{cart.packagingOptionContent}
                                        {+cart.packagingOptionPrice > 0 && `(+ ${formatNumber(+cart.packagingOptionPrice)}원 )`}
                                    </h5>
                                </div>
                                <div className='MyCartCount'>
                                    <div className='MyProductCount'>
                                        <img
                                            src="/images/buy/minus.png"
                                            alt="minus"
                                            onClick={() =>
                                                cart.productCnt === 1
                                                    ? alert('상품 수량은 1보다 적을 수 없습니다.')
                                                    : cartUpdate(`/mypage/cart/${cart.productId}/${cart.optionContent}/${cart.packagingOptionContent}/${cart.productCnt - 1}`)
                                            }
                                        />
                                        <input type="text" min={1} value={cart.productCnt} />
                                        <img src="/images/buy/plus.png" alt="plus" onClick={() =>
                                            cartUpdate(`/mypage/cart/${cart.productId}/${cart.optionContent}/${cart.packagingOptionContent}/${cart.productCnt + 1}`)} />
                                    </div>
                                </div>
                                <div className='MyCartButton'>
                                    <button
                                        className='buttonChange'
                                        onMouseEnter={() => handleMouseEnter(cartKey)}
                                        onMouseLeave={handleMouseLeave}
                                        // onclick으로 구매 연결 필요
                                        onClick={() => {
                                            if (cart.productCnt > cart.stockCount) {
                                                alert("상품 재고 부족으로 현재 구매가 불가능합니다.")
                                            } else {
                                                insertOrder(cart)
                                            }
                                        }}
                                    >
                                        {hoveredButton === (cartKey) ? '구매하기' : `${formatNumber(cart.productTotalPrice)} 원`}
                                    </button>
                                    <button onClick={() => { cartDelete(`/mypage/cart/${cart.productId}/${cart.optionContent}/${cart.packagingOptionContent}`) }}>
                                        삭제
                                    </button>
                                </div>
                            </div >  // mycartgird
                        )   // return
                    })  // map
                )}

            <div className='MyCartFooter'>

                <div>
                    <input
                        type="checkbox"
                        checked={checkedCartItems.length === userCart.length && userCart.length > 0}
                        //checked={cartKeyList.length === userCart.length}  // ㅁㄴㅇㄹ 삭제된 부분
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
