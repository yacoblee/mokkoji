

import { useParams , Link , NavLink, Routes , Route} from "react-router-dom";
import GoodsItems from "./ProductObject";
import ProductDetailsInfo from './ProductDetailsInfo';
import ProductForm from "./ProductForm";
import { useState } from "react";



const ProductDetails = ()=>{ //=========================================================ProductDetails 컴포넌트
    const { category, id } = useParams(); // 아이템을 찾기위한 url 소스 
    const selectedProduct = GoodsItems.find((item) => item.category === category && item.id === parseInt(id));
    const [like , setLike]=useState(false);

    const onClickLikeMe =()=>{
        setLike(!like);
    } 
    // ======================================================================================return
    if (!selectedProduct) {
        return <div style={{marginTop:'100px'}}>Product not found</div>;
    }else{

        return(
            <>
            <div style={{marginTop:'100px'}} className='box'>
                <div className='imgBox'>
                    {selectedProduct.slideSrc.map((src, i)=><img src={src} key={i} alt={i}/>)}
                    <div className='labelBox'>
                        {selectedProduct.slideSrc.map((src ,i)=><img src={src} key={i} alt={i} />)}
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
                <div className='underbox'>
                    <div className='tabBox'>
                        <NavLink to="."><span>상세보기</span></NavLink>
                        <NavLink to="shipping" ><span>배송/사이즈</span></NavLink>
                        <NavLink to="reviews"><span>리뷰정보</span></NavLink>
                        <NavLink to="recommendations" ><span>추천리스트</span></NavLink>
                    </div>
                    <div className='ProductDetailsInfo'>
                    <ProductDetailsInfo selectedProduct={selectedProduct}/>
                    </div>
                </div>
            </>
        );
    }
}

export default ProductDetails;