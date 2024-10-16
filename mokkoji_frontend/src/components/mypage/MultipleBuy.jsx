import { useLocation, Link } from 'react-router-dom';
import '../../css/buy/ProductBuy.css'
import { useEffect, useState } from 'react';
import BuyInputBox from '../buy/BuyInputBox';
import TopButton from "../modules/ScrollToTopBtn";
import { API_BASE_URL } from '../../service/app-config';


const MultipleBuy = () => {

    //url 파라미터 , 링크로 전송된 데이터 추출.
    const location = useLocation();
    //const { userId, product, option, packaging, count, totalPrice } = location.state || {};
    const { checkedCartItems } = location.state || {};

    //==================================================================금액 관련 state
    //최종 금액을 바꿀 state (배송비 제외)
    const [filterPrice, setFilterPrice] = useState(checkedCartItems ? +checkedCartItems.productTotalPrice : 0);
    //배송비 추가금을 포함한 최종금액 표현.
    const [lastPrice, setLastPrice] = useState(+filterPrice);
    //배송비 문구를 보여줄 state 상태값 (true 면 보여주고 false 면 안보여줄거야)
    const [showingMessage, setShowingMessage] = useState(false);

    useEffect(() => {

        const totalPriceTemp = checkedCartItems.reduce((acc, cart) => {
            return acc + cart.productTotalPrice;
        }, 0)

        if (totalPriceTemp === 0) {
            setLastPrice(0);
            setShowingMessage(false);
        } else if (totalPriceTemp < 30000) {
            setLastPrice(totalPriceTemp + 3000);
            setShowingMessage(true);
        } else {
            setLastPrice(totalPriceTemp);
            setShowingMessage(false);
        }
    }, [])

    // 숫자를 포맷팅하는 함수
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    }



    return (<>
        <h2 className='buyHeader'>
            주문 결제
        </h2>
        <div className="ProductBuy" >

            <div>
                <ul className='ProductBuyList'>
                    <li></li>
                    <li></li>
                    {/* <li className='addName'></li> */}
                    <li className='deleteName'>상품명</li>
                    <li>상품가격</li>
                    <li>상품정보</li>
                    <li>포장여부</li>
                </ul>

                {checkedCartItems.map((item, index) => {
                    return (
                        <div key={index} className='buyInfo'>
                            <p></p>
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
                userId={checkedCartItems[0] ? checkedCartItems[0].userId : null}
                checkedCartItems={checkedCartItems}
                totalPrice={lastPrice} />
            <TopButton />
        </div>
    </>
    )
}

export default MultipleBuy;
