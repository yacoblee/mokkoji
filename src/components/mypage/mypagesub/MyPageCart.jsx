import React, { useEffect, useState } from 'react';

import '../../../css/mypage/subpage/MyPageCart.css';
import { Link, useNavigate } from 'react-router-dom';

import items from '../../product/ProductObject'

function MyPageCart({ change, setChange }) {

    const userData = JSON.parse(sessionStorage.getItem("LoginUserInfo"));
    // const items = JSON.parse(sessionStorage.getItem("goodsList"));

    const [user, setUser] = useState(userData)


    // 숫자를 금액처럼 표기하기
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    };


    // 사진 이름 id 기타 정보(수량, 가격)들 가져오는 새로운 출력용 객체
    let cartGoods = user.mypage.basket.map((bb) => {
        let findItem = items.find((item) =>
            item.id === bb.productId
        );     // findItem

        let calculateTotalPrice = () => {
            let price = findItem.price;
            let packagingPrice = 0; // 포장 추가 금액
            let contentPrice = 0; // 기본 추가 금액

            const packagingStartIndex = bb.options.packagingSelect.indexOf('(+');
            const packagingEndIndex = bb.options.packagingSelect.indexOf('원)');
            const contentSelectStartIndex = bb.options.contentSelect.indexOf('(+');
            const contentSelectEndIndex = bb.options.contentSelect.indexOf('원)');

            // 포장 옵션에 따라 추가 금액 설정
            if (packagingStartIndex !== -1 && packagingEndIndex !== -1) {
                packagingPrice = +(bb.options.packagingSelect.slice(packagingStartIndex + 2, packagingEndIndex))
            }

            // 내용 옵션에 따라 추가 금액 설정
            if (contentSelectStartIndex !== -1 && contentSelectEndIndex !== -1) {
                contentPrice = +(bb.options.contentSelect.slice(contentSelectStartIndex + 2, contentSelectEndIndex));
            }

            const totalPrice = (price + contentPrice) * bb.count + packagingPrice * bb.count;
            return totalPrice;
        }

        bb.totalPrice = calculateTotalPrice(findItem);

        let cartItem = {}

        cartItem.photo = findItem.productSrc[0]
        cartItem.id = bb.productId
        cartItem.name = findItem.name
        cartItem.content = bb.options.contentSelect
        cartItem.package = bb.options.packagingSelect
        cartItem.count = bb.count
        cartItem.price = bb.totalPrice


        return cartItem;
    });     // map


    // 이 아래로 checkbox 전체선택 + 선택 상품 구매 로직
    const [checkedGoods, setCheckedGoods] = useState([]);

    const handleCheckAll = (e) => {
        if (e.target.checked) {
            setCheckedGoods(cartGoods.map(goods => goods.id));
        } else {
            setCheckedGoods([]);
        }
    };

    const handleCheckGood = (id) => {
        setCheckedGoods(prechecked => prechecked.includes(id) ? prechecked.filter(goodsId => goodsId !== id) : [...prechecked, id])
    }

    let newCheckedGoods = []

    useEffect(() => {
        checkedGoods.map((id) => {
            let findBasket = user.mypage.basket.find((bk) =>
                bk.productId === id
            );      // findBasket

            newCheckedGoods.push(findBasket)
            console.log(newCheckedGoods)

        })
    }, [checkedGoods]);

    const navigate = useNavigate();


    // 선택 상품 구매 함수
    const onBuy = () => {
        if (!newCheckedGoods || newCheckedGoods.length === 0) {
            alert('선택된 상품이 존재하지 않습니다.');
            return;
        }

        navigate('/buy', {
            state: {
                newCheckedGoods: newCheckedGoods
            }
        });
    }


    // 개별 상품 구매 함수
    let onBuyEach = (id) => {
        // 구매 페이지로 넘어가는 상품의 최종 정보를 담는 단일 객체 findData
        let findData = cartGoods.find((item) =>
            item.id == id
        );

        // url로 넘어가는 category, id 찾기 위해서 만든 단일 객체 product
        let product = items.find((item) =>
            item.id == findData.id
        )

        console.log(findData)

        navigate(`/goods/${product.category}/${product.id}/buy`, {
            state: {

                options: {
                    contentSelect: findData.content,
                    packagingSelect: findData.package
                },
                count: findData.count,
                totalPrice: findData.price
            }
        });
    }


    // 삭제 버튼 로직(id값만 비교)
    const handleDelete = (delId) => {        // 해당 번호가 없어진 새로운 찜 목록 배열을 생성
        const newCartItem = cartGoods.filter((item) =>
            item.id !== delId
        )

        let newCartId = newCartItem.map((item) =>
            item.id
        )

        let newBasket = user.mypage.basket.filter(item =>
            newCartId.includes(item.productId)
        );

        let newMyPage = {
            ...user.mypage,
            basket: newBasket
        };

        let newUser = {
            ...user,
            mypage: newMyPage
        };

        sessionStorage.setItem("LoginUserInfo", JSON.stringify(newUser));

        setUser(newUser);
        setChange(!change);     // MyPageIndex에 대한 전체 렌더링
    }   // handleDelete


    // 이하 개수 변경 로직, 하지만 totalprice는 상수로 주어졌기 때문에 변경되지 않음. 추후 계산식 필요
    // 상품 개수 변경 로직
    const changeProductCount = (cartId, variation) => {
        const newBasket = user.mypage.basket.map((item) => {
            if (item.productId === cartId) {

                if (variation === 'decrease') {
                    if (item.count === 1)
                        alert('상품 개수 경고');
                    else
                        item.count = item.count - 1;
                } else if (variation === 'increase')
                    item.count = item.count + 1
            }
            return item;
        }
        )   // newBasket.map

        const updatedMypage = {
            ...user.mypage,
            basket: newBasket
        }

        const updatedUser = {
            ...user,
            mypage: updatedMypage
        }

        console.log(`${JSON.stringify(updatedUser)}`)
        sessionStorage.setItem("LoginUserInfo", JSON.stringify(updatedUser));

        setUser(updatedUser);
    }   // changeProductCount

    // 포장 개수 변경 로직
    /*
    const changePackageCount = (cartId, variation) => {
        const newBasket = user.mypage.basket.map((item) => {
            if (item.productId === cartId) {

                if (variation === 'decrease') {
                    if (item.quantity.packagingSelect === 1)
                        alert('포장 개수 경고');
                    else
                        item.quantity.packagingSelect = item.quantity.packagingSelect - 1;
                } else if (variation === 'increase')
                    item.quantity.packagingSelect = item.quantity.packagingSelect + 1
            }
            return item;
        }
        )   // newBasket.map

        const updatedMypage = {
            ...user.mypage,
            basket: newBasket
        }

        const updatedUser = {
            ...user,
            mypage: updatedMypage
        }

        console.log(`${JSON.stringify(updatedUser)}`)
        sessionStorage.setItem("LoginUserInfo", JSON.stringify(updatedUser));

        setUser(updatedUser);
    }   // changePackageCount
    */


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


    return (
        <div className='MyCartList' >

            <div className='MyCartHeader'>

                <div >
                    <input
                        type="checkbox"
                        onChange={handleCheckAll}
                        checked={cartGoods.length > 0 && checkedGoods.length === cartGoods.length}
                    />
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>


            {cartGoods.length === 0 ?
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
                    cartGoods.map((goods) => {
                        return (
                            <div className="MyCartGrid" key={goods.id} >
                                <div className='MyCartCheck'>
                                    <input
                                        type="checkbox"
                                        checked={checkedGoods.includes(goods.id)}
                                        onChange={() => handleCheckGood(goods.id)}
                                    />
                                </div>
                                <div className="MyCartPhoto">
                                    <img src={goods.photo} alt={goods.name} />
                                </div>
                                <div className='MyCartInfo'>
                                    <h5>{goods.name}</h5>
                                </div>
                                <div className='MyCartDetail'>
                                    <h5>{goods.content}</h5>
                                    <h5>{goods.package}</h5>
                                </div>
                                <div className='MyCartCount'>
                                    <div className='MyProductCount'>
                                        <img src="/images/buy/minus.png" onClick={() => changeProductCount(goods.id, 'decrease')} />
                                        <input type="text" value={goods.count} />
                                        <img src="/images/buy/plus.png" onClick={() => changeProductCount(goods.id, 'increase')} />
                                    </div>
                                </div>
                                <div className='MyCartButton'>
                                    <button
                                        className='buttonChange'
                                        onClick={() => onBuyEach(goods.id)}
                                        onMouseEnter={() => handleMouseEnter(goods.id)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {hoveredButton === goods.id ? '구매하기' : `${formatNumber(goods.price)}원`}
                                    </button>
                                    <button onClick={() => handleDelete(goods.id)}>삭제</button>
                                </div>
                            </div >  // mycartgird
                        )   // return
                    })  // map
                )}

            <div className='MyCartFooter'>

                <div>
                    <input
                        type="checkbox"
                        onChange={handleCheckAll}
                        checked={cartGoods.length > 0 && checkedGoods.length === cartGoods.length}
                    />
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>
                    <button className='SelectBuyButton' onClick={onBuy}>선택 구매</button>
                </div>
            </div>


        </div >  // mycartlist

    );  // return
}

export default MyPageCart;
