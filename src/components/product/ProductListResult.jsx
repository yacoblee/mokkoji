import { Link} from "react-router-dom";
import { useRef, useEffect } from 'react';


const ProductMainGuide = ({ text }) => {
    const guideRef = useRef(null);

    useEffect(() => {
        const guideElement = guideRef.current;
        const textWidth = guideElement.scrollWidth;
        const containerWidth = guideElement.offsetWidth;
        const animationDuration = containerWidth / 30; // 텍스트 길이에 따른 애니메이션 속도 조정
        const animationDelay = -textWidth / 50; // 애니메이션 딜레이 설정

        // 애니메이션을 초기화하고 다시 적용하여 강제로 재생
        guideElement.style.animation = 'none';
        // guideElement.offsetHeight; // 트리거 리플로우
        guideElement.style.animation = `scrollText ${animationDuration}s linear infinite`;
        guideElement.style.animationDelay = `${animationDelay}s`;
    }, [text]);

    return (
        <p
            className="productMainGuide"
            ref={guideRef}
            style={{
                animation: "scrollText linear infinite"
            }}>
            {text}
        </p>
    );
};


const ProductListResult = ({selectItem})=>{
    
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    }


    return(
    <>
        <div className="productItemList">
            {/* 선택된 카테고리의 상품들을 보여줌 */}
            {selectItem.map((product, i) => (
                <Link to={`/goods/${product.category}/${product.id}`} key={i}>
                    <div key={i} className="productItemResult">
                        <img src={product.slideSrc[0]} alt={product.name} />
                        <div>
                            <p>{product.name}</p>
                            <p className="productMainGuideContainer">
                            <ProductMainGuide text={product.mainGuide} /> </p>
                            <p>{formatNumber(product.price)}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>

    
    </>
    )
}

export default ProductListResult;