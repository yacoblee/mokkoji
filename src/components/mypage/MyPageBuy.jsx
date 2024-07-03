import '../../css/mypage/subpage/MyPageBuy.css'
import BuyInput from '../buy/BuyInputBox'

import { useLocation } from 'react-router-dom';

function MyPageBuy() {

    const location = useLocation();
    let newCheckedGoods = location.state.newCheckedGoods;

    const user = JSON.parse(sessionStorage.getItem("LoginUserInfo"));
    const items = JSON.parse(sessionStorage.getItem("goodsList"));

    // 금액을 수정하는 함수
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    };

    // totalprice(한개 상품에 대한 최종 금액)를 바탕으로 총 금액 계산하는 함수
    const cartTotalPrice = newCheckedGoods.reduce((acc, item) => acc + item.totalPrice, 0);

    return (
        <div className='Payment'>
            <h1>
                <div>결제하기</div>
            </h1>

            {newCheckedGoods.map((goods) => {
                const product = items.find(item => item.id === goods.productId);

                console.log(items.length)

                return (
                    <div className="PaymentGrid" key={goods.productId} >
                        <div className="BuyPhoto">
                            <img src={product.productSrc[0]} alt={product.name} />
                        </div>
                        <div className='BuyInfo'>
                            <h3>{product.name}</h3>
                        </div>
                        <div>{formatNumber(goods.totalPrice)}원</div>
                        <div>
                            <div>{goods.options.contentSelect} :</div>
                            <div>{goods.quantity.contentSelect}개</div>
                        </div>
                        <div>
                            <div>{goods.options.packagingSelect} :</div>
                            <div>{goods.quantity.packagingSelect}개</div>
                        </div>
                    </div >
                );
            })}

            <div className='PaymentFooter'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>{formatNumber(cartTotalPrice)}원</div>
            </div>

            <BuyInput
                userData={user}
                checkedCartItems={newCheckedGoods}
                totalPrice={cartTotalPrice} />

        </div>
    )
}

export default MyPageBuy;
