import '../../css/mypage/MyPageIndex.css';
import '../../css/mypage/subpage/MyPageBuy.css'
import BuyInput from '../buy/BuyInputBox'

import { useLocation } from 'react-router-dom';

function MyPageBuy() {

    const location = useLocation();
    let newCheckedGoods = location.state.newCheckedGoods;

    const user = JSON.parse(sessionStorage.getItem("LoginUserInfo"));
    const items = JSON.parse(sessionStorage.getItem("goodsList"));

    //금액을 수정하는 함수
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    };


    return (
        <div className='Payment'>

            <h1>
                <div>결제하기</div>
            </h1>

            {newCheckedGoods.map((goods) => {
                const product = items.find(item => item.id === goods.productId);

                return (
                    <div className="PaymentGrid" key={goods.productId} >
                        <div className="BuyPhoto">
                            <img src={product.productSrc[0]} alt={product.name} />
                        </div>
                        <div className='BuyInfo'>
                            <h3>{product.name}</h3>
                        </div>
                        <div>{formatNumber(goods.totalPrice)}</div>
                        <div>
                            <div>{goods.options.contentSelect}</div>
                            <div>{goods.quantity.contentSelect}</div>
                        </div>
                        <div>
                            <div>{goods.options.packagingSelect}</div>
                            <div>{goods.quantity.packagingSelect}</div>
                        </div>
                    </div >
                );
            })}

            <BuyInput />

        </div>
    )
}

export default MyPageBuy;
