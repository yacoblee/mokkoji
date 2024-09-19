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
    // const cartTotalPrice = newCheckedGoods.reduce((acc, item) => acc + item.totalPrice, 0);
    const cartTotalPrice = newCheckedGoods.reduce((acc, item) => {
        const newTotal = acc + item.totalPrice;
        return newTotal < 30000 ? newTotal + 3000 : newTotal;
    }, 0);

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
                        <div className='BuyContent'>
                            <div>{goods.options.contentSelect}&nbsp;:&nbsp;</div>
                            <div>{goods.count}&nbsp;개</div>
                        </div>
                        <div className='BuyPackage'>
                            <div>{goods.options.packagingSelect}&nbsp;:&nbsp;</div>
                            <div></div>
                        </div>
                    </div >
                );
            })}

            <div className='PaymentFooter'>
                <div></div>
                <div></div>
                <div></div>
                <div>
                    <h5>* 30,000원 미만 3,000원</h5>
                    <h5>* 30,000원 이상 무료배송</h5>
                </div>
                <div>
                    <h2>{formatNumber(cartTotalPrice)}&nbsp;원</h2>
                </div>
            </div>

            <BuyInput
                userData={user}
                checkedCartItems={newCheckedGoods}
                totalPrice={cartTotalPrice} />

        </div>
    )
}

export default MyPageBuy;
