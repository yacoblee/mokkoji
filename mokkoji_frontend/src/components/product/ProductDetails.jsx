

import { useParams, Link, useNavigate } from "react-router-dom";
//import GoodsItems from "./ProductObject";
import ProductDetailsInfo from './ProductDetailsInfo';
import ProductForm from "./ProductForm";
import { useEffect, useState } from "react";
import '../../css/Product/ProductDetails.css'
import ModalNotLogin from "./ModalNotLogin";
import Modal from 'react-modal';
import TopButton from "../modules/ScrollToTopBtn";
import { API_BASE_URL } from "../../service/app-config";
import axios from "axios";
import { apiCall } from "../../service/apiService";

const ProductDetails = () => { //=========================================================ProductDetails 컴포넌트
    const { category, id } = useParams(); // 아이템을 찾기위한 url 소스 
    //const selectedProduct = GoodsItems.find((item) => item.category === category && item.id === parseInt(id));
    //좋아요 상태 표현의 state변수
    const [like, setLike] = useState(false);
    //상품의 정보
    const [product, setProduct] = useState({});

    const [slideimages, setSlideImages] = useState([]);
    //세션 스토리지의 유저 데이터를 담는 변수.
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem('userData'));
        let uri = `${API_BASE_URL}/goods/${category}/${id}`;

        // 상품 정보 및 좋아요 상태 가져오기
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(uri, { params: { type: 'slide' } });
                const { product, image } = response.data;
                setSlideImages(image);

                if (product) {
                    setProduct(product);
                    sessionStorage.setItem('product', JSON.stringify(product));  // 세션 스토리지에 저장
                }

                // 좋아요 상태 가져오기
                const productData = sessionStorage.getItem('product');
                const likeResponse = await apiCall('/goods/likedState', 'POST', productData, token);
                const { liked, userId } = likeResponse.data;
                setLike(liked);
                setUserId(userId);
            } catch (error) {
                console.log(error);
                setProduct(null);
                setSlideImages([]);
                setLike(false); // 실패 시 좋아요 초기화
            }
        };

        fetchProductDetails();
    }, [id, category, userId]);



    //모달창을 관리할 state
    //로그인 필요합니다
    const [isModalLoginOpen, setIsLoginModalOpen] = useState(false);

    //모달창에서 이동을 위함 navigate.
    const navigate = useNavigate();


    //찜 클릭 아이콘을 선택할때의 이벤트
    const onClickLikeMe = async () => {

        const token = JSON.parse(sessionStorage.getItem('userData'));
        const insertLike = async () => {
            try {
                const response = await apiCall('/goods/liked', 'POST', { userId: userId, productId: product.id }, token);
                const { liked } = response.data;
                setLike(liked);
                alert(`insert 성공`);
            } catch (error) {
                setLike(false);
                console.log(`insert Like error =>${error.message}`)
                alert(`insert 실패`);
            }
        };

        const deleteLike = async () => {
            try {
                const response = await apiCall('/goods/liked', 'DELETE', { userId: userId, productId: product.id }, token);
                //const response = await apiCall('/goods/liked', 'DELETE', { userId: userId, productId: product.id }, token);
                //const response = await apiCall(`/goods/liked?userId=${userId}&productId=${product.id}`, 'DELETE', null, token);
                const { liked } = response.data;
                setLike(liked);
                alert(`delte 성공`);
            } catch (error) {
                setLike(false);
                console.log(`delete Like error =>${error.message}`)
                alert(`delete 살패`);
            }
        }


        // 로그인 유무 확인 -> 상태에 따라 insert / delete
        if (userId) {
            if (!like) {
                await insertLike(); // 찜하지 않은 상태라면 추가
            } else {
                await deleteLike(); // 이미 찜한 상태라면 제거
            }

        } else {

            setIsLoginModalOpen(true);
            return;

        }//user데이터가 없을경우 찜목록 사용 비활성화

    }

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
    // product 또는 slideimages가 null인 경우 로딩 상태를 처리
    if (product === null || Object.keys(product).length === 0 || slideimages.length === 0) {
        return <div style={{ marginTop: '100px' }}>Loading...</div>;  // 로딩 중인 경우 처리
    } else {

        return (
            <>
                <div className="notingBox">

                </div>
                <p className="productName hi" >
                    {product.name}
                </p>
                <div className='box'>
                    <div className='imgBox'>
                        <div className="imgInner">
                            {slideimages.map((src, i) => <img src={`${API_BASE_URL}/resources/productImages/${src.name}`} key={i} alt={i}
                                style={{ transform: `translateX(-${slideImgBox * 100}%)` }} />)}

                        </div>
                        <div className='labelBox'>
                            {slideimages.map((src, i) => <img src={`${API_BASE_URL}/resources/productImages/${src.name}`} key={i} alt={i}
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
                                <Link to={`/goods/${product.categoryId}`} >goodsList</Link>
                            </div>
                        </div>
                        <div className='forminner'>
                            <div className="selectedInfo">
                                <p className="productName">
                                    {product.name}
                                </p>
                                {product.guide}
                                <p className='deliveryifo'>
                                    * 30,000원 미만 3,000원
                                    <div>
                                        * 30,000원 이상 무료배송
                                    </div>
                                </p>
                            </div>
                            <ProductForm product={product} userId={userId} />
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
                        <ProductDetailsInfo product={product} like={like} />
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