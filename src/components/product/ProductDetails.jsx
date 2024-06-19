import React, { useState , useEffect } from 'react';

import { useParams , Link } from "react-router-dom";
import GoodsItems from "./ProductObject";

const formatNumber = (number) => {
    return number.toLocaleString('en-US');
}
const ProductDetails = ()=>{ //=========================================================ProductDetails 컴포넌트
    const { category, id } = useParams();
    const [options, setOptions] = useState({
        contentSelect: '',
        packagingSelect: '',
    });
    
    
    const selectedProduct = GoodsItems.find((item) => item.category === category && item.id === parseInt(id));
    const [totalPrice, setTotalPrice] = useState(+selectedProduct.price);
    
    const onChangeSelectItems = (e) => {
        const { name, value } = e.target;
        setOptions(it => ({
            ...it,
            [name]: value
        }));

    };
    const [btnValue , setBtnValue] =  useState({
        contentSelect: 1,
        packagingSelect: 1,
    });

    useEffect(() => {
        if (selectedProduct) {
            let price = 0 * btnValue.packagingSelect;
            if (options.packagingSelect.includes('(+2000원)')) {
                price = 2000;
            } else if (options.packagingSelect.includes('(+4000원)')) {
                price = 4000;
            }
            setTotalPrice( selectedProduct.price * btnValue.contentSelect + price * btnValue.packagingSelect);
            console.log(selectedProduct.price +'*'+ btnValue.contentSelect +'+'+price +'*'+btnValue.packagingSelect +'='+ totalPrice)
        }
    }, [options, selectedProduct ,btnValue]);

    
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
            // setBtnValue(btnValue => (btnValue[name] > 1 ? btnValue[name] - 1 : 1));
        } else {
            setBtnValue(it => ({
                ...it,
                [name]: btnValue[name] + 1
            }));
        }
    };
    // ======================================================================================return
    if (!selectedProduct) {
        return <div style={{marginTop:'150px'}}>Product not found</div>;
    }else{

        return(
            <div style={{marginTop:'150px'}} className='box'>
                <div className='imgBox'>
                    {selectedProduct.slideSrc.map((src)=><img src={src} alt="" />)}
                    <div className='labelBox'>
                        {selectedProduct.slideSrc.map((src)=><img src={src} alt="" />)}
                    </div>
                    <p>
                        {selectedProduct.name}
                    </p>
                </div>
                <div className='formBox'>
                    <div className='routeBox'>
                    <Link to="/" >home</Link>
                    <Link to="/goods" >goods</Link> 
                    <Link to={`/goods/${selectedProduct.category}`} >goodsList</Link> 
                    </div>
                    <div className='forminner'>
                        <p>
                        {selectedProduct.mainGuide}
                            <p className='deliveryifo'>
                                * 30,000원 미만 3,000원 / 30,000원 이상 무료배송
                            </p>
                        </p>
                        <form action="#">
                            <div>
                                <select 
                                name="contentSelect" 
                                id="contentSelect" 
                                value={options.contentSelect} 
                                onChange={onChangeSelectItems}>
                                    <option value="selectcontent" hidden>선택옵션</option>
                                    {selectedProduct.option.map((option)=>{
                                        return(
                                            <option value={option} key="">{option}</option>
                                        )
                                    })}
                                </select>
                                <select name="packagingSelect" id="packagingSelect" value={options.packagingSelect} onChange={onChangeSelectItems}>
                                    <option value="selectPackage" hidden>포장여부</option>
                                    <option value="굿즈 기본 포장(+0원)" >굿즈 기본 포장(+0원)</option>
                                    <option value="굿즈 부직포 가방(+2000원)"> 굿즈 부직포 가방(+2000원) </option>
                                    <option value="굿즈 천 가방(+4000원)"> 굿즈 천 가방(+4000원) </option>
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
                            <button type='button'>
                                {/* <img src="./image/icon-heart.png" alt=""> */} 찜
                            </button>
                            <button type='button'>
                                {/* <img src="./image/icon-shopping-cart.png" alt=""> */} 장바구니
                            </button>
                            <button type='button'>
                                구매하기
                            </button>
                        </div>
                        </form>
                    </div>
    
                </div>
    
            </div>
        );
    }
}

export default ProductDetails;