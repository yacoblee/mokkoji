import { useEffect, useRef, useState } from "react";
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from "react-router-dom";
import BuyComplete from "./BuyComplete";
import axios from "axios";
import { apiCall } from "../../service/apiService";
import { API_BASE_URL } from "../../service/app-config";


//selectProduct가 체크되지 않았다면 false가 반환됨.
const BuyInputBox = ({ userId, totalPrice, amount, checkedCartItems, selectedProduct, option, productPrice }) => {
    const navigate = useNavigate()
    //배송지 선택에 대한 true false 관리.
    const [addressing, setAddressing] = useState([]);
    const [originalAddressing, setOriginalAddressing] = useState([]); // 백업 상태 추가
    const [user, setUser] = useState({});
    const token = JSON.parse(sessionStorage.getItem('userData'));
    //모달창의 스크롤을 해결하기 위한 Ref
    const modalContentRef = useRef(null);
    //let selectedProductPrice = totalPrice;
    const loadingData = async () => {
        try {
            const response = await apiCall('/order/users', 'POST', { userId: userId }, token);
            const { userinfomation, addressList } = response.data;
            console.log(addressList)
            setAddressing(addressList);
            setUser(userinfomation);
            setOriginalAddressing(addressList);
        } catch (error) {
            console.log(`buy input error =>${error.message}`)
        }
    }
    //유저 관리에 대한 저장 변수.
    const [userInfo, setUserInfo] = useState({});
    //유저 관리 에러에 대한 저장 변수.
    const [userInfoError, setUserInfoError] = useState({});
    //주소 인덱스를 관리할 변수
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0); // 추가: 선택된 주소 인덱스를 추적
    // console.log(userInfo);
    // 처음 렌더링 시 userInfo를 설정.
    useEffect(() => {
        const loadDataAndSetUserInfo = async () => {
            await loadingData(); // 데이터 로드가 완료될 때까지 기다림

            // addressing이 업데이트된 후 userInfo를 설정
            if (addressing.length > 0) {
                setSelectedAddressIndex(0);
                setUserInfo({
                    orderName: user.name || '',
                    orderPhone: user.phoneNumber || '',
                    name: user.name || '',
                    phoneNumber: user.phoneNumber || '',
                    streetAddress: addressing[0].streetAddress || '',
                    detailedAddress: addressing[0].detailedAddress || '',
                    postalCode: addressing[0].postalCode || ''
                });
            } else {
                setSelectedAddressIndex(4);
            }
            setUserInfoError({
                name: false,
                phoneNumber: false,
                detailedAddress: false,
                postalCode: false,
                deliveryMessage: false,
            });
        };

        loadDataAndSetUserInfo(); // 함수 호출

    }, [addressing.length]);
    // console.log(`userInfo.name : ${userInfo.name}`)
    // console.log(`userInfo.phoneNumber : ${userInfo.phoneNumber}`)
    // console.log(`userInfo.detailedAddress : ${userInfo.detailedAddress}`)
    // console.log(`userInfo.postalCode : ${userInfo.postalCode}`)
    // console.log(`userInfo.postalCode : ${userInfo.postalCode}`)
    // console.log(`userInfoError.name : ${userInfoError.name}`)
    // console.log(`userInfoError.phoneNumber : ${userInfoError.phoneNumber}`)
    // console.log(`userInfoError.detailedAddress : ${userInfoError.detailedAddress}`)
    // console.log(`userInfoError.postalCode : ${userInfoError.postalCode}`)

    //배송지 선택에 따라 input값을 변환.
    const onChangeAddressing = (index, type) => {
        console.log(userInfo.orderName);
        console.log(userInfo.orderPhone);
        if (type === 'new') {
            setUserInfo((prevState) => ({
                ...prevState,
                name: '', // 받는 사람 이름 초기화
                phoneNumber: '', // 받는 사람 연락처 초기화
                streetAddress: '', // 주소 초기화
                detailedAddress: '', // 상세 주소 초기화
                postalCode: '', // 우편번호 초기화
            }));
            setUserInfoError({
                name: true,
                phoneNumber: true,
                detailedAddress: true,
                postalCode: true,
                // deliveryMessage: false,
            })
            setAddressing(originalAddressing);
        } else {
            setSelectedAddressIndex(index);

            setUserInfo((prevState) => ({
                ...prevState,
                name: user.name || '',
                phoneNumber: user.phoneNumber || '',
                streetAddress: addressing[index].streetAddress || '',
                detailedAddress: addressing[index].detailedAddress || '',
                postalCode: addressing[index].postalCode || ''
            }));
            setUserInfoError({
                name: false,
                phoneNumber: false,
                detailedAddress: false,
                postalCode: false,
            })
        }
    };
    //setAddressing(!addressing);
    // console.log(userInfoError);

    //수기로 작성했을때 onChange 이벤트를 통해 value값을 지정.
    const onChangeUserInfo = (e, selectedAddressIndex) => {
        const { name, value } = e.target;
        setUserInfo((info) => ({
            ...info,
            [name]: value,
        }));
        // console.log(`Name: ${name}, Value: ${value}, Length: ${value.length}`);
        console.log(userInfo.orderName);
        console.log(userInfo.orderPhone)
        if (name === 'name') {
            if (value.length < 2 || value.length > 5) {
                setUserInfoError((error) => ({ ...error, name: true }))
            } else {
                setUserInfoError((error) => ({ ...error, name: false }))
            }
        }

        if (name === 'phoneNumber') {
            const noneNumber = /^[0-9-]$/;
            const isValidPhoneNumber = !noneNumber.test(value);
            if (isValidPhoneNumber && value.length > 8 && (value.includes('-'))) {
                setUserInfoError((error) => ({ ...error, phoneNumber: false })); // 숫자면 들어와요

            } else {
                setUserInfoError((error) => ({ ...error, phoneNumber: true }));
            }
        }
        if (name === 'detailedAddress') {
            if (value.trim().length < 1) {
                setUserInfoError((error) => ({ ...error, [name]: true }));
            } else {
                setUserInfoError((error) => ({ ...error, [name]: false }));
                setAddressing((addr) =>
                    addr.map((it, i) =>
                        i === selectedAddressIndex ? { ...it, [name]: value } : it
                    )
                );
            }
        }

    };

    //모달 상태창에 대한 true , false
    const [isModalOpen, setIsModalOpen] = useState(false);

    //모달창에서 클릭하고 나면 , 값을 가지고 userInfo에 저장 -> value 값으로 전송. / 모달창 닫음.
    const handleComplete = (data, selectedAddressIndex) => {
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
            postalCode: data.zonecode,
            streetAddress: fullAddress
        }));
        setUserInfoError((error) => ({ ...error, postalCode: false }));
        setAddressing((addr) =>
            addr.map((it, i) =>
                i === selectedAddressIndex ? {
                    ...it, postalCode: data.zonecode,
                    streetAddress: fullAddress
                } : it
            )
        );
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
    console.log(`selectBox.deliveryMessage : ${selectBox.deliveryMessage}`)
    console.log(`selectBox.buyHow : ${selectBox.buyHow}`)

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

    //let selectedALLproduct = [];
    const [selectedALLproduct, setSelectedALLproduct] = useState([]);

    // 1. selectedALLproduct 상태를 업데이트하는 useEffect
    useEffect(() => {
        setSelectedALLproduct(() => {
            return selectedProduct ? [...checkedCartItems, selectedProduct] : [...checkedCartItems];
        });
        console.log("지금 여기 확인중")
        console.log(selectedALLproduct);
    }, [selectedProduct, checkedCartItems]);

    // 2. 버튼 활성화 여부를 관리하는 useEffect
    useEffect(() => {
        const checking = Object.values(userInfoError).every((it) => it === false);
        if (checking && selectBox.buyHow !== '' && selectedALLproduct.length > 0) {
            setIsBuyButtonDisabled(false); // BUY 버튼 활성화
        } else {
            setIsBuyButtonDisabled(true); // BUY 버튼 비활성화
        }
    }, [selectedALLproduct, userInfoError, selectBox.buyHow]);



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
        console.log(selectedAddressIndex);
        console.log(addressing);

        const updateAddressAndInsert = async () => {
            if (selectedAddressIndex === 4) {
                let newData = {
                    detailedAddress: userInfo.detailedAddress,
                    isDefault: addressing.length >= 3 ? addressing.length - 1 : addressing.length,
                    postalCode: userInfo.postalCode,
                    recipientName: `배송지_${addressing.length >= 3 ? addressing.length - 1 : addressing.length}`,
                    recipientPhone: userInfo.orderPhone,
                    streetAddress: userInfo.streetAddress,
                    userId: userId
                };

                // 상태 업데이트가 완료될 때까지 기다립니다.
                const updatedAddressing = await new Promise((resolve) => {
                    setAddressing((oldData) => {
                        const updatedAddress = addressing.length >= 3
                            ? [...oldData.slice(1), newData]
                            : [...oldData, newData];
                        resolve(updatedAddress); // 업데이트 완료 후 Promise 해제
                        return updatedAddress;
                    });
                });

                // 이제 최신의 `updatedAddressing`을 사용하여 다음 작업을 진행합니다.
                insertBuy(updatedAddressing);
            } else {
                // 선택된 인덱스가 4가 아닐 때는 바로 insertBuy를 호출합니다.
                insertBuy(addressing);
            }
        };

        const insertBuy = async (currentAddressing) => {
            let url = "/order/buy";
            try {
                let requestData = {
                    addressList: currentAddressing,
                    cartList: selectedALLproduct
                };
                console.log(currentAddressing);

                const response = await apiCall(url, 'POST', requestData, token);
                console.log("성공했니");
            } catch (error) {
                console.error("구매 실패:", error);
            }
        };

        // 비동기 함수 호출
        updateAddressAndInsert();



        if (modalContentRef.current) {
            modalContentRef.current.scrollTop = 0; // 모달이 열릴 때 스크롤을 맨 위로 설정
        }

    }

    //const [selectedAddressIndex, setSelectedAddressIndex] = useState(0); // 선택된 라디오 버튼의 인덱스를 추적

    function addressMaker() {
        const box = [];
        addressing.map((item, index) => {
            box.push(
                <>
                    <input
                        type="radio"
                        name='delivery'
                        key={item.recipientName}
                        id={'addr_' + index}
                        checked={selectedAddressIndex === index} // 현재 선택된 인덱스를 확인
                        onChange={() => { onChangeAddressing(index); setSelectedAddressIndex(index); }}
                    />
                    <label htmlFor={index}>{item.recipientName}</label>
                </>
            )
        })
        return box;
    }

    return (
        <form className='buyBox' onSubmit={onClickBuyButton}>
            <div className='buyInput'>
                <div>
                    <p>배송지 정보</p>
                </div>

                <div className='buyForm'>
                    <label htmlFor="buyID">배송지선택</label>
                    <div className='buyRadioBox'>
                        {addressMaker()}
                        <input
                            type="radio"
                            name='delivery'
                            id='newAddress'
                            checked={selectedAddressIndex === 4}
                            onChange={() => { onChangeAddressing(null, 'new'); setSelectedAddressIndex(4); }}
                        />
                        <label htmlFor="newAddress">새로운 배송지</label>
                    </div>
                    <label htmlFor="name">주문자</label>
                    <input
                        type="text"
                        id='orderName'
                        name="orderName"
                        //minLength={2}
                        //maxLength={5}
                        value={userInfo.orderName}
                        //onChange={onChangeUserInfo}
                        readOnly
                    />
                    <label htmlFor="name">주문자 연락처</label>
                    <input
                        type="text"
                        id='orderPhone'
                        name="orderPhone"
                        //minLength={2}
                        //maxLength={5}
                        value={userInfo.orderPhone}
                        //onChange={onChangeUserInfo}
                        readOnly

                    />
                    <label htmlFor="name">받는 사람</label>
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

                    />
                    <label htmlFor="phoneNumber">받는 사람 연락처</label>
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
                                name="postalCode"
                                placeholder='우편번호'
                                value={userInfo.postalCode}
                                maxLength={5}
                                readOnly
                                required
                                //onChange={onChangeUserInfo}
                                onChange={(e, selectedAddressIndex) => (onChangeUserInfo(e, selectedAddressIndex))}
                                className={userInfoError.postalCode ? 'errors' : ''}

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
                            id='streetAddress'
                            value={userInfo.streetAddress}
                            className={userInfoError.postalCode ? 'errors' : ''}
                            readOnly
                            required

                        />
                        <input
                            type="text"
                            id='detailedAddress'
                            name="detailedAddress"
                            value={userInfo.detailedAddress}
                            onChange={(e) => onChangeUserInfo(e, selectedAddressIndex)}
                            required
                            placeholder='상세 주소 입력'
                            className={userInfoError.detailedAddress ? 'errors' : ''}

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

                            <>
                                <option value="직접입력">직접 입력</option>
                                <option value="문 앞에 놔주세요">문 앞에 놔주세요</option>
                                <option value="직접배달(부재시 문앞)">대면 배달(부재시 문앞)</option>
                                <option value="벨 누르지 말아주세요">벨 누르지 말아주세요</option>
                                <option value="도착후 전화주시면 나갈게요">도착후 전화주시면 나갈게요</option>
                            </>

                        </select>
                        {directInput &&
                            <>                            <input type="text"
                                className={userInfoError.deliveryMessage ? 'directInput errors' : 'directInput'}

                                onChange={(e) => SetSelectBox((box) => ({ ...box, deliveryMessage: e.target.value }))} />
                                <button></button>
                            </>
                        }

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
                <DaumPostcode onComplete={(e) => handleComplete(e, selectedAddressIndex)} />
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
                        onClick={() => navigate('/mypage/orders')}>구매 내역 확인</button>

                    <button onClick={() => setIsModalBuyOpen(false)}>확인</button>
                </div>
                <div ref={modalContentRef} style={{ height: '100%', width: '100%', overflow: 'auto' }}>
                    <BuyComplete userId={userId}
                        amount={amount}
                        //options={option} 
                        checkedCartItems={checkedCartItems}
                        selectedProduct={selectedProduct}
                        productPrice={productPrice}
                        totalPrice={totalPrice} />
                </div>

            </Modal>
        </form>
    );
};

export default BuyInputBox;
