import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import ModalNotLogin from './ModalNotLogin';
import ModalNotOption from './ModalNotOption';
import ModalOkbasket from './ModalOkbasket';


// 선택된 상품 정보를 받는 컴포넌트
const ProductForm = ({ selectedProduct }) => {
    // 세션 스토리지에서 현재 로그인된 사용자 데이터를 가져옴
    const userData = JSON.parse(sessionStorage.getItem('LoginUserInfo'));
    const items = JSON.parse(sessionStorage.getItem("goodsList"));


    // select 옵션에 대한 state
    const [options, setOptions] = useState({
        contentSelect: '', //왼쪽 옵션값
        packagingSelect: '', // 포장 옵션값
    });

    // 숫자 클릭에 대한 state
    // const [btnValue, setBtnValue] = useState({
    //     contentSelect: 1,   //왼쪽 옵션의 갯수
    //     packagingSelect: 1, //포장 옵션의 갯수
    // });
    //9.11 코드 변경
    const [count, setConut] = useState(1);

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
            if (count > 1) {
                setConut(count - 1);
            } else {
                setConut(count);
            }
        } else {
            setConut(count + 1);
        }
    };

    // 총 금액을 계산하는 함수
    const calculateTotalPrice = () => {
        if (!selectedProduct) return 0; // 선택된 상품이 없으면 0 반환
        let packagingPrice = 0; // 포장 추가 금액
        let contentPrice = 0; // 기본 추가 금액

        const packagingStartIndex = options.packagingSelect.indexOf('(+');
        const packagingEndIndex = options.packagingSelect.indexOf('원)');
        const contentSelectStartIndex = options.contentSelect.indexOf('(+');
        const contentSelectEndIndex = options.contentSelect.indexOf('원)');

        // 포장 옵션에 따라 추가 금액 설정

        if (packagingStartIndex !== -1 && packagingEndIndex !== -1) {
            packagingPrice = +(options.packagingSelect.slice(packagingStartIndex + 2, packagingEndIndex))
        }
        // 내용 옵션에 따라 추가 금액 설정

        if (contentSelectStartIndex !== -1 && contentSelectEndIndex !== -1) {
            contentPrice = +(options.contentSelect.slice(contentSelectStartIndex + 2, contentSelectEndIndex))
        }
        console.log("contentPrice=> " + options.packagingSelect.slice(packagingStartIndex + 2, packagingEndIndex));
        console.log("packagingPrice=> " + packagingPrice);
        // 총 금액 계산
        return (selectedProduct.price + contentPrice) * count + packagingPrice * count;
    };

    // 옵션이나 수량이 변경될 때마다 총 금액을 재계산하여 업데이트
    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [options, count]);

    // 숫자를 금액으로 포맷팅하는 함수
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    };
    //구매하기로 넘겼을때 state로 정보 전송을 위한 navigate.
    const navigate = useNavigate();

    // 사용자의 로그인 상태 관리
    const [userLogin, setUserLogin] = useState(false);


    // 세션 스토리지에서 사용자의 로그인 상태를 확인하여 업데이트
    useEffect(() => {
        if (userData) {
            setUserLogin(true);
        }
    }, [userData]);

    //모달창을 관리할 state
    //로그인 필요합니다
    const [isModalLoginOpen, setIsLoginModalOpen] = useState(false);
    //옵션을 선택해주세요
    const [isModalOptionOpen, setIsModalOptionOpen] = useState(false);
    //장바구니에 추가되었습니다.
    const [isModalBasketOpen, setIsModalBasketOpen] = useState(false);


    // '구매하기' 버튼 클릭 시 실행되는 함수
    const onClickBuy = (e) => {
        e.preventDefault();
        if (!userLogin) {
            setIsLoginModalOpen(true);
            return;
        }

        if (!options.contentSelect || !options.packagingSelect) {
            // 모든 옵션을 선택하지 않은 경우 경고 메시지 표시
            setIsModalOptionOpen(true);
            return;
        }

        // 구매 페이지로 이동하며 선택한 옵션과 수량, 총 금액을 전달
        navigate(`/goods/${selectedProduct.category}/${selectedProduct.id}/buy`, {
            state: {
                options: options,
                count: count,
                totalPrice: totalPrice
            }
        });
    };


    // 장바구니 클릭할 때 세션스토리지에 추가
    const onClickBasket = () => {
        if (!userLogin) {
            setIsLoginModalOpen(true);
            return;
        }

        if (!options.contentSelect || !options.packagingSelect) {
            // 모든 옵션을 선택하지 않은 경우 경고 메시지 표시
            setIsModalOptionOpen(true);
            return;
        }

        // 장바구니에 추가할 항목 생성
        const sendBasket = {
            productId: selectedProduct.id,
            options,
            count,
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
        setIsModalBasketOpen(true);
    }


    // 리턴
    return (
        <form onSubmit={onClickBuy}>
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
                    <li className='priceSelect'>
                        <button type='button' onClick={() => { onClickbtn('-', 'contentSelect') }}>-</button>
                        <input type="text" value={count} readOnly />
                        <button type='button' onClick={() => { onClickbtn('+', 'contentSelect') }}>+</button>

                    </li>
                </ul>
            </div>
            <div className="select_button">
                <button type='button' className='basket_icon' onClick={onClickBasket}>
                    장바구니
                </button>
                <button className='buy_icon'
                    type="submit"
                // onClick={onClickBuy}
                >
                    구매하기
                </button>
            </div>
            <Modal
                isOpen={isModalLoginOpen}
                ariaHideApp={false}
                onRequestClose={() => setIsLoginModalOpen(false)}
                contentLabel="로그인 필요"
                style={{
                    content: {
                        height: '180px',
                        width: '300px',
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        alignItems: 'center',
                        zIndex: '1000',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <div className='Modalbutton'>
                    <button
                        onClick={() => navigate('/Login')}>로그인</button>
                    <button onClick={() => setIsLoginModalOpen(false)}>닫기</button>
                </div>
                <ModalNotLogin />
            </Modal>
            <Modal
                isOpen={isModalOptionOpen}
                ariaHideApp={false}
                onRequestClose={() => setIsModalOptionOpen(false)}
                contentLabel="옵션 선택 필요"
                style={{
                    content: {
                        height: '140px',
                        width: '300px',
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        alignItems: 'center',
                        border: '1px solid #d0c0a0e2',
                        zIndex: '1000',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                    }
                }}
            >   <div className='Modalbutton'>
                    <button onClick={() => setIsModalOptionOpen(false)}>닫기</button>
                </div>
                <ModalNotOption />
            </Modal>
            <Modal
                isOpen={isModalBasketOpen}
                ariaHideApp={false}
                onRequestClose={() => setIsModalBasketOpen(false)}
                contentLabel="장바구니 확인"
                style={{
                    content: {
                        height: '140px',
                        width: '300px',
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        alignItems: 'center',
                        zIndex: '1000',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <div className='Modalbutton'>
                    <button
                        onClick={() => navigate('/mypage/cart')}>장바구니 확인</button>

                    <button onClick={() => setIsModalBasketOpen(false)}>닫기</button>
                </div>
                <ModalOkbasket />
            </Modal>
        </form >
    );
};

export default ProductForm;
