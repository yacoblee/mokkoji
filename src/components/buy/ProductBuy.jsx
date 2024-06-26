import { useParams , useLocation} from 'react-router-dom';
import '../../css/buy/ProductBuy.css'
import GoodsItems from '../product/ProductObject';
import userInfo from '../login/UserInforData';
import { useEffect, useState } from 'react';

    // // select 옵션에 대한 state
    // const [options, setOptions] = useState({
    //     contentSelect: '',
    //     packagingSelect: '',
    // });
    // //숫자 클릭에 대한 state
    // const [btnValue , setBtnValue] =  useState({
    //     contentSelect: 1,
    //     packagingSelect: 1,
    // });
    // // 토탈 금액에 대한 state
    // const [totalPrice, setTotalPrice] = useState(+selectedProduct.price);

    
    // //select 옵션에 대한 state 함수
    // const onChangeSelectItems = (e) => {
    //     const { name, value } = e.target;
    //     setOptions(it => ({
    //         ...it,
    //         [name]: value
    //     }));
    // };

    // // 클릭이벤트 -> 숫자 클릭에 대한 state 함수
    // const onClickbtn = (type , name) => {
    //     if (type === '-') {
    //         if(btnValue[name]>1){
    //             setBtnValue(it => ({
    //                 ...it,
    //                 [name]: btnValue[name] - 1
    //             }));
    //         }else{
    //             setBtnValue(it => ({
    //                 ...it,
    //                 [name]: btnValue[name] 
    //             }));
    //         }
            
    //     } else {
    //         setBtnValue(it => ({
    //             ...it,
    //             [name]: btnValue[name] + 1
    //         }));
    //     }
    // };

    // //토탈 금액에 대한 계산을 하는 함수
    // const calculateTotalPrice = () => {
    //     if (!selectedProduct) return 0;
    //     let packageADDprice = 0;
    //     let defaultADDprice = 0;

    //     if (options.packagingSelect.includes('(+2000원)')) {
    //         packageADDprice = 2000;
    //     } else if (options.packagingSelect.includes('(+4000원)')) {
    //         packageADDprice = 4000;
    //     }
    //     if (options.contentSelect.includes('(+220000)')) {
    //         defaultADDprice = 220000;
    //     } else if (options.contentSelect.includes('(+722000)')) {
    //         defaultADDprice = 722000;
    //     }
    //     return (selectedProduct.price + defaultADDprice) * btnValue.contentSelect + packageADDprice * btnValue.packagingSelect;
    // };    // ( 선택가격 + 선택가격의 옵션 ) x 선택 갯수 + (포장 옵션 * 포장 갯수)
    
    // // 토탈 금액에 대한 계산을 하는 함수는 state 값이 변경될때.
    // useEffect(() => {
    //     setTotalPrice(calculateTotalPrice());
    // }, [options,btnValue]);

const ProductBuy = ()=>{
    const location = useLocation();
    const { category, id } = useParams();
    const { options, btnValue, totalPrice } = location.state || {};
    //선택된 상품 해당 값 가져오기.
    const selectedProduct = GoodsItems.find(item => item.category === category && item.id === parseInt(id));
    
    //현재 접속중인 user의 userData 받아오기
    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("LoginUserInfo"));

    }, []);
    //Link 로 받아온 user
    const [buyPrice, setBuyPrice] = useState({
        productPrice: btnValue ? btnValue.contentSelect : 1,
        optionPrice: btnValue ? btnValue.packagingSelect : 1,
    });

    //최종 금액을 바꿀 state
    const [filterPrice, setFilterPrice] = useState(+totalPrice);

    //계산하는 함수
    const calculateTotalPrice = ()=>{
        let price = selectedProduct.price;
        const contentPrice = options.contentSelect.includes('(+220000)') ? 220000 :
        options.contentSelect.includes('(+722000)') ? 722000 : 0;
        const packagingPrice = options.packagingSelect.includes('(+2000원)') ? 2000 :
        options.packagingSelect.includes('(+4000원)') ? 4000 : 0;
        const totalPrice = (price + contentPrice) * buyPrice.productPrice + packagingPrice * buyPrice.optionPrice;
        return totalPrice;
    }

    //배송비 추가금을 포함한 최종금액 표현.
    const [lastPrice , setLastPrice]=useState(+filterPrice);

    //총금액을 buyprice에 담긴 값이 바뀔때마다 실행.
    useEffect(() => {
        console.log('useEffect called');
        // 총 금액을 계산하는 함수 호출
        const totalPrice = calculateTotalPrice();

        // 계산된 총 금액을 filterPrice 상태로 업데이트
        setFilterPrice(totalPrice); 

        // 만약 계산된 총 금액이 30000원보다 작으면, 
        //배송비 3000원을 추가한 값을 lastPrice로 설정
        if(totalPrice<30000){
            setLastPrice(totalPrice+3000);
        }else{
            setLastPrice(totalPrice);//그렇지 않으면 계산된 총금액을 lastPrice로 설정
        }
    }, [buyPrice]);
//총금액을 그냥 사용하지않고 LastPrice로 이용한 이유는
//배송비 추가발생에 대한 화면 명시를 하고싶었기 때문.

        const onClickbtn = (type , name) => {
            if (type === '-') {
                if(buyPrice[name]>1){
                    setBuyPrice(it => ({
                        ...it,
                        [name]: buyPrice[name] - 1
                    }));
                }else{
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
    if(!selectedProduct){
        return(
            <div className="ProductBuy" style={{marginTop : '150px'}}>
                아이템을 찾을 수 없어요
            </div>
        )
    }else{
        return(
            <div className="ProductBuy" style={{marginTop : '150px'}}>
                <h2></h2>
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
                            {options.contentSelect} :<span></span> {buyPrice.productPrice}개
                        </p>
                        <br/>
                        <p className='buySelect'>
                            수랑 변경
                            <div>
                            <button type='button' 
                            className="leftButton" 
                            onClick={()=>{onClickbtn('-','productPrice')}}>
                                <img src="/images/buy/minus.png" alt="" />
                            </button >
                            <input type="text" value={buyPrice.productPrice} readOnly />
                            <button type='button' 
                            className="rightButton"
                            onClick={()=>{onClickbtn('+','productPrice')}}>
                            <img src="/images/buy/plus.png" alt="" />
                            </button>
                            </div> 
                        </p>
                    </p>
                    <p>
                        <p>
                            {options.packagingSelect} : {buyPrice.optionPrice}개
                        </p>
                        <br/>
                        <p className='buySelect'>
                            수랑 변경 
                            <div>
                            <button type='button' 
                            className="leftButton" 
                            onClick={()=>{onClickbtn('-','optionPrice')}}>
                                <img src="/images/buy/minus.png" alt="" />
                            </button>
                            <input type="text" value={buyPrice.optionPrice} readOnly />
                            <button type='button' 
                            className="rightButton"
                            onClick={()=>{onClickbtn('+','optionPrice')}}>
                                <img src="/images/buy/plus.png" alt="" />
                            </button>
                            </div>
                        </p>
                    </p>
                </div>
                <div className='totalPrice'>
                <p>
                총 금액 : 
                <span className='TTPrice'>
                {formatNumber(lastPrice)}
                </span>
                </p>
                {(filterPrice<30000) && <span>(배송비 추가 발생 되었습니다.)</span>}
                </div>
                
                    
                </form>
            </div>
        )
    }
}
export default ProductBuy;