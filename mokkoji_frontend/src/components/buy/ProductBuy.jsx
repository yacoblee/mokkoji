import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import '../../css/buy/ProductBuy.css'
import GoodsItems from '../product/ProductObject';
import { useEffect, useState } from 'react';
import BuyInputBox from './BuyInputBox';
import BuyBasketList from './BuyBasketList';
import TopButton from "../modules/ScrollToTopBtn";
import axios from 'axios';
import { apiCall } from '../../service/apiService';
import { API_BASE_URL } from '../../service/app-config';


const ProductBuy = () => {

    //url 파라미터 , 링크로 전송된 데이터 추출.
    const location = useLocation();
    const { category, id } = useParams();
    //const { userId, product, option, packaging, count, totalPrice } = location.state || {};
    const { productBuy } = location.state || {};
    const token = JSON.parse(sessionStorage.getItem('userData'));
    const navigate = useNavigate();
    const [dto, setDto] = useState(productBuy ? productBuy : {});
    const [userCart, setUserCart] = useState([]);
    //선택된 상품 해당 값 가져오기.
    //const product = GoodsItems.find(item => item.category === category && item.id === parseInt(id));

    //현재 접속중인 user의 userData 받아오기
    //const userData = JSON.parse(sessionStorage.getItem("LoginUserInfo"));

    //Link 로 받아온 값을 넣어줌 ->구매 수량 상태 관리 -> 선택 옵션 갯수에 대한 관리
    //9.11코드변경
    const [amount, setAmount] = useState(productBuy ? +productBuy.productCnt : 1);
    //==================================================================금액 관련 state
    //최종 금액을 바꿀 state (배송비 제외)
    const [filterPrice, setFilterPrice] = useState(productBuy ? +productBuy.productTotalPrice : 0);
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

    //장바구니 항목 체크 박스에 대해 정보를 저장할 배열 변수.
    const [checkedCartItems, SetCheckedCartItems] = useState([]);

    // buyPrice(옵션갯수)가 변경될 때마다 총 금액 재계산
    useEffect(() => {
        // 옵션에 의해 총 금액을 계산하는 함수 호출
        const totalPrice = calculateTotalPrice();

        // 계산된 총 금액을 updatePrice를 통해 최종 금액 도출
        updatePrices(totalPrice);
        //console.log(checkedCartItems);
    }, [checkedCartItems, filterPrice]);

    // 총 금액 및 배송비 상태 업데이트 함수
    const updatePrices = (totalPrice) => {
        //1차 필터 계산하여 배송비포함되지 않는 가격 계산
        setFilterPrice(totalPrice);
        //전체 금액 합산을 위한 reduce를 사용한 최종금액 계산

        //1. 장바구니 토탈금액 계산
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

    // buyPrice(옵션갯수)가 변경될 때마다 총 금액 재계산
    useEffect(() => {
        // 옵션에 의해 총 금액을 계산하는 함수 호출
        const totalPrice = calculateTotalPrice();

        // 계산된 총 금액을 updatePrice를 통해 최종 금액 도출
        updatePrices(totalPrice);
        //console.log(checkedCartItems);
    }, [dto, userCart, amount, checkedCartItems, filterPrice]);
    //옵션이 바뀌고 나면 업데이트, 카트아이템이 바뀔때 마다 업데이트,
    // 옵션이 바뀌어 filerprice가 바뀌면 업데이트
    //총금액을 그냥 사용하지않고 LastPrice로 이용한 이유는
    //배송비 추가발생에 대한 화면 명시를 하고싶었기 때문.


    //클릭했을때 상품 수량 변경 함수.
    const onClickbtn = (type, name) => {
        if (type === '-') {
            if (amount > 1) {
                setAmount(amount - 1);
            } else {
                setAmount(amount);
            }

        } else {
            setAmount(amount + 1);
        }
    };
    // 숫자를 포맷팅하는 함수
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    }

    // selectProduct 에 관한 체크박스 상태 관리
    const [buyCheckBox, setBuyCheckBox] = useState(true);

    //클릭할때마다 체크박스 상태값이 바뀜
    const onChangeBuyCheckBox = () => {
        setBuyCheckBox(!buyCheckBox);
    };

    //체크박스 상태 값에 따라 계산을 실행
    useEffect(() => {
        const totalPrice = calculateTotalPrice();
        updatePrices(totalPrice);
    }, [buyCheckBox]);

    // 장바구니 불러오기 상태 관리
    const [bringUserCart, setBringUserCart] = useState(false);

    // 장바구니를 담을 상태 관리
    // const [dto, setDto] = useState(productBuy ? productBuy : {});
    //const [cartList, setCartList] = useState([]);
    const updateDtoAndCart = async () => {
        let url = "/order/bringcart"
        try {
            //console.log(dto);
            //(url: any, method: any, requestData: any, token: any):
            const response = await apiCall(url, 'POST', dto, token);
            const { cartList } = response.data;
            //setDto(updateDto);
            setUserCart(cartList);
            
            //console.log("성공했니");
            //console.log(cartList);
        } catch (error) {
            alert("가져오기 실패");

        }
    }

    useEffect(() => {
        updateDtoAndCart();
    }, [])


    // 장바구니 불러오기 버튼 클릭 시 총 금액 및 배송비 재계산
    const onClickBringCart = () => {
        setBringUserCart(!bringUserCart);
        const totalPrice = calculateTotalPrice();
        updatePrices(totalPrice);
        SetCheckedCartItems([])
    }

    // 장바구니 항목 체크박스 상태 변경 함수 // 하위컴포넌트로 프롭스로 전달.
    const onChangeChildCheckbox = (isChecked, items) => {
        //체크된 항목을 하위 컴포넌트로 전송하기 위한 배열 형성.

        SetCheckedCartItems(prevItems => {
            if (isChecked) {
                return [...prevItems, items]
            } else {
                return prevItems.filter(cartItem =>
                    !(cartItem.productId === items.productId &&
                        cartItem.optionContent === items.optionContent &&
                        cartItem.packagingOptionContent === items.packagingOptionContent)
                );
            }
        });
        // console.log(checkedCartItems)
    };
    // 조건을 체크하여 리다이렉션하는 로직
    useEffect(() => {
        if (!token || !productBuy || !productBuy.userId) {
            navigate('/');
        }
    }, [token, productBuy]);
    //오류 발생을 대비한 방어 코드.
    if (!dto) {

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
                <div className='bringUserCart minwidth'>
                    <span>장바구니를 불러오겠습니까 ? </span>
                    {!bringUserCart ? <button type='button' onClick={onClickBringCart}>YES</button> : <button type='button' onClick={onClickBringCart}>No</button>}
                </div>
                <form action="#">
                    <ul className='ProductBuyList'>
                        <li className='addName'></li>
                        <li className='addName'></li>
                        <li className='bringUserCart maxwidth'>
                            <span>장바구니를 불러오겠습니까 ? </span>
                            {!bringUserCart ? <button type='button' onClick={onClickBringCart}>YES</button> : <button type='button' onClick={onClickBringCart}>No</button>}
                        </li >
                        <li className='deleteName'>상품명</li>
                        <li>상품가격</li>
                        <li>상품정보</li>
                        <li>포장여부</li>
                    </ul>
                    <div className='buyInfo'>
                        <input type="checkBox" value={filterPrice}
                            checked={buyCheckBox}
                            onChange={onChangeBuyCheckBox} />
                        <Link to={`/goods/${dto.categoryId}/${dto.productId}`}
                            className='deleteName' >
                            <img src={`${API_BASE_URL}/resources/productImages/${dto.mainImageName}`}
                                className='deleteName' alt={dto.productName} />
                        </Link>
                        <p className='seletedProudctBuyName'>{dto.productName}
                            <Link to={`/goods/${dto.categoryId}/${dto.productId}`}>
                                <img src={`${API_BASE_URL}/resources/productImages/${dto.mainImageName}`}
                                    className='addName img' alt={dto.productName} />
                            </Link>
                        </p>
                        <p>{formatNumber(+dto.price)}</p>
                        <p className='displayFlexColumn justifyBetween'>
                            <div className='height50FlexColumn justifyBetween'>
                                <p>
                                    {dto.optionContent}
                                </p>
                                <span >(+{dto.optionPrice}원) </span>
                            </div>
                            <p className='buySelect'>
                                {/* <span>
                                    수랑 변경
                                </span> */}
                                <div>
                                    <button type='button'
                                        onClick={() => { onClickbtn('-', 'price') }}>
                                        <img src="/images/buy/minus.png" alt="" />
                                    </button >
                                    <input type="text" value={amount} readOnly />
                                    <button type='button'
                                        onClick={() => { onClickbtn('+', 'price') }}>
                                        <img src="/images/buy/plus.png" alt="" />
                                    </button>
                                </div>

                            </p>
                        </p>
                        <p className='displayFlexColumn justifyBetween'>
                            <div className='height50FlexColumn justifyBetween'>
                                <p>
                                    {dto.packagingOptionContent}
                                </p>
                                <span >(+{dto.packagingOptionPrice}원) </span>
                            </div>
                            <p className='buySelect'>
                                {/* <span>
                                    수랑 변경
                                </span> */}
                                {/* <div>
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
                                </div> */}
                                <span className='highlight2'>{amount} 개 </span>
                            </p>
                        </p>
                        <p className='priceBox justifySelfEnd'>
                            총 금액 : <span className='subTTprice'>{formatNumber(filterPrice)}</span>
                        </p>
                    </div>

                    {bringUserCart && productBuy &&
                        <BuyBasketList userCart={userCart} onChangeChildCheckbox={onChangeChildCheckbox} />}
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
                <BuyInputBox
                    userId={productBuy ? productBuy.userId : null}
                    amount={amount}
                    checkedCartItems={checkedCartItems}
                    //option={option}
                    //packaging={packaging}
                    selectedProduct={buyCheckBox && productBuy}
                    productPrice={filterPrice}
                    totalPrice={lastPrice} />
                <TopButton />
            </div>
        </>
        )
    }
}
export default ProductBuy;
