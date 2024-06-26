import React from 'react';
import GoodsItems from '../product/ProductObject';


//사용할 때 {userData && <BuyBasketList userCart={userData.mypage.basket} />}
//이런식으로 userDate를 세션스토리지에서 useEffect를 통해 가져오고.
// 그 값이 존재하는지 여부를 먼저 확인후 실행
//프롭스로 해당 유저의 basket 배열까지 접근해서 던져줄것.


//user의 basket 까지 접근한 배열을 맵을 돌려,
//그 id값과 일치하는 product를 찾은 후 , 사진과  이름과 가격을 찾음.

const BuyBasketList = ({ userCart }) => {

    //금액을 수정하는 함수
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    };

    return (
        <>
            {userCart.map((cartItem, index) => {
                const product = GoodsItems.find(item => item.id === cartItem.productId);
                return (
                    <div key={index} className='buyInfo'>
                        <input type="checkBox" />
                        <img src={product.productSrc[0]} alt={product.name} />
                        <p>{product.name}</p>
                        <p>{formatNumber(product.price)}</p>
                        <p>
                            {cartItem.options.contentSelect} : <span className='highlight'>{cartItem.quantity.contentSelect}</span> 개
                        </p>
                        <p>
                            {cartItem.options.packagingSelect} : <span className='highlight'>{cartItem.quantity.packagingSelect}</span> 개
                        </p>
                        <p>
                            {cartItem.totalPrice}
                        </p>
                    </div>
                );
            })}
        </>
    );
}

export default BuyBasketList;
