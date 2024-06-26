import React, { useEffect, useState } from 'react';

import '../../../css/mypage/subpage/MyPageCart.css';
import { useNavigate } from 'react-router-dom';

function MyPageCart() {

    const userData = JSON.parse(sessionStorage.getItem("LoginUserInfo"));
    const items = JSON.parse(sessionStorage.getItem("goodsList"));

    const [user, setUser] = useState(userData)

    // 숫자를 금액처럼 표기하기
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    };

    // 사진 이름 id 기타 정보(수량, 가격)들 가져오는 새로운 출력용 객체
    const cartGoods = user.mypage.basket.map((bb) => {
        let findItem = items.find((item) =>
            item.id === bb.productId
        );     // findItem

        let cartItem = {}

        cartItem.photo = findItem.productSrc[0]
        cartItem.id = findItem.id
        cartItem.name = findItem.name
        cartItem.content = bb.options.contentSelect
        cartItem.package = bb.options.packagingSelect
        cartItem.contentCount = bb.quantity.contentSelect
        cartItem.packageCount = bb.quantity.packagingSelect
        cartItem.price = bb.totalPrice

        return cartItem;
    });     // map





    // 이 아래로 checkbox 전체선택 로직
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

    console.log(checkedGoods)

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

    const onBuy = () => {
        navigate('/buy', {
            state: {
                newCheckedGoods: newCheckedGoods
            }
        })
    }


    const onBuyEach = (id) => {

        const findData = userData.mypage.basket.find((item) =>
            item.productId === id
        )
        console.log(findData)

        navigate('/buy', {
            state: {
                newCheckedGoods: [findData]
            }
        })
    }



    // 삭제 버튼 로직
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

    }   // handleDelete


    // 이 아래로 수량 조정하는 로직(하지만 결제창으로 반영되지는 않음: totalprice가 상수이기에)
    const changeProductCount = (cartId, variation) => {
        const newBasket = user.mypage.basket.map((item) => {
            if (item.productId === cartId) {

                // console.log(`확인 처음 개수 ${item.quantity.contentSelect}`)
                // console.log(`확인 아이템 ${item.productId}`)
                // console.log(`확인 명령 ${variation}`)

                if (variation === 'decrease') {
                    if (item.quantity.contentSelect === 1)
                        alert('상품 개수 경고');
                    else
                        item.quantity.contentSelect = item.quantity.contentSelect - 1;
                } else if (variation === 'increase')
                    item.quantity.contentSelect = item.quantity.contentSelect + 1
            }
            return item;
        }   // newBasket.map
        )   // newBasket

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


    const changePackageCount = (cartId, variation) => {
        const newBasket = user.mypage.basket.map((item) => {
            if (item.productId === cartId) {

                // console.log(`확인 처음 개수 ${item.quantity.packagingSelect}`)
                // console.log(`확인 아이템 ${item.productId}`)
                // console.log(`확인 명령 ${variation}`)

                if (variation === 'decrease') {
                    if (item.quantity.packagingSelect === 1)
                        alert('포장 개수 경고');
                    else
                        item.quantity.packagingSelect = item.quantity.packagingSelect - 1;
                } else if (variation === 'increase')
                    item.quantity.packagingSelect = item.quantity.packagingSelect + 1
            }
            return item;
        }   // newBasket.map
        )   // newBasket

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




    return (
        <div className='MyCartList' >

            <div className='MyCartHeader'>

                <div>
                    <input
                        type="checkbox"
                        onChange={handleCheckAll}
                        checked={checkedGoods.length === cartGoods.length}
                    />
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>


            {cartGoods.map((goods) => {
                return (
                    <div className="MyCartGrid" key={goods.id} >
                        <div>
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
                            <h3>{goods.name}</h3>
                        </div>
                        <div className='MyCartDetail'>
                            <h4>{goods.content}</h4>
                            <h4>{goods.package}</h4>
                        </div>
                        <div className='MyCartCount'>
                            <div className='MyProductCount'>
                                <img src="/images/buy/minus.png" onClick={() => changeProductCount(goods.id, 'decrease')} />
                                <input type="text" value={goods.contentCount} />
                                <img src="/images/buy/plus.png" onClick={() => changeProductCount(goods.id, 'increase')} />
                            </div>
                            <div className='MyPackageCount'>
                                <img src="/images/buy/minus.png" onClick={() => changePackageCount(goods.id, 'decrease')} />
                                <input type="text" value={goods.packageCount} />
                                <img src="/images/buy/plus.png" onClick={() => changePackageCount(goods.id, 'increase')} />
                            </div>
                        </div>
                        <div className='MyCartButton'>
                            <button className='buttonChange' onClick={() => onBuyEach(goods.id)}>
                                {formatNumber(goods.price)}원
                            </button>
                            <button onClick={() => handleDelete(goods.id)}>삭제</button>
                        </div>
                    </div >  // mycartgird
                )
            })}

            <div className='MyCartFooter'>

                <div>
                    <input
                        type="checkbox"
                        onChange={handleCheckAll}
                        checked={checkedGoods.length === cartGoods.length}
                    />
                </div>
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
