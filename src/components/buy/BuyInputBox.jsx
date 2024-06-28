import { useEffect, useState } from "react";
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from "react-router-dom";
import BuyComplete from "./BuyComplete";


//selectProduct가 체크되지 않았다면 null 또는 undefind 반환
const BuyInputBox = ({ userData ,totalPrice ,buyPrice ,checkedCartItems ,selectedProduct , options, productPrice}) => {
    const navigate=useNavigate()
    //배송지 선택에 대한 true false 관리.
    const [addressing, setAddressing] = useState(true);


    //유저 관리에 대한 저장 변수.
    const [userInfo, setUserInfo] = useState({});

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
        } else {
            setUserInfo({
                name: userData.name || '',
                phoneNumber: userData.phoneNumber || '',
                address: userData.address || '',
                addressDetail: userData.addressDetail || '',
                zoneCode: userData.zoneCode || ''
            });
        }
        setAddressing(!addressing);
    };

    //수기로 작성했을때 onChange 이벤트를 통해 value값을 지정.
    const onChangeUserInfo = (e) => {
        const { name, value } = e.target;
        setUserInfo((info) => ({
            ...info,
            [name]: value,
        }));
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
        setIsModalOpen(false);
    };

    //모달창 오픈
    const openAddress = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    
    //select 값을 저장할 state.
    const [selectBox ,SetSelectBox]= useState({
        deliveryMessage: '문 앞에 놔주세요',
        buyHow:'',
    });

    const onChangeSelectBox = (e)=>{
        SetSelectBox((box)=>({...box,deliveryMessage:e.target.value}));
    }

    const onChangeRadioBox = (e)=>{
        SetSelectBox((box)=>({...box,buyHow:e.target.value}));
    }
    //버튼 상태를 관리할 state.
    const [isBuyButtonDisabled, setIsBuyButtonDisabled] = useState(true);

    //checking 은 userInfo 의 빈문자열인 값들을 저장. 즉 저장된게 없어야 진행.
    useEffect(()=>{
        const checking = Object.values(userInfo).filter((it)=>it ==='');
        if(checking.length ===0 && selectBox.buyHow !==''){
            setIsBuyButtonDisabled(false);
        }else{
            setIsBuyButtonDisabled(true);
        }
    },[userInfo,selectBox]);
    //구매 확인 버튼의 모달창.
    const [isModalBuyOpen, setIsModalBuyOpen] = useState(false);


    //구매버튼 이벤트
    const onClickBuyButton = ()=>{
        setIsModalBuyOpen(true);
        // 깊은 복사를 통해 userData 복사
        const copyUserData = JSON.parse(JSON.stringify(userData)); 
        const currentDate = new Date(); 
        const nowDay = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`
        const history = {date : nowDay , item : [selectedProduct.id]};
        checkedCartItems.map((item)=>{
            history.item.push(item.productId);
        });
        copyUserData.mypage.history.unshift(history);
        console.log(copyUserData.mypage.history);
        sessionStorage.setItem('LoginUserInfo',JSON.stringify(copyUserData));
    }

    return (
        <div className='buyBox'>
            <div className='buyInput'>
                <div>
                    <p>배송지 정보</p>
                </div>
                <form className='buyForm'>
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
                        value={userInfo.name}
                        onChange={onChangeUserInfo}
                    />
                    <label htmlFor="phoneNumber">연락처</label>
                    <input
                        type="text"
                        id='phoneNumber'
                        name="phoneNumber"
                        value={userInfo.phoneNumber}
                        onChange={onChangeUserInfo}
                    />
                    <label htmlFor="addressDetail">주소</label>
                    <div className='addressBox'>
                        <div>
                            <input
                                type="text"
                                id='buyAddress1'
                                placeholder='우편번호'
                                value={userInfo.zoneCode}
                                maxLength={5}
                                readOnly
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
                            readOnly
                        />
                        <input
                            type="text"
                            id='addressDetail'
                            name="addressDetail"
                            value={userInfo.addressDetail}
                            onChange={onChangeUserInfo}
                            placeholder='상세 주소 입력'
                        />
                    </div>
                </form>
            </div>
            <div className='buyInput'>
                <div>
                    <p>배송요청 / 결제 수단</p>
                </div>
                <form className='buyForm2'>
                    <label htmlFor="deliveryMessage">배송 메세지</label>
                    <select name="deliveryMessage" id="deliveryMessage"
                    value={selectBox.deliveryMessage}
                    onChange={onChangeSelectBox}>
                        <option value="문 앞에 놔주세요">문 앞에 놔주세요</option>
                        <option value="직접배달(부재시 문앞)">직접배달(부재시 문앞)</option>
                        <option value="벨 누르지 말아주세요">벨 누르지 말아주세요</option>
                        <option value="도착후 전화주시면 나갈게요">도착후 전화주시면 나갈게요</option>
                        <option value="직접입력">직접 입력</option>
                    </select>
                    <label htmlFor="buyHow">결제 수단 선택</label>
                    <div className='buyRadioBox2'>
                        <input type="radio" name='buyHow' id='CreditCard'
                        value='신용 카드'
                        onChange={onChangeRadioBox} />
                        <label htmlFor="CreditCard">신용 카드</label>
                        <input type="radio" name='buyHow' id='KakaoPay'
                        value='카카오페이'
                        onChange={onChangeRadioBox}/>
                        <label htmlFor="KakaoPay">카카오 페이</label>
                        <input type="radio" name='buyHow' id='NaverPay'
                        value='네이버 페이'
                        onChange={onChangeRadioBox} />
                        <label htmlFor="NaverPay">네이버 페이</label>
                        <input type="radio" name='buyHow' id='phonePayment' 
                        value='휴대폰 결제'
                        onChange={onChangeRadioBox}/>
                        <label htmlFor="phonePayment">휴대폰 결제</label>
                        <input type="radio" name='buyHow' id='accountTransfer' 
                        value='계좌이체'
                        onChange={onChangeRadioBox}/>
                        <label htmlFor="accountTransfer">계좌 이체</label>
                    </div>
                </form>
                <div className='buttonBox'>
                    <button disabled={isBuyButtonDisabled}
                    onClick={onClickBuyButton}>BUY NOW</button>
                </div>
            </div>
            <Modal
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
                <BuyComplete username={userData.name}
                buyPrice={buyPrice} options={options} checkedCartItems={checkedCartItems} 
                selectedProduct={selectedProduct}
                productPrice={productPrice}
                totalPrice={totalPrice}/>
                
            </Modal>
        </div>
    );
};

export default BuyInputBox;
