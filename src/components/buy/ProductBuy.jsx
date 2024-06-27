import { useParams, useLocation } from 'react-router-dom';
import '../../css/buy/ProductBuy.css'
import GoodsItems from '../product/ProductObject';
import { useEffect, useState } from 'react';
import BuyInputBox from './BuyInputBox';
import BuyBasketList from './BuyBasketList';
const ProductBuy = () => {

    //url 파라미터 , 링크로 전송된 데이터 추출.
    const location = useLocation();
    const { category, id } = useParams();
    const { options, btnValue, totalPrice } = location.state || {};

    //선택된 상품 해당 값 가져오기.
    const selectedProduct = GoodsItems.find(item => item.category === category && item.id === parseInt(id));

    //현재 접속중인 user의 userData 받아오기
    const userData = JSON.parse(sessionStorage.getItem("LoginUserInfo"));

    //Link 로 받아온 값을 넣어줌 ->구매 수량 상태 관리
    const [buyPrice, setBuyPrice] = useState({
        productPrice: btnValue ? btnValue.contentSelect : 1,
        optionPrice: btnValue ? btnValue.packagingSelect : 1,
    });
    //==================================================================금액 관련 state 
    //최종 금액을 바꿀 state (배송비 제외)
    const [filterPrice, setFilterPrice] = useState(+totalPrice);
    //배송비 추가금을 포함한 최종금액 표현.
    const [lastPrice, setLastPrice] = useState(+filterPrice);
    //배송비 문구를 보여줄 state 상태값 (true 면 보여주고 false 면 안보여줄거야)
    const [showingMessage, setShowingMessage] = useState(false);
    // =================================================================

    //배송비 제외 최종 금액을 계산하는 함수
    const calculateTotalPrice = () => {
        let price = selectedProduct.price;
        const contentPrice = options.contentSelect.includes('(+220000)') ? 220000 :
            options.contentSelect.includes('(+722000)') ? 722000 : 0;
        const packagingPrice = options.packagingSelect.includes('(+2000원)') ? 2000 :
            options.packagingSelect.includes('(+4000원)') ? 4000 : 0;
        const totalPrice = (price + contentPrice) * buyPrice.productPrice + packagingPrice * buyPrice.optionPrice;
        return totalPrice;
    }

    // 총 금액 및 배송비 상태 업데이트 함수
    const updatePrices = (totalPrice) => {
        //1차 필터 계산하여 배송비포함되지 않는 가격 계산
        setFilterPrice(totalPrice);

        // 만약 계산된 총 금액이 30000원보다 작으면, 
        //배송비 3000원을 추가한 값을 lastPrice로 설정
        if (totalPrice < 30000) {
            setLastPrice(totalPrice + 3000);
            setShowingMessage(true);
        } else {
            setLastPrice(totalPrice);
            setShowingMessage(false);
        }//그렇지 않으면 계산된 총금액을 lastPrice로 설정
    };

    // buyPrice가 변경될 때마다 총 금액 재계산
    useEffect(() => {
        // 총 금액을 계산하는 함수 호출
        const totalPrice = calculateTotalPrice();

        // 계산된 총 금액을 updatePrice를 통해 최종 금액 도출
        updatePrices(totalPrice);

    }, [buyPrice]);
    //총금액을 그냥 사용하지않고 LastPrice로 이용한 이유는
    //배송비 추가발생에 대한 화면 명시를 하고싶었기 때문.


    //클릭했을때 상품 수량 변경 함수.
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
    // 숫자를 포맷팅하는 함수
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    }

    // 체크박스 상태 관리
    const [buyCheckBox, setBuyCheckBox] = useState(true);

    //클릭할때마다 체크박스 상태값이 바뀜
    const onChangeBuyCheckBox = () => {
        setBuyCheckBox(!buyCheckBox);
    };

    //체크박스 상태 값에 따라 계산을 실행
    useEffect(() => {
        if (!buyCheckBox) {
            setLastPrice(0);
            setShowingMessage(false);
        } else {
            const totalPrice = calculateTotalPrice();
            updatePrices(totalPrice);
        }
    }, [buyCheckBox]);

     // 장바구니 불러오기 상태 관리
    const [bringUserCart, setBringUserCart] = useState(false);

    // 장바구니 불러오기 버튼 클릭 시 총 금액 및 배송비 재계산
    const onClickBringCart = () => {
        setBringUserCart(!bringUserCart);
        const totalPrice = calculateTotalPrice();
        updatePrices(totalPrice);
    }

    // 장바구니 항목 체크박스 상태 변경 함수
    const onChangeChildCheckbox = (cartItemPrice, isChecked) => {
        setLastPrice(prevPrice => {
            const newPrice = isChecked ? prevPrice + +cartItemPrice : prevPrice - +cartItemPrice;
            if (newPrice < 30000) {
                setShowingMessage(true);
                return newPrice + 3000;
            } else {
                setShowingMessage(false);
                if (prevPrice < 30000) {
                    return newPrice - 3000;
                }

                return newPrice;
            }
        });
    };

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
                        {/* <li></li> */}
                        <li className='bringUserCart'>
                            <span>장바구니를 불러오겠습니까 ? </span>
                            {!bringUserCart ? <button type='button' onClick={onClickBringCart}>YES</button> : <button type='button' onClick={onClickBringCart}>No</button>}
                        </li>
                        <li>상품명</li>
                        <li>상품가격</li>
                        <li>상품정보</li>
                        <li>포장여부</li>
                    </ul>
                    <div className='buyInfo'>
                        <input type="checkBox" value={filterPrice}
                            checked={buyCheckBox}
                            onChange={onChangeBuyCheckBox} />
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
                        <p className='priceBox'>
                            총 금액 : <span className='subTTprice'>{formatNumber(filterPrice)}</span>
                        </p>
                    </div>

                    {bringUserCart && userData &&
                        <BuyBasketList userCart={userData.mypage.basket} onChangeChildCheckbox={onChangeChildCheckbox} />}
                    <div className='totalPrice'>
                        <p>
                            총 금액 :
                            <span className='TTPrice'>
                                {formatNumber(lastPrice)}
                            </span>
                        </p>
                        {showingMessage && lastPrice > 0 && <span>(배송비 추가 발생 되었습니다.)</span>}
                        {lastPrice <= 0 && <span>(구매 하실 수 없습니다)</span>}
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