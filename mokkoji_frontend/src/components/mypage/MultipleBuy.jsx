import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import '../../css/buy/ProductBuy.css'
import GoodsItems from '../product/ProductObject';
import { useEffect, useState } from 'react';
import BuyInputBox from '../buy/BuyInputBox';
import BuyBasketList from './../buy/BuyBasketList';
import TopButton from "../modules/ScrollToTopBtn";
import axios from 'axios';
import { apiCall } from '../../service/apiService';
import { API_BASE_URL } from '../../service/app-config';


const MultipleBuy = () => {

    //url 파라미터 , 링크로 전송된 데이터 추출.
    const location = useLocation();
    const { category, id } = useParams();
    //const { userId, product, option, packaging, count, totalPrice } = location.state || {};
    const { cartKeyList } = location.state || {};
    const token = JSON.parse(sessionStorage.getItem('userData'));
    const navigate = useNavigate();
    const [dto, setDto] = useState(cartKeyList ? cartKeyList : {});
    const [userCart, setUserCart] = useState([]);
    //선택된 상품 해당 값 가져오기.
    //const product = GoodsItems.find(item => item.category === category && item.id === parseInt(id));

    //현재 접속중인 user의 userData 받아오기
    //const userData = JSON.parse(sessionStorage.getItem("LoginUserInfo"));

    //Link 로 받아온 값을 넣어줌 ->구매 수량 상태 관리 -> 선택 옵션 갯수에 대한 관리
    //9.11코드변경
    const [amount, setAmount] = useState(cartKeyList ? +cartKeyList.productCnt : 1);
    //==================================================================금액 관련 state
    //최종 금액을 바꿀 state (배송비 제외)
    const [filterPrice, setFilterPrice] = useState(cartKeyList ? +cartKeyList.productTotalPrice : 0);
    //배송비 추가금을 포함한 최종금액 표현.
    const [lastPrice, setLastPrice] = useState(+filterPrice);
    //배송비 문구를 보여줄 state 상태값 (true 면 보여주고 false 면 안보여줄거야)
    const [showingMessage, setShowingMessage] = useState(false);
    // =================================================================



    //배송비 제외 selectProduct 의 금액을 계산하는 함수 -> 추후 filterPrice 로 표현
    const calculateTotalPrice = () => {
        if (!dto) return 0; // 선택된 상품이 없으면 0 반환
        let price = +dto.price;
        let packagingPrice = dto.packagingOptionPrice ? +dto.packagingOptionPrice : 0;
        let contentPrice = dto.optionPrice ? +dto.optionPrice : 0;

        return (price + contentPrice + packagingPrice) * amount;
    }


    // 총 금액 및 배송비 상태 업데이트 함수
    const updatePrices = (totalPrice) => {
        //1차 필터 계산하여 배송비포함되지 않는 가격 계산
        setFilterPrice(totalPrice);
        //전체 금액 합산을 위한 reduce를 사용한 최종금액 계산

        //1. 구매 토탈금액 계산
        const cartTotalPrice = checkedCartItems.reduce((acc, item) => acc + +item.productTotalPrice, 0);

        //2. selectProduct 가 체크 됬을때는 totalPrice를 더하겠다.
        const combinedPrice = (buyCheckBox ? filterPrice : 0) + cartTotalPrice;

        // 만약 계산된 총 금액이 30000원보다 작으면,
        //배송비 3000원을 추가한 값을 lastPrice로 설정
        //계산된 총합이 0원이면 -> 아무것도 선택되지 않았다면 0원.
        if (combinedPrice === 0) {
            setLastPrice(0);
            setShowingMessage(false);
        } else if (combinedPrice < 30000) {
            setLastPrice(combinedPrice + 3000);
            setShowingMessage(true);
        } else {
            setLastPrice(combinedPrice);
            setShowingMessage(false);
        }
        //그렇지 않으면 계산된 총금액을 lastPrice로 설정
    };



    // 숫자를 포맷팅하는 함수
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    }



    // 조건을 체크하여 리다이렉션하는 로직
    // useEffect(() => {
    //     if (!token || !cartKeyList || !cartKeyList.userId) {
    //         navigate('/');
    //     }
    // }, [token, cartKeyList]);



    return (<>
        <h2 className='buyHeader'>
            주문 결제
        </h2>
        <div className="ProductBuy" >

            <div>


                {userCart.map((item, index) => {
                    return (
                        <div key={index} className='buyInfo'>

                            <Link to={`/goods/${item.categoryId}/${item.productId}`}
                                className='deleteName'>
                                <img src={`${API_BASE_URL}/resources/productImages/${item.mainImageName}`} alt={item.productName}
                                    className='deleteName' />
                            </Link>
                            <p className='seletedProudctBuyName'>{item.productName}
                                <Link to={`/goods/${item.categoryId}/${item.productId}`}>
                                    <img src={`${API_BASE_URL}/resources/productImages/${item.mainImageName}`} alt={item.name}
                                        className='addName img' />
                                </Link>
                            </p>
                            <p>{formatNumber(+item.price)}</p>
                            <div className='displayFlexColumn justifyEvenly'>
                                <p style={{ display: 'flex', padding: '0 5px' }}>
                                    {item.optionContent}
                                </p>
                                <span >(+{item.optionPrice}원)</span>
                            </div>
                            <div className='displayFlexColumn justifyEvenly'>
                                <p>
                                    {item.packagingOptionContent}
                                </p>
                                <span >(+{item.packagingOptionPrice}원)</span>
                            </div>
                            <p className='priceBox justifySelfEnd'>
                                <span className='highlight2'>{item.productCnt} 개</span>
                                총 금액 : <span className='subTTprice'>{formatNumber(+item.productTotalPrice)}</span>
                            </p>
                        </div>
                    );
                })}


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
            </div>

            <h2>주문서 작성</h2>
            <BuyInputBox
                userId={cartKeyList ? cartKeyList.userId : null}
                checkedCartItems={cartKeyList}
                totalPrice={lastPrice} />
            <TopButton />
        </div>
    </>
    )
}

export default MultipleBuy;
