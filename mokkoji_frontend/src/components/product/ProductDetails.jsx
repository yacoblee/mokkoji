

import { useParams, Link, useNavigate } from "react-router-dom";
import GoodsItems from "./ProductObject";
import ProductDetailsInfo from './ProductDetailsInfo';
import ProductForm from "./ProductForm";
import { useEffect, useState } from "react";
import '../../css/Product/ProductDetails.css'
import ModalNotLogin from "./ModalNotLogin";
import Modal from 'react-modal';
import TopButton from "../modules/ScrollToTopBtn";

const ProductDetails = () => { //=========================================================ProductDetails 컴포넌트
    const { category, id } = useParams(); // 아이템을 찾기위한 url 소스 
    const selectedProduct = GoodsItems.find((item) => item.category === category && item.id === parseInt(id));
    const [like, setLike] = useState(false);


    //세션 스토리지의 유저 데이터를 담는 변수.
    const userData = JSON.parse(sessionStorage.getItem('LoginUserInfo'));

    //모달창을 관리할 state
    //로그인 필요합니다
    const [isModalLoginOpen, setIsLoginModalOpen] = useState(false);

    //모달창에서 이동을 위함 navigate.
    const navigate = useNavigate();


    //찜 클릭 아이콘을 선택할때의 이벤트
    const onClickLikeMe = () => {

        
        // 세션 스토리지의 사용자 정보 업데이트
        if (userData) {
            setLike(!like);
            const updatedLikes =
                like
                    ? userData.mypage.isLike.filter(id => id !== selectedProduct.id) // 이미 찜한 상태라면 제거
                    : [...userData.mypage.isLike, selectedProduct.id]; // 찜하지 않은 상태라면 추가

            const updatedUser = {
                ...userData,
                mypage: {
                    ...userData.mypage,
                    isLike: updatedLikes
                }
            };

            // 업데이트된 사용자 정보를 세션 스토리지에 저장
            sessionStorage.setItem('LoginUserInfo', JSON.stringify(updatedUser));
        } else {

            setIsLoginModalOpen(true);
            return;

        }//user데이터가 없을경우 찜목록 사용 비활성화

    }
    // 컴포넌트가 마운트될 때 세션 스토리지에서 찜하기 상태 초기화
    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('LoginUserInfo'));
        if (userData && userData.mypage.isLike.includes(selectedProduct.id)) {
            setLike(true); // 찜 목록에 있으면 like 상태를 true로 설정
        }
    }, [selectedProduct.id]);

    //내부링크 위치 조정을 위한 스크롤 이벤트인데 내가 했다고 말못해...
    const handleScroll = (event, id) => {
        event.preventDefault();//a의 기본 특성 해제
        const element = document.getElementById(id); // 각 id 값을 매개 변수로 받아옴.
        if (element) {
            const offset = element.getBoundingClientRect().top + window.scrollY - 180;
            // 스크롤 위치를 id의 위치 에서 윈도우기준 180px 떨어져서 높이를 맞춤.
            window.scrollTo({ top: offset, behavior: 'smooth' });
            // 변수로 위치값 받아 위치 이동.
        } else {
            console.error(`Element with id ${id} not found.`);
        }
    }
    const [slideImgBox, SetSlideImgBox] = useState(0);


    const onClickLabelBox = (index) => {

        SetSlideImgBox(index);

    }
    // ======================================================================================return
    if (!selectedProduct) {
        return <div style={{ marginTop: '100px' }}>Product not found</div>;
    } else {

        return (
            <>
                <div className="notingBox">

                </div>
                <p className="productName hi" >
                    {selectedProduct.name}
                </p>
                <div className='box'>
                    <div className='imgBox'>
                        <div className="imgInner">
                            {selectedProduct.slideSrc.map((src, i) => <img src={src} key={i} alt={i}
                                style={{ transform: `translateX(-${slideImgBox * 100}%)` }} />)}

                        </div>
                        <div className='labelBox'>
                            {selectedProduct.slideSrc.map((src, i) => <img src={src} key={i} alt={i}
                                onClick={() => { onClickLabelBox(i) }} />)}
                        </div>
                    </div>
                    <div className='formBox'>
                        <div className='routeBox'>
                            <button type='button'
                                className='isLike_icon'
                                onClick={onClickLikeMe}>
                                <img src={!like ? "/images/buy/ht1.png" : "/images/buy/ht2.png"} alt="" />
                                LIKE ME !
                            </button>
                            <div>
                                <Link to="/" >home</Link>
                                <Link to="/goods" >goods</Link>
                                <Link to={`/goods/${selectedProduct.category}`} >goodsList</Link>
                            </div>
                        </div>
                        <div className='forminner'>
                            <div className="selectedInfo">
                                <p className="productName">
                                    {selectedProduct.name}
                                </p>
                                {selectedProduct.mainGuide}
                                <p className='deliveryifo'>
                                    * 30,000원 미만 3,000원 
                                    <p>
                                    * 30,000원 이상 무료배송
                                    </p>
                                </p>
                            </div>
                            <ProductForm selectedProduct={selectedProduct} />
                        </div>

                    </div>

                </div>
                <div className='underbox' >
                    <div className='tabBox'>
                        {/* <a href="#"><span>위로</span></a> */}
                        <a href="#details" onClick={(e) => handleScroll(e, 'details')}><span>상세보기</span></a>
                        <a href="#shipping" onClick={(e) => handleScroll(e, 'shipping')}><span>배송/사이즈</span></a>
                        <a href="#reviews" onClick={(e) => handleScroll(e, 'reviews')}><span>리뷰정보</span></a>
                        <a href="#recommendations" onClick={(e) => handleScroll(e, 'recommendations')}><span>추천리스트</span></a>
                    </div>
                    <div className='ProductDetailsInfo'>
                        <ProductDetailsInfo selectedProduct={selectedProduct} like={like} />
                    </div>
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
                <TopButton />
            </>
        );
    }
}

export default ProductDetails;