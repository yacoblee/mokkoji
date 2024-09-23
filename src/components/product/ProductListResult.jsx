import { Link} from "react-router-dom";
import { useRef, useEffect } from 'react';


const ProductMainGuide = ({ text }) => {
    const guideRef = useRef(null);

    useEffect(() => {
        const guideElement = guideRef.current;
        const containerWidth = guideElement.offsetWidth; 
        const animationDuration = containerWidth / 30; // 텍스트 길이에 따른 애니메이션 속도 조정
        const animationDelay = -containerWidth / 50; // 애니메이션 딜레이 설정
        // console.log(animationDuration);
        // console.log(containerWidth);
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


const ProductListResult = ({selectItem , page , setPage})=>{
    
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    }

    //현재 보여질 페이지 아이템 수.
    const itemsPage = 8; 

    //총 아이템 수
    const totalItems = selectItem.length;

    //총 페이지는 총아이템수 나누기 현재 보여지 페이지 아이템수 올림계산
    const totalPages = Math.ceil(totalItems / itemsPage);
    
    //selectItem 에서 걸러낼 slice (0~8 /8~16... )
    const paginatedItems = selectItem.slice((page - 1) * itemsPage, page * itemsPage);
    
    //for문이 JSX에서 돌아가지 않아서 함수로 따로 뺌. page라는 배열에 button을 만들어 추가.
    const pageNation = ()=>{
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(<button value={i} className='centerButton' onClick={()=>onClickPage(i)}
            style={{ boxShadow: page === i && 'inset 0px -5px 0px rgba(166, 255, 0, 0.233)' ,
                color: page === i && 'red' ,
                fontSize : page ===i && '18px',
                fontWeight : page===i && '700'}}>{i}</button>)
        }
        //결과값을 page라는 배열을 반환.
        return pages;
    }
    
    //매개변수를 받아 그 값으로 currentPage 값을 바꿈.
    const onClickPage =(page)=>{
        setPage(page)
    }
    return(
    <>
        <div className="productItemList">
            {/* 선택된 카테고리의 상품들을 보여줌 */}
            {paginatedItems.map((product,i) => (
                <Link to={`/goods/${product.category}/${product.id}`} key={product.id}>
                    <div className="productItemResult"key={product.id}>
                        <img src={product.slideSrc[0]} alt={product.name} />
                        <div>
                            <p style={{fontSize : '16px' , fontWeight : '600' , wordBreak :'keep-all'}}>{product.name}</p>
                            <p className="productMainGuideContainer">
                            <ProductMainGuide text={product.mainGuide} /> </p>
                            <p style={{color: 'red' , fontWeight : '600'}}>{formatNumber(product.price)}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
        <div className="productPager">
            <button className='lastButton' onClick={()=>onClickPage(1)}
            style={{transform: 'rotateY(180deg)'}}>
            <img src="/images/buy/next.png" alt="1" />
            </button>
            {pageNation()}
            <button className='lastButton' onClick={()=>onClickPage(totalPages)}>
                <img src="/images/buy/next.png" alt="last" />
            </button>
        </div>
    
    </>
    )
}

export default ProductListResult;