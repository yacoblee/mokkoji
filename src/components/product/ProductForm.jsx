import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userInfo from './../login/UserInforData';

// 선택된 상품 정보를 받는 컴포넌트
const ProductForm = ({ selectedProduct }) => {
    // 세션 스토리지에서 현재 로그인된 사용자 데이터를 가져옴
    const userData = JSON.parse(sessionStorage.getItem('LoginUserInfo'));

    // select 옵션에 대한 state
    const [options, setOptions] = useState({
        contentSelect: '', //왼쪽 옵션값
        packagingSelect: '', // 포장 옵션값
    });

    // 숫자 클릭에 대한 state
    const [btnValue, setBtnValue] = useState({
        contentSelect: 1,   //왼쪽 옵션의 갯수
        packagingSelect: 1, //포장 옵션의 갯수
    });

    // 토탈 금액에 대한 state
    const [totalPrice, setTotalPrice] = useState(+selectedProduct.price);

    // select 옵션에 대한 state 함수
    const onChangeSelectItems = (e) => {
        const { name, value } = e.target;
        setOptions(it => ({
            ...it,
            [name]: value
        }));
    };

    // 클릭이벤트 -> 숫자 클릭에 대한 state 함수
    const onClickbtn = (type, name) => {
        if (type === '-') {
            if (btnValue[name] > 1) {
                setBtnValue(it => ({
                    ...it,
                    [name]: btnValue[name] - 1
                }));
            } else {
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

    // 총 금액을 계산하는 함수
    const calculateTotalPrice = () => {
        if (!selectedProduct) return 0; // 선택된 상품이 없으면 0 반환
        let packageADDprice = 0; // 포장 추가 금액
        let defaultADDprice = 0; // 기본 추가 금액

        // 포장 옵션에 따라 추가 금액 설정
        if (options.packagingSelect.includes('(+2000원)')) {
            packageADDprice = 2000;
        } else if (options.packagingSelect.includes('(+4000원)')) {
            packageADDprice = 4000;
        }

        // 내용 옵션에 따라 추가 금액 설정
        if (options.contentSelect.includes('(+220000)')) {
            defaultADDprice = 220000;
        } else if (options.contentSelect.includes('(+722000)')) {
            defaultADDprice = 722000;
        }

        // 총 금액 계산
        return (selectedProduct.price + defaultADDprice) * btnValue.contentSelect + packageADDprice * btnValue.packagingSelect;
    };

    // 옵션이나 수량이 변경될 때마다 총 금액을 재계산하여 업데이트
    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [options, btnValue]);

    // 숫자를 금액으로 포맷팅하는 함수
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    };

    // 사용자의 로그인 상태 관리
    const [userLogin, setUserLogin] = useState(false);

    const navigate = useNavigate();

    // 세션 스토리지에서 사용자의 로그인 상태를 확인하여 업데이트
    useEffect(() => {
        if (userData) {
            setUserLogin(true);
        }
    }, [userData]);

    // '구매하기' 버튼 클릭 시 실행되는 함수
    const onClickBuy = () => {
        if (!userLogin) {
            // 로그인하지 않은 경우 로그인 페이지로 이동
            navigate('/Login');
            return;
        }

        if (!options.contentSelect || !options.packagingSelect) {
            // 모든 옵션을 선택하지 않은 경우 경고 메시지 표시
            alert("선택 옵션을 모두 선택해주세요.");
            return;
        }

        // 구매 페이지로 이동하며 선택한 옵션과 수량, 총 금액을 전달
        navigate(`/goods/${selectedProduct.category}/${selectedProduct.id}/buy`, {
            state: {
                options: options,
                btnValue: btnValue,
                totalPrice: totalPrice
            }
        });
    };


    // 장바구니 클릭할 때 세션스토리지에 추가
    const onClickBasket = ()=>{
        if (!userLogin) {
            // 로그인하지 않은 경우 로그인 페이지로 이동
            navigate('/Login');
            return;
        }

        if (!options.contentSelect || !options.packagingSelect) {
            // 모든 옵션을 선택하지 않은 경우 경고 메시지 표시
            alert("선택 옵션을 모두 선택해주세요.");
            return;
        }

        // 장바구니에 추가할 항목 생성
        const sendBasket = {
            productId: selectedProduct.id,
            options,
            quantity: btnValue,
            totalPrice
        };

        // 현재 사용자 데이터 업데이트
        const updatedUserData = {
            ...userData,
            mypage: {
                ...userData.mypage,
                basket: [...userData.mypage.basket, sendBasket]
            }
        };

        // 세션 스토리지에 업데이트된 사용자 데이터 저장
        sessionStorage.setItem('LoginUserInfo', JSON.stringify(updatedUserData));
        
    }

    // 리턴
    return (
        <form action="#">
            <div className='productFormSelect'>
                <select
                    name="contentSelect"
                    id="contentSelect"
                    value={options.contentSelect}
                    onChange={onChangeSelectItems}
                    required
                >
                    <option value="selectcontent" hidden>선택옵션</option>
                    {selectedProduct.option.map((option) => (
                        <option value={option} key={option}>{option}</option>
                    ))}
                </select>
                <select
                    name="packagingSelect"
                    id="packagingSelect"
                    value={options.packagingSelect}
                    onChange={onChangeSelectItems}
                    required
                >
                    <option value="selectPackage" hidden>포장여부</option>
                    <option key={'소'} value="굿즈 기본 포장(+0원)">굿즈 기본 포장(+0원)</option>
                    <option key={'중'} value="굿즈 부직포 가방(+2000원)">굿즈 부직포 가방(+2000원)</option>
                    <option key={'대'} value="굿즈 천 가방(+4000원)">굿즈 천 가방(+4000원)</option>
                </select>
            </div>
            <div className='price_box'>
                총금액 : <span className='content_price'>{formatNumber(totalPrice)}</span>원
            </div>
            <div className='priceifo'>
                <ul>
                    <li>{options.contentSelect ? options.contentSelect : '선택 옵션'}</li>
                    <li>{options.packagingSelect ? options.packagingSelect : '포장 여부'}</li>
                </ul>
                <div className='priceSelect'>
                    <ul>
                        <li>
                            <button type='button' onClick={() => { onClickbtn('-', 'contentSelect') }}>-</button>
                            <input type="text" value={btnValue.contentSelect} readOnly />
                            <button type='button' onClick={() => { onClickbtn('+', 'contentSelect') }}>+</button>
                        </li>
                        <li>
                            <button type='button' onClick={() => { onClickbtn('-', 'packagingSelect') }}>-</button>
                            <input type="text" value={btnValue.packagingSelect} readOnly />
                            <button type='button' onClick={() => { onClickbtn('+', 'packagingSelect') }}>+</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="select_button">
                <button type='button' className='basket_icon' onClick={onClickBasket}>
                    장바구니
                </button>
                <button type='button' className='buy_icon' onClick={onClickBuy}>
                    구매하기
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
