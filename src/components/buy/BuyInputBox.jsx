import { useEffect, useRef, useState } from "react";
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from "react-router-dom";
import BuyComplete from "./BuyComplete";


//selectProduct가 체크되지 않았다면 false가 반환됨.
const BuyInputBox = ({ userData, totalPrice, amount, checkedCartItems, selectedProduct, options, productPrice }) => {
    const navigate = useNavigate()
    //배송지 선택에 대한 true false 관리.
    const [addressing, setAddressing] = useState(true);

    //모달창의 스크롤을 해결하기 위한 Ref
    const modalContentRef = useRef(null);


    //유저 관리에 대한 저장 변수.
    const [userInfo, setUserInfo] = useState({});
    //유저 관리 에러에 대한 저장 변수.
    const [userInfoError, setUserInfoError] = useState({});
    // console.log(userInfo);
    // 처음 렌더링 시 userInfo를 설정.
    useEffect(() => {
        if (userData) {
            setUserInfo({
                name: userData.name || '',
                phoneNumber: userData.phoneNumber || '',
                address: userData.address || '',
                addressDetail: userData.addressDetail || '',
                zoneCode: userData.zoneCode || ''
            });
            setUserInfoError({
                name: false,
                phoneNumber: false,
                addressDetail: false,
                zoneCode: false,
                deliveryMessage: false,
            })
        }
    }, [userData]);

    //배송지 선택에 따라 input값을 변환.
    const onChangeAddressing = () => {
        if (addressing) {
            setUserInfo({
                name: '',
                phoneNumber: '',
                address: '',
                addressDetail: '',
                zoneCode: ''
            });
            setUserInfoError({
                name: true,
                phoneNumber: true,
                addressDetail: true,
                zoneCode: true,
                // deliveryMessage: false,
            })
        } else {
            setUserInfo({
                name: userData.name || '',
                phoneNumber: userData.phoneNumber || '',
                address: userData.address || '',
                addressDetail: userData.addressDetail || '',
                zoneCode: userData.zoneCode || ''
            });
            setUserInfoError({
                name: false,
                phoneNumber: false,
                addressDetail: false,
                zoneCode: false,
            })
        }
        setAddressing(!addressing);
    };
    // console.log(userInfoError);

    //수기로 작성했을때 onChange 이벤트를 통해 value값을 지정.
    const onChangeUserInfo = (e) => {
        const { name, value } = e.target;
        setUserInfo((info) => ({
            ...info,
            [name]: value,
        }));
        // console.log(`Name: ${name}, Value: ${value}, Length: ${value.length}`);

        if (name === 'name') {
            if (value.length < 2 || value.length > 5) {
                setUserInfoError((error) => ({ ...error, name: true }))
            } else {
                setUserInfoError((error) => ({ ...error, name: false }))
            }
        }

        if (name === 'phoneNumber') {
            const noneNumber = /[^0-9]/g;
            const isValidPhoneNumber = !noneNumber.test(value);
            if (isValidPhoneNumber && value.length > 8 && !(value.includes('-'))) {
                setUserInfoError((error) => ({ ...error, phoneNumber: false })); // 숫자면 들어와요
            } else {
                setUserInfoError((error) => ({ ...error, phoneNumber: true }));
            }
        }
        if (name === 'addressDetail') {
            if (value.trim().length < 1) {
                setUserInfoError((error) => ({ ...error, [name]: true }));
            } else {
                setUserInfoError((error) => ({ ...error, [name]: false }));

            }
        }
        // console.log(userInfoError.zoneCode);
    };

    //모달 상태창에 대한 true , false
    const [isModalOpen, setIsModalOpen] = useState(false);

    //모달창에서 클릭하고 나면 , 값을 가지고 userInfo에 저장 -> value 값으로 전송. / 모달창 닫음.
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setUserInfo((info) => ({
            ...info,
            zoneCode: data.zonecode,
            address: fullAddress
        }));
        setUserInfoError((error) => ({ ...error, zoneCode: false }));

        setIsModalOpen(false);
    };

    //모달창 오픈
    const openAddress = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };


    //select 값을 저장할 state.
    const [selectBox, SetSelectBox] = useState({
        deliveryMessage: '문 앞에 놔주세요',
        buyHow: '',
    });
    // useEffect(()=>{
    //     SetSelectBox((it)=>({...it,deliveryMessage:'문 앞에 놔주세요'}))
    // },[]);
    //직접 입력시 인풋창을 활성화 시킬 state
    const [directInput, setDirectInput] = useState(false);
    // console.log(selectBox.deliveryMessage)
    //select를 선택했을때 onchange 이벤트
    //직접입력이 아닐경우는 false로 지정
    const onChangeSelectBox = (e) => {
        SetSelectBox((box) => ({ ...box, deliveryMessage: e.target.value }));
        if (e.target.value !== '직접입력') {
            setDirectInput(false);
            // deliveryMessage : false,
            // setUserInfoError(error => ({ ...error, deliveryMessage: false }))
        } else {
            setDirectInput(true);
            // setUserInfoError(error => ({ ...error, deliveryMessage: true }))

        }
        // console.log(e.target.value , userInfoError.deliveryMessage);
    }
    useEffect(() => {
        if (selectBox.deliveryMessage === '직접입력' || selectBox.deliveryMessage.trim() === '') {
            setUserInfoError(error => ({ ...error, deliveryMessage: true }))
        } else {
            setUserInfoError(error => ({ ...error, deliveryMessage: false }))
        }
        // console.log(selectBox.deliveryMessage, userInfoError.deliveryMessage);
    }, [selectBox.deliveryMessage]);

    const onChangeRadioBox = (e) => {
        SetSelectBox((box) => ({ ...box, buyHow: e.target.value }));
    }
    //버튼 상태를 관리할 state.
    const [isBuyButtonDisabled, setIsBuyButtonDisabled] = useState(true);


    useEffect(() => {
        //checking 은 userInfo 의 빈문자열인 값들을 저장. 즉 저장된게 없어야 진행.
        // userInfo의 각 값에 대해 trim()을 적용한 후 빈 문자열인지 확인
        // const checking = Object.values(userInfo).map(it => it.trim()).filter((it) => it === '');
        //전부 false 여야지만 true를 반환
        const checking = Object.values(userInfoError).every((it) => it === false);
        // console.log(userInfoError);
        // console.log(checking);
        //selectedALLproduct는 본품과 장바구니의 체크여부를 구하기 위해서.
        //즉 1개 이상 선택되어야지만 진행.
        let selectedALLproduct = [];
        if (selectedProduct) {
            selectedALLproduct = [...checkedCartItems, selectedProduct];
            // 본품이 존재한다면 -> 본품과 장바구니 항목을 추가 -> 길이를 구하기 위한 로직

        } else {
            selectedALLproduct = [...checkedCartItems];
            //본품이 존재하지 않는다면 -> 이전에 구해놓은 장바구니 체크항목을 복사.
        }
        // console.log(selectedALLproduct);
        // console.log(checkedCartItems);
        //checking 이 true , 구매방법을 체크하면서 , 구매할 항목이 하나라도 있어야 , 직접입력후 기입하여야.
        if (checking && selectBox.buyHow !== '' && selectedALLproduct.length > 0) {
            setIsBuyButtonDisabled(false); //BUY 버튼 활성화
        } else {
            setIsBuyButtonDisabled(true); // BUY 버튼 비활성화
        }
    }, [selectBox, selectedProduct, checkedCartItems, userInfoError]);


    //구매 확인 버튼의 모달창.
    const [isModalBuyOpen, setIsModalBuyOpen] = useState(false);

    // console.log(selectBox.deliveryMessage);
    //구매버튼 이벤트
    const onClickBuyButton = (e) => {
        e.preventDefault();
        if (!selectBox.deliveryMessage) {
            SetSelectBox((it) => ({ ...it, deliveryMessage: '문 앞에 놔주세요' }))
        }
        setIsModalBuyOpen(true);
        // 깊은 복사를 통해 userData 복사
        const copyUserData = JSON.parse(JSON.stringify(userData));
        const currentDate = new Date();
        const nowDay = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`

        //history 객체 가공 item 배열에 카트 아이템을 추가(push).
        // const history = { date: nowDay, item: [selectedProduct.id] };
        const history = { date: nowDay, item: selectedProduct ? [selectedProduct.id] : [] };

        checkedCartItems.map((item) => {
            history.item.push(item.productId);
        });
        //복사된 userData 의 history 앞부분에 넣어줌 (unshift)
        copyUserData.mypage.history.push(history);
        // console.log('buyinputBox의 buy 버튼 클릭. history 추가내역');
        // console.log(copyUserData.mypage.history);
        //세션 스토리지에 복사된 userData 로 변경..


        //장바구니와 선택상품이 일치할경우 장바구니의 목록 삭제
        const userBasket = userData.mypage.basket;
        let cartItemsfilter = []
        cartItemsfilter = userBasket.filter((item) => {
            // checkedCartItems 배열에 item.productId와 일치하는 항목이 있는지 확인
            return !checkedCartItems.some(checkedItem => checkedItem.productId === item.productId);
        });
        // console.log('장바구니 아이템');
        // console.log(userBasket);
        // console.log('선택된 아이템');
        // console.log(checkedCartItems);
        // console.log('필터된 아이템')
        // console.log(cartItemsfilter);
        copyUserData.mypage.basket = cartItemsfilter;
        sessionStorage.setItem('LoginUserInfo', JSON.stringify(copyUserData));

        if (modalContentRef.current) {
            modalContentRef.current.scrollTop = 0; // 모달이 열릴 때 스크롤을 맨 위로 설정
        }

    }
    // console.log(userData.mypage.basket);
    // console.log(checkedCartItems);

    return (
        <form className='buyBox' onSubmit={onClickBuyButton}>
            <div className='buyInput'>
                <div>
                    <p>배송지 정보</p>
                </div>

                <div className='buyForm'>
                    <label htmlFor="buyID">배송지선택</label>
                    <div className='buyRadioBox'>
                        <input
                            type="radio"
                            name='delivery'
                            id='basicsAddress'
                            checked={addressing}
                            onChange={onChangeAddressing}
                        />
                        <label htmlFor="basicsAddress">기본 배송지</label>
                        <input
                            type="radio"
                            name='delivery'
                            id='newAddress'
                            checked={!addressing}
                            onChange={onChangeAddressing}
                        />
                        <label htmlFor="newAddress">새로운 배송지</label>
                    </div>
                    <label htmlFor="name">성함</label>
                    <input
                        type="text"
                        id='name'
                        name="name"
                        minLength={2}
                        maxLength={5}
                        value={userInfo.name}
                        onChange={onChangeUserInfo}
                        className={userInfoError.name ? 'errors' : ''}
                        required
                    // style={{ borderBottom : userInfoError.name ? '1px solid red' : '1px solid #aaaaaa'
                    // }}
                    />
                    <label htmlFor="phoneNumber">연락처</label>
                    <input
                        type="text"
                        id='phoneNumber'
                        name="phoneNumber"
                        value={userInfo.phoneNumber}
                        onChange={onChangeUserInfo}
                        className={userInfoError.phoneNumber ? 'errors' : ''}
                        required
                        placeholder="(-)없이 입력"
                    />
                    <label htmlFor="addressDetail">주소</label>
                    <div className='addressBox'>
                        <div>
                            <input
                                type="text"
                                id='buyAddress1'
                                name="zoneCode"
                                placeholder='우편번호'
                                value={userInfo.zoneCode}
                                maxLength={5}
                                readOnly
                                required
                                onChange={onChangeUserInfo}
                                className={userInfoError.zoneCode ? 'errors' : ''}

                            />
                            <button
                                type="button"
                                onClick={openAddress}
                            >
                                우편 번호 검색
                            </button>
                        </div>
                        <input
                            type="text"
                            id='buyAddress2'
                            value={userInfo.address}
                            className={userInfoError.zoneCode ? 'errors' : ''}
                            readOnly
                            required

                        />
                        <input
                            type="text"
                            id='addressDetail'
                            name="addressDetail"
                            value={userInfo.addressDetail}
                            onChange={onChangeUserInfo}
                            required
                            placeholder='상세 주소 입력'
                            className={userInfoError.addressDetail ? 'errors' : ''}

                        />
                    </div>
                </div>
            </div>
            <div className='buyInput'>
                <div>
                    <p>배송요청 / 결제 수단</p>
                </div>
                <div className='buyForm2'
                >
                    <label htmlFor="deliveryMessage">배송 메세지</label>
                    <div className="deliveryBox">
                        <select name="deliveryMessage" id="deliveryMessage"
                            value={selectBox.deliveryMessage}
                            onChange={onChangeSelectBox}>
                            <option value="문 앞에 놔주세요">문 앞에 놔주세요</option>
                            <option value="직접배달(부재시 문앞)">대면 배달(부재시 문앞)</option>
                            <option value="벨 누르지 말아주세요">벨 누르지 말아주세요</option>
                            <option value="도착후 전화주시면 나갈게요">도착후 전화주시면 나갈게요</option>
                            <option value="직접입력">직접 입력</option>
                        </select>
                        {directInput
                            && <input type="text"
                                className={userInfoError.deliveryMessage ? 'directInput errors' : 'directInput'}

                                onChange={(e) => SetSelectBox((box) => ({ ...box, deliveryMessage: e.target.value }))} />}

                    </div>
                    <label htmlFor="buyHow">결제 수단 선택</label>
                    <div className='buyRadioBox2'>
                        <input type="radio" name='buyHow' id='CreditCard'
                            value='신용 카드'
                            onChange={onChangeRadioBox} />
                        <label htmlFor="CreditCard">신용 카드</label>
                        <input type="radio" name='buyHow' id='KakaoPay'
                            value='카카오페이'
                            onChange={onChangeRadioBox} />
                        <label htmlFor="KakaoPay">카카오 페이</label>
                        <input type="radio" name='buyHow' id='NaverPay'
                            value='네이버 페이'
                            onChange={onChangeRadioBox} />
                        <label htmlFor="NaverPay">네이버 페이</label>
                        <input type="radio" name='buyHow' id='phonePayment'
                            value='휴대폰 결제'
                            onChange={onChangeRadioBox} />
                        <label htmlFor="phonePayment">휴대폰 결제</label>
                        <input type="radio" name='buyHow' id='accountTransfer'
                            value='계좌이체'
                            onChange={onChangeRadioBox} />
                        <label htmlFor="accountTransfer">계좌 이체</label>
                    </div>
                </div>
                <div className='buttonBox'>
                    <button disabled={isBuyButtonDisabled}
                        type="submit"
                    // onClick={onClickBuyButton}
                    >BUY NOW</button>
                </div>
            </div>
            <Modal
                ariaHideApp={false}
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="주소 검색"
                style={{
                    content: {
                        width: '500px',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)'
                    }
                }}
            >
                <button className='modalbtn' onClick={() => setIsModalOpen(false)}>X</button>
                <DaumPostcode onComplete={handleComplete} />
            </Modal>

            <Modal
                isOpen={isModalBuyOpen}
                ariaHideApp={false}
                onRequestClose={() => setIsModalBuyOpen(false)}
                contentLabel="구매 확인"
                style={{
                    content: {
                        height: '300px',
                        width: '500px',
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
                        onClick={() => navigate('/mypage/list')}>구매 내역 확인</button>

                    <button onClick={() => setIsModalBuyOpen(false)}>확인</button>
                </div>
                <div ref={modalContentRef} style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                    <BuyComplete username={userData.name}
                        amount={amount} options={options} checkedCartItems={checkedCartItems}
                        selectedProduct={selectedProduct}
                        productPrice={productPrice}
                        totalPrice={totalPrice} />
                </div>

            </Modal>
        </form>
    );
};

export default BuyInputBox;
