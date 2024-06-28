import { useEffect, useState } from "react";
// import userInfo from './../login/UserInforData';
import Modal from 'react-modal';
import DaumPostcode from 'react-daum-postcode';

const BuyInputBox = ({userData}) => {

    const [addressing, setAddressing]= useState(true);
    const [userInfo , setUserInfo] = useState({})
    const onChangeaddressing = ()=>{
        setAddressing(!addressing)
    }
    useEffect(()=>{
        const copy = {
            name : userData && userData.name,
            phoneNumber : userData && userData.phoneNumber ,
            address :  userData && userData.address ,
            addressDetail : userData && userData.addressDetail,
            zoneCode :userData && userData.zoneCode,
        }
        if(addressing){
            setUserInfo(copy);
        }else{
            setUserInfo({
                name : '',
                phoneNumber : '',
                address : '',
                addressDetail : '',
                zoneCode :''
            });
        }
    },[addressing]);

    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleComplete = (data) => {
        console.log(data);
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

        setUserInfo((Info) => ({
            ...Info,
            zoneCode: data.zonecode,
            address: fullAddress
        }));
        setIsModalOpen(false);
    };

    const openAddress = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    }

    console.log(addressing);
    return (
        <>

            <div className='buyBox'>
                <div className='buyInput'>
                    <div>
                        <p>
                            배송지 정보
                        </p>
                    </div>
                    <form action=""
                        className='buyForm'>
                        <label htmlFor="buyID">배송지선택</label>
                        <div className='buyRadioBox'>
                            <input type="radio" name='delivery' id='basicsAddress'
                            checked={addressing} 
                            onChange={onChangeaddressing}/>
                            <label htmlFor="basicsAddress"> 기본 배송지</label>
                            <input type="radio" name='delivery' id='newAddress'
                            checked={!addressing}
                            onChange={onChangeaddressing}/>
                            <label htmlFor="newAddress"> 새로운 배송지</label>
                        </div>
                        <label htmlFor="buyID" >성함</label>
                        <input type="text" id='buyID' defaultValue={userInfo.name} />
                        <label htmlFor="buypN">연락처</label>
                        <input type="text" id='buyPN' defaultValue={userInfo.phoneNumber} />
                        <label htmlFor="buyAddress1">주소</label>
                        <div className='addressBox'>
                            <div>
                                <input type="text" id='buyAddress1'
                                placeholder='우편번호'
                                value={userInfo.zoneCode}
                                maxLength={5} readOnly />
                                <button
                                type="button"
                                onClick={openAddress}>우편 번호 검색</button>
                            </div>
                            <input type="text" id='buyAddress2' disabled defaultValue={userInfo.address} />
                            <input type="text" id='buyAddress3' defaultValue={userInfo.addressDetail}
                            placeholder='상세 주소 입력' />

                        </div>
                    </form>
                </div>
                <div className='buyInput'>
                    <div>
                        <p>
                            배송요청 / 결제 수단
                        </p>
                    </div>
                    <form action=""
                        className='buyForm2'>
                        <label htmlFor="deliveryMessage">배송 메세지</label>
                        <select name="deliveryMessage" id="deliveryMessage">
                            <option value="문앞">문 앞에 놔주세요</option>
                            <option value="직접부재허용">직접배달(부재시 문앞)</option>
                            <option value="벨금지">벨 누르지 말아주세요</option>
                            <option value="전화직접픽업">도착후 전화주시면 나갈게요</option>
                            <option value="직접입력">직접 입력</option>
                        </select>
                        {/* <input type="text" id='deliveryMessage' /> */}
                        <label htmlFor="buyHow">결제 수단 선택</label>

                        <div className='buyRadioBox2'>
                            <input type="radio" name='buyHow' id='CreditCard' />
                            <label htmlFor="CreditCard">신용 카드 </label>
                            <input type="radio" name='buyHow' id='PAYCO' />
                            <label htmlFor="PAYCO"> PAYCO</label>
                            <input type="radio" name='buyHow' id='KakaoPay' />
                            <label htmlFor="KakaoPay">카카오 페이 </label>
                            <input type="radio" name='buyHow' id='NaverPay' />
                            <label htmlFor="NaverPay"> 네이버 페이</label>
                            <input type="radio" name='buyHow' id='phonePayment' />
                            <label htmlFor="phonePayment">휴대폰 결제 </label>
                            <input type="radio" name='buyHow' id='accountTransfer' />
                            <label htmlFor="accountTransfer"> 계좌 이체</label>
                        </div>

                    </form>
                    <div className='buttonBox'>
                        <button>BUY NOW</button>
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
            </div>
        </>
    )
}
export default BuyInputBox;