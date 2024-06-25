

import { useParams , Link } from "react-router-dom";
import GoodsItems from "./ProductObject";
import ProductDetailsInfo from './ProductDetailsInfo';
import ProductForm from "./ProductForm";
import { useEffect, useState } from "react";
import '../../css/Product/ProductDetails.css'



const ProductDetails = ()=>{ //=========================================================ProductDetails 컴포넌트
    const { category, id } = useParams(); // 아이템을 찾기위한 url 소스 
    const selectedProduct = GoodsItems.find((item) => item.category === category && item.id === parseInt(id));
    const [like , setLike]=useState(false);

    const onClickLikeMe =()=>{
        setLike(!like);
    } 
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
        // if (inActive) return;

        // SetInActive(true);
        SetSlideImgBox(index);
        // setTimeout(() => {
        //     SetInActive(false);
        // }, 700);
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