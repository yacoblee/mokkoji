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
    const selectedProduct = GoodsItems.find(item => item.category === category && item.id === parseInt(id));
    
    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("userInfo"));

    }, []);

    const [buyPrice, setBuyPrice] = useState({
        productPrice: btnValue ? btnValue.contentSelect : 1,
        optionPrice: btnValue ? btnValue.packagingSelect : 1,
    });

    useEffect(() => {
        console.log('useEffect called');
        
    }, []);

    const price = {
        pruduct : +btnValue.contentSelect,
        option : +btnValue.packagingSelect,
    }

    let filterPrice = totalPrice ;
    if(totalPrice<30000){
        filterPrice += 3000;
    }
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
                <div className='buyInfo'>
                    <input type="checkBox" />
                    <img src={selectedProduct.productSrc[0]} alt="" />
                    <ul>
                        <li>
                            상품명 
                        </li>
                        <li>
                            {selectedProduct.name}
                        </li>
                        <li>
                        상품 가격
                        </li>
                        <li>
                            {formatNumber(selectedProduct.price)}
                        </li>
                        <li>
                            상품 정보
                        </li>
                        <li className='buySelect'>
                            <span>
                            {options.contentSelect} : {buyPrice.productPrice}개
                            </span>
                            <span>
                            수랑 변경 <button type='button' onClick={()=>{onClickbtn('-','productPrice')}}>-</button>
                            <button type='button' onClick={()=>{onClickbtn('+','productPrice')}}>+</button>
                            </span>
                        </li>
                        <li>
                        포장 여부
                        </li>
                        <li className='buySelect'>
                            <span>
                            {options.packagingSelect} : {buyPrice.optionPrice}개
                            </span>
                            <span>
                            수랑 변경 <button type='button' onClick={()=>{onClickbtn('-','optionPrice')}}>-</button> 
                            <button type='button' onClick={()=>{onClickbtn('+','optionPrice')}}>+</button>
                            </span>
                        </li>
                        <li>
                            총 금액 
                        </li>
                        <li>
                            {formatNumber(filterPrice)}
                            {(totalPrice<30000) && <span>(배송비 추가 발생 되었습니다.)</span>}
                        </li>
                    </ul>
                </div>
                
                <form action="#">
                    
                </form>
            </div>
        )
    }
}
export default ProductBuy;