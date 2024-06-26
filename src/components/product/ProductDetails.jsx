

import { useParams , Link } from "react-router-dom";
import GoodsItems from "./ProductObject";
import ProductDetailsInfo from './ProductDetailsInfo';
import ProductForm from "./ProductForm";
import { useEffect, useState } from "react";
import '../../css/Product/ProductDetails.css'
import userInfo from './../login/UserInforData';


const ProductDetails = ()=>{ //=========================================================ProductDetails 컴포넌트
    const { category, id } = useParams(); // 아이템을 찾기위한 url 소스 
    const selectedProduct = GoodsItems.find((item) => item.category === category && item.id === parseInt(id));
    const [like , setLike]=useState(false);



    const onClickLikeMe =()=>{
        setLike(!like);
            // 세션 스토리지의 사용자 정보 업데이트
            const userData = JSON.parse(sessionStorage.getItem('LoginUserInfo'));
            if (userData) {
                const updatedLikes = like
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
            }
        
    } 
    // 컴포넌트가 마운트될 때 세션 스토리지에서 찜하기 상태 초기화
    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('LoginUserInfo'));
        if (userData && userData.mypage.isLike.includes(selectedProduct.id)) {
            setLike(true); // 찜 목록에 있으면 like 상태를 true로 설정
        }
    }, [selectedProduct.id]);

    
    const handleScroll = (event, id) => {
        event.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = element.getBoundingClientRect().top + window.scrollY -150;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        } else {
            console.error(`Element with id ${id} not found.`);
        }
    }
    const [slideImgBox, SetSlideImgBox] = useState(0);
    // const [inActive, SetInActive] = useState(false);
    const onClickLabelBox = (index)=>{

        SetSlideImgBox(index);

    }
    // ======================================================================================return
    if (!selectedProduct) {
        return <div style={{marginTop:'100px'}}>Product not found</div>;
    }else{
    
        return(
            <>
            <div style={{marginTop:'200px'}} className='box'>
                <div className='imgBox'>
                    {selectedProduct.slideSrc.map((src, i)=><img src={src} key={i} alt={i}
                    style={{ transform: `translateX(-${slideImgBox * 100}%)` }}/>)}
                    <div className='labelBox'>
                        {selectedProduct.slideSrc.map((src ,i)=><img src={src} key={i} alt={i} 
                        onClick={()=>{onClickLabelBox(i)}}/>)}
                    </div>
                </div>
                <div className='formBox'>
                    <div className='routeBox'>
                    <button type='button'
                    className='isLike_icon'
                    onClick={onClickLikeMe}>
                        <img src={!like ? "/images/buy/ht1.png" : "/images/buy/ht2.png"} alt=""/>
                    LIKE ME !
                    </button>
                    <div>
                    <Link to="/" >home</Link>
                    <Link to="/goods" >goods</Link> 
                    <Link to={`/goods/${selectedProduct.category}`} >goodsList</Link> 
                    </div>
                    </div>
                    <div className='forminner'>
                        <p>
                            <p className="productName">
                                {selectedProduct.name}
                            </p>
                        {selectedProduct.mainGuide}
                            <p className='deliveryifo'>
                                * 30,000원 미만 3,000원 / 30,000원 이상 무료배송
                            </p>
                        </p>
                        <ProductForm selectedProduct={selectedProduct}/>
                    </div>
    
                </div>
    
            </div>
                <div className='underbox' >
                    <div className='tabBox'>
                        <a href="#"><span>위로</span></a>
                        <a href="#details" onClick={(e) => handleScroll(e, 'details')}><span>상세보기</span></a>
                        <a href="#shipping" onClick={(e) => handleScroll(e, 'shipping')}><span>배송/사이즈</span></a>
                        <a href="#reviews" onClick={(e) => handleScroll(e, 'reviews')}><span>리뷰정보</span></a>
                        <a href="#recommendations" onClick={(e) => handleScroll(e, 'recommendations')}><span>추천리스트</span></a>
                    </div>
                    <div className='ProductDetailsInfo'>
                    <ProductDetailsInfo selectedProduct={selectedProduct} like={like}/>
                    </div>
                </div>
            </>
        );
    }
}

export default ProductDetails;