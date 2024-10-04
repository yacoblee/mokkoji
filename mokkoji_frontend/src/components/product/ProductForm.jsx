import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import ModalNotLogin from './ModalNotLogin';
import ModalNotOption from './ModalNotOption';
import ModalOkbasket from './ModalOkbasket';
import { API_BASE_URL } from "../../service/app-config";
import axios from "axios";
import { apiCall } from '../../service/apiService';
// 선택된 상품 정보를 받는 컴포넌트
const ProductForm = ({ product, userId }) => {
    // 세션 스토리지에서 현재 로그인된 사용자 데이터를 가져옴
    //const token = JSON.parse(sessionStorage.getItem('userData'));
    //console.log(`token : ${token}`)

    //const [slideimages, setSlideImages] = useState([]);
    const [option, setOption] = useState([]);
    const [packaging, setPackaging] = useState([]);
    useEffect(() => {
        let uri = API_BASE_URL + `/goods/${product.categoryId}/${product.id}`;
        const fetchProductForm = async () => {
            axios.get(uri, {
                params: {
                    type: 'form'  // 여러 값을 개별적으로 보냄
                }
            })
                .then(response => {
                    const { option, packaging } = response.data;
                    setOption(option);
                    setPackaging(packaging);

                    // 콘솔 로그로 데이터 확인
                    //console.log(option);
                })
                .catch(err => {
                    //alert(err.message);
                    console.log(err);

                    setPackaging([]);

                })
        }
        fetchProductForm();
    }, [product.id]);
    // const [user, setUser] = useState({});
    // useEffect(() => {
    //     //url, method, requestData, token
    //     const token = JSON.parse(sessionStorage.getItem('userData'));
    //     //requestData
    //     apiCall('/product/user', 'POST', null, token)
    //     .then((response)=>{
    //         setUser(response);
    //         console.log(user);
    //     })
    //     .catch((err)=>{

    //     })
    // }, []);



    // select 옵션가격에 대한 state
    const [options, setOptions] = useState({
        contentSelect: '', //왼쪽 옵션값
        packagingSelect: '', // 포장 옵션값
    });

    // select 옵션 내용에 대한 state
    const [description, setDescription] = useState({
        contentSelect: '선택 옵션',   //왼쪽 옵션의 내용 + 가격
        packagingSelect: '포장 여부', //포장 옵션의 갯수 + 가격
    });

    //select 온전한 옵션 내용에 대한 state
    const [content, setContent] = useState({
        contentSelect: '',   //왼쪽 옵션의 내용
        packagingSelect: '', //포장 옵션의 내용
    });
    //9.11 코드 변경
    const [count, setConut] = useState(1);

    // 토탈 금액에 대한 state
    const [totalPrice, setTotalPrice] = useState(+product.price);

    // select 옵션에 대한 state 함수
    const onChangeSelectItems = (e) => {
        const { name, value, selectedOptions } = e.target;
        const description = selectedOptions[0].getAttribute('data-description');
        setOptions(it => ({
            ...it,
            [name]: +value
        }));
        setDescription(it => ({
            ...it,
            [name]: `${description}${value > 0 ? ` (+${value}원)` : ''}`
        }));
        setContent(it => ({
            ...it,
            [name]: description,
        }))
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

    const calculateTotalPrice = () => {
        if (!product) return 0; // 선택된 상품이 없으면 0 반환

        return (product.price + options.contentSelect + options.packagingSelect) * count;
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
        if (userId) {
            setUserLogin(true);
        }
    }, [userId]);

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

        if (!content.contentSelect || !content.packagingSelect) {
            // 모든 옵션을 선택하지 않은 경우 경고 메시지 표시
            setIsModalOptionOpen(true);
            return;
        }
        console.log(`content.contentSelect : ${content.contentSelect}`)
        console.log(`content.contentSelect : ${content.packagingSelect}`)
        const token = JSON.parse(sessionStorage.getItem('userData'));

        const insertOrder = async () => {
            // 구매하기 정보 추가할 항목 생성
            const sendBasket = {// 이형태는 Cart Entity구조 와 동일함
                userId: userId, // userId 를 찾아 보내줘야함.(String)
                productId: product.id, // 해당하는 productId를 찾아 보냄.(String)
                optionContent: content.contentSelect, // 해당하는 상품옵션내용(String)
                packagingOptionContent: content.packagingSelect,//해당하는 포장옵션내용(String)
                productCnt: count,//해당하는 갯수(int)
                productTotalPrice: totalPrice,//총계산을 마친 금액 (int)
            };
            console.log(`${sendBasket.userId}`);
            console.log(`${sendBasket.productId}`);
            console.log(`${sendBasket.optionContent}`);
            console.log(`${sendBasket.packagingOptionContent}`);
            console.log(`${sendBasket.productCnt}`);
            console.log(`${sendBasket.productTotalPrice}`);
            try {
                const response = await apiCall(`/order/page`, 'POST', sendBasket, token);
                const { product, option, packaging, productBuy } = response.data; //(products Entity)(productOptions Entity)(packaing Entity)를 받아 state에 넣어줌.
                //setLike(liked);
                //alert(message);
                console.log(product);
                console.log(option);
                console.log(packaging);
                //alert('insertOrder 성공');
                // 구매 페이지로 이동하며 선택한 옵션과 수량, 총 금액을 전달
                navigate(`/orderpage`, {
                    state: {
                        productBuy: productBuy
                    }
                });
            } catch (error) {
                //setLike(false);
                console.log(`insert order error =>${error.message}`)
                alert(`insertOrder 실패`);
            }
        }
        insertOrder();

    };


    // 장바구니 클릭할 때 세션스토리지에 추가
    const onClickBasket = () => {
        if (!userLogin) {
            setIsLoginModalOpen(true);
            return;
        }
        console.log(`왼쪽 내용 : ${content.contentSelect}`)
        console.log(`오른쪽 내용 : ${content.packagingSelect}`)
        console.log(`위의 내용이 없으면 옵션 값이 넘어가지 못해서 모달창이 떠욘`)
        if (!content.contentSelect || !content.packagingSelect) {
            setIsModalOptionOpen(true);
            return;
        }
        const token = JSON.parse(sessionStorage.getItem('userData'));
        const insertCart = async () => {
            // 장바구니에 추가할 항목 생성
            const sendBasket = {
                userId: userId,
                productId: product.id,
                optionContent: content.contentSelect,
                packagingOptionContent: content.packagingSelect,
                productCnt: count,
                productTotalPrice: totalPrice,
            };
            try {
                const response = await apiCall('/cart/insertitem', 'POST', sendBasket, token);
                //const { message } = response.data;
                //setLike(liked);
                //alert(message);
            } catch (error) {
                //setLike(false);
                console.log(`insert Like error =>${error.message}`)
                alert(`insert Like_ProductForm error =>${error.message}`);
            }
        }
        insertCart();
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
                    {option.map((option) => (
                        <option value={option.price} key={option.content}
                            data-description={option.content}>
                            {option.content}
                            {option.price > 0 ? `(+${option.price}원)` : ""} </option>
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
                    {packaging.map((packaging) => (
                        <option value={packaging.packagingPrice} key={packaging.packagingContent}
                            data-description={packaging.packagingContent}>
                            {packaging.packagingContent}
                            {packaging.packagingPrice > 0 ? `(+${packaging.packagingPrice}원)` : ''} </option>
                    ))}
                </select>
            </div>
            <div className='price_box'>
                총금액 : <span className='content_price'>{formatNumber(totalPrice)}</span>원
            </div>
            <div className='priceifo'>
                <ul>
                    <li>{description.contentSelect}</li>
                    <li>{description.packagingSelect}</li>
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
