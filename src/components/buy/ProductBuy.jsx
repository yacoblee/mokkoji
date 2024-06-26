import { useParams, useLocation } from 'react-router-dom';
import '../../css/buy/ProductBuy.css'
import GoodsItems from '../product/ProductObject';
import userInfo from '../login/UserInforData';
import { useEffect, useState } from 'react';
import BuyInputBox from './BuyInputBox';
import BuyBasketList from './BuyBasketList';
const ProductBuy = () => {
    const location = useLocation();
    const { category, id } = useParams();
    const { options, btnValue, totalPrice } = location.state || {};
    //선택된 상품 해당 값 가져오기.
    const selectedProduct = GoodsItems.find(item => item.category === category && item.id === parseInt(id));

    //useEffect의 값을 꺼냄.
    const [userData, setUserData] = useState(null);
    //현재 접속중인 user의 userData 받아오기
    const [userBasket, setUserBasket] = useState([]);


    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("LoginUserInfo"));
        setUserData(userData);
        if (userData) {
            const userBasket = GoodsItems.filter(item =>
                userData.mypage.basket.some(basketItem => basketItem.productId === item.id));
            console.log(userBasket);
            setUserBasket(userBasket);
        }
    }, []);
    //Link 로 받아온 user
    const [buyPrice, setBuyPrice] = useState({
        productPrice: btnValue ? btnValue.contentSelect : 1,
        optionPrice: btnValue ? btnValue.packagingSelect : 1,
    });

    //최종 금액을 바꿀 state
    const [filterPrice, setFilterPrice] = useState(+totalPrice);

    //계산하는 함수
    const calculateTotalPrice = () => {
        let price = selectedProduct.price;
        const contentPrice = options.contentSelect.includes('(+220000)') ? 220000 :
            options.contentSelect.includes('(+722000)') ? 722000 : 0;
        const packagingPrice = options.packagingSelect.includes('(+2000원)') ? 2000 :
            options.packagingSelect.includes('(+4000원)') ? 4000 : 0;
        const totalPrice = (price + contentPrice) * buyPrice.productPrice + packagingPrice * buyPrice.optionPrice;
        return totalPrice;
    }

    //배송비 추가금을 포함한 최종금액 표현.
    const [lastPrice, setLastPrice] = useState(+filterPrice);

    //총금액을 buyprice에 담긴 값이 바뀔때마다 실행.
    useEffect(() => {
        console.log('useEffect called');
        // 총 금액을 계산하는 함수 호출
        const totalPrice = calculateTotalPrice();

        // 계산된 총 금액을 filterPrice 상태로 업데이트
        setFilterPrice(totalPrice);

        // 만약 계산된 총 금액이 30000원보다 작으면, 
        //배송비 3000원을 추가한 값을 lastPrice로 설정
        if (totalPrice < 30000) {
            setLastPrice(totalPrice + 3000);
        } else {
            setLastPrice(totalPrice);//그렇지 않으면 계산된 총금액을 lastPrice로 설정
        }
    }, [buyPrice]);
    //총금액을 그냥 사용하지않고 LastPrice로 이용한 이유는
    //배송비 추가발생에 대한 화면 명시를 하고싶었기 때문.

    const onClickbtn = (type, name) => {
        if (type === '-') {
            if (buyPrice[name] > 1) {
                setBuyPrice(it => ({
                    ...it,
                    [name]: buyPrice[name] - 1
                }));
            } else {
                setBuyPrice(it => ({
                    ...it,
                    [name]: buyPrice[name]
                }));
            }

        } else {
            setBuyPrice(it => ({
                ...it,
                [name]: buyPrice[name] + 1
            }));
        }
    };

    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    }



    if (!selectedProduct) {
        return (
            <div className="ProductBuy" style={{ marginTop: '150px' }}>
                아이템을 찾을 수 없어요
            </div>
        )
    } else {
        return (<>
            <h2 className='buyHeader'>
                주문 결제
            </h2>
            <div className="ProductBuy" >
                <form action="#">
                    <ul className='ProductBuyList'>
                        <li></li>
                        <li></li>
                        <li>상품명</li>
                        <li>상품가격</li>
                        <li>상품정보</li>
                        <li>포장여부</li>
                    </ul>
                    <div className='buyInfo'>
                        <input type="checkBox" />
                        <img src={selectedProduct.productSrc[0]} alt="" />
                        <p>{selectedProduct.name}</p>
                        <p>{formatNumber(selectedProduct.price)}</p>
                        <p>
                            <p>
                                {options.contentSelect} :<span className='highlight'>{buyPrice.productPrice}</span> 개
                            </p>
                            <br />
                            <p className='buySelect'>
                                수랑 변경
                                <button type='button'
                                    onClick={() => { onClickbtn('-', 'productPrice') }}>
                                    <img src="/images/buy/minus.png" alt="" />
                                </button >
                                <input type="text" value={buyPrice.productPrice} readOnly />
                                <button type='button'
                                    onClick={() => { onClickbtn('+', 'productPrice') }}>
                                    <img src="/images/buy/plus.png" alt="" />
                                </button>

                            </p>
                        </p>
                        <p>
                            <p>
                                {options.packagingSelect} : <span className='highlight'>{buyPrice.optionPrice}</span>개
                            </p>
                            <br />
                            <p className='buySelect'>
                                수랑 변경
                                <button type='button'
                                    className="leftButton"
                                    onClick={() => { onClickbtn('-', 'optionPrice') }}>
                                    <img src="/images/buy/minus.png" alt="" />
                                </button>
                                <input type="text" value={buyPrice.optionPrice} readOnly />
                                <button type='button'
                                    className="rightButton"
                                    onClick={() => { onClickbtn('+', 'optionPrice') }}>
                                    <img src="/images/buy/plus.png" alt="" />
                                </button>

                            </p>
                        </p>
                    </div>
                    {userData && <BuyBasketList userCart={userData.mypage.basket} />}
                    <div className='totalPrice'>
                        <p>
                            총 금액 :
                            <span className='TTPrice'>
                                {formatNumber(lastPrice)}
                            </span>
                        </p>
                        {(filterPrice < 30000) && <span>(배송비 추가 발생 되었습니다.)</span>}
                    </div>
                </form>

                <h2>주문서 작성</h2>
                <BuyInputBox userData={userData} />

            </div>
        </>
        )
    }
}
export default ProductBuy;