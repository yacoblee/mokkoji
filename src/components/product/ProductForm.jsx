import React, { useState , useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from './../login/Login';



const ProductForm = ({selectedProduct})=>{
    // select 옵션에 대한 state
    const [options, setOptions] = useState({
        contentSelect: '', //왼쪽 옵션값
        packagingSelect: '', // 포장 옵션값
    });
    //숫자 클릭에 대한 state
    const [btnValue , setBtnValue] =  useState({
        contentSelect: 1,   //왼쪽 옵션의 갯수
        packagingSelect: 1, //포장 옵션의 갯수
    });
    // 토탈 금액에 대한 state
    const [totalPrice, setTotalPrice] = useState(+selectedProduct.price);
    

    //select 옵션에 대한 state 함수
    const onChangeSelectItems = (e) => {
        const { name, value } = e.target;
        setOptions(it => ({
            ...it,
            [name]: value
        }));
    };

    // 클릭이벤트 -> 숫자 클릭에 대한 state 함수
    const onClickbtn = (type , name) => {
        if (type === '-') {
            if(btnValue[name]>1){
                setBtnValue(it => ({
                    ...it,
                    [name]: btnValue[name] - 1
                }));
            }else{
                setBtnValue(it => ({
                    ...it,
                    [name]: btnValue[name] 
                }));
            }
            
        } else {
            setBtnValue(it => ({
                ...it,
                [name]: btnValue[name] + 1
            }));
        }
    };

    //토탈 금액에 대한 계산을 하는 함수
    const calculateTotalPrice = () => {
        if (!selectedProduct) return 0;
        let packageADDprice = 0;
        let defaultADDprice = 0;

        if (options.packagingSelect.includes('(+2000원)')) {
            packageADDprice = 2000;
        } else if (options.packagingSelect.includes('(+4000원)')) {
            packageADDprice = 4000;
        }
        if (options.contentSelect.includes('(+220000)')) {
            defaultADDprice = 220000;
        } else if (options.contentSelect.includes('(+722000)')) {
            defaultADDprice = 722000;
        }
        return (selectedProduct.price + defaultADDprice) * btnValue.contentSelect + packageADDprice * btnValue.packagingSelect;
    };    // ( 선택가격 + 선택가격의 옵션 ) x 선택 갯수 + (포장 옵션 * 포장 갯수)
    
    // 토탈 금액에 대한 계산을 하는 함수는 state 값이 변경될때.
    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [options,btnValue]);

    // 숫자를 금액으로 변경해주는 함수
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    }
    
    //로그인 상태를 확인하는 상태값 
    const [userLogin, SetUserLogin] = useState(false);
    const user = JSON.parse(localStorage.getItem("userInfo"));
    useEffect(() => {
        console.log(user);

        //로그인이 완료되면 ture 값으로 판별
        if (user) {
            SetUserLogin(true);
        }
        console.log('useEffect called');
    }, []);
    
    const navigate = useNavigate();
    const onClickBuy = ()=>{
        if (!userLogin) {
            navigate('/Login');
            return;
        }

        if (!options.contentSelect || !options.packagingSelect) {
            alert("선택 옵션을 모두 선택해주세요.");
            return;
        }

        navigate(`/goods/${selectedProduct.category}/${selectedProduct.id}/buy`, {
            state: {
                options: options,
                btnValue: btnValue,
                totalPrice: totalPrice
            }
        });
    }

    //리턴
    return(

        <form action="#">
        <div className='productFormSelect'>
            <select 
            name="contentSelect" 
            id="contentSelect" 
            value={options.contentSelect} 
            onChange={onChangeSelectItems}
            required>
                <option value="selectcontent" hidden>선택옵션</option>
                {selectedProduct.option.map((option)=>{
                    return(
                        <option value={option} key="">{option}</option>
                    )
                })}
            </select>
            <select name="packagingSelect" 
            id="packagingSelect" 
            value={options.packagingSelect} 
            onChange={onChangeSelectItems}
            required>
                <option value="selectPackage" hidden>포장여부</option>
                <option key={'소'} value="굿즈 기본 포장(+0원)" >굿즈 기본 포장(+0원)</option>
                <option key={'중'}value="굿즈 부직포 가방(+2000원)"> 굿즈 부직포 가방(+2000원) </option>
                <option key={'대'} value="굿즈 천 가방(+4000원)"> 굿즈 천 가방(+4000원) </option>
            </select>
        </div>
        <div className='price_box'>
            총금액 : <span className='content_price'>{formatNumber(totalPrice)}</span>원
        </div>
        <div className='priceifo'>
            <ul>
                <li>{ options.contentSelect ? options.contentSelect  : '선택 옵션'}</li>
                <li>{ options.packagingSelect ? options.packagingSelect  : '포장 여부'}</li>
            </ul>
        <div className='priceSelect'>
            <ul>
                <li>
                    <button  type='button' onClick={()=>{onClickbtn('-','contentSelect')}}>-</button>
                    <input type="text" value={btnValue.contentSelect} readOnly/>
                    <button type='button' onClick={()=>{onClickbtn('+','contentSelect')}}>+</button>
                </li>
                <li>
                    <button type='button' onClick={()=>{onClickbtn('-','packagingSelect')}}>-</button>
                    <input type="text" value={btnValue.packagingSelect} readOnly/>
                    <button type='button' onClick={()=>{onClickbtn('+','packagingSelect')}}>+</button>
                </li>
            </ul>

        </div>
        </div>
        <div class="select_button">

        <button type='button'
        className='basket_icon'>
    
            장바구니
        </button>
        <button type='button' className='buy_icon' onClick={onClickBuy}>
                    구매하기
                </button>
    </div>
    </form>
)}

export default ProductForm;