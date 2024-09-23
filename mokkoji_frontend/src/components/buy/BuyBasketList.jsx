import React, { useState } from 'react';
import GoodsItems from '../product/ProductObject';
import { Link } from 'react-router-dom';


//사용할 때 {userData && <BuyBasketList userCart={userData.mypage.basket} />}
//이런식으로 userDate를 세션스토리지에서 useEffect를 통해 가져오고.
// 그 값이 존재하는지 여부를 먼저 확인후 실행
//프롭스로 해당 유저의 basket 배열까지 접근해서 던져줄것.


//user의 basket 까지 접근한 배열을 맵을 돌려,
//그 id값과 일치하는 product를 찾은 후 , 사진과  이름과 가격을 찾음.

const BuyBasketList = ({ userCart, onChangeChildCheckbox }) => {

    //금액을 수정하는 함수
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    };

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

        // 상위 컴포넌트에 상태 변경 알림
        onChangeChildCheckbox(isChecked, item);
    };
    return (
        <>
            <h3 className='CartArea'>
                장바구니
            </h3>
            <ul className='ProductBuyList'>
                <li></li>
                <li></li>
                {/* <li className='addName'></li> */}
                <li className='deleteName'>상품명</li>
                <li>상품가격</li>
                <li>상품정보</li>
                <li>포장여부</li>
            </ul>
            {userCart.map((cartItem, index) => {
                const product = GoodsItems.find(item => item.id === cartItem.productId);
                return (
                    <div key={index} className='buyInfo'>
                        <input type="checkBox"
                            checked={checkedItems[index]}
                            value={cartItem.totalPrice}
                            onChange={(e) => onChangeCheckBox(index, e)} />
                        <Link to={`/goods/${product.category}/${product.id}`}
                            className='deleteName'>
                            <img src={product.productSrc[0]} alt={product.name}
                                className='deleteName' />
                        </Link>
                        <p className='seletedProudctBuyName'>{product.name}
                            <Link to={`/goods/${product.category}/${product.id}`}>
                                <img src={product.productSrc[0]} alt={product.name}
                                    className='addName img' />
                            </Link>
                        </p>
                        <p>{formatNumber(product.price)}</p>
                        <div className='displayFlexColumn justifyEvenly'>
                            <p style={{ display: 'flex', padding: '0 5px' }}>
                                {cartItem.options.contentSelect}
                            </p>
                            <span className='highlight2'>{cartItem.count} 개</span>
                        </div>
                        <div className='displayFlexColumn justifyEvenly'>
                            <p>
                                {cartItem.options.packagingSelect}
                            </p>
                            <span className='highlight2'>{cartItem.count} 개</span>
                        </div>
                        <p className='priceBox justifySelfEnd'>
                            총 금액 : <span className='subTTprice'>{formatNumber(cartItem.totalPrice)}</span>
                        </p>
                    </div>
                );
            })}
        </>
    );
}

export default BuyBasketList;
