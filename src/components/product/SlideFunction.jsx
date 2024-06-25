
    //1. 슬라이드 함수 ====================================================
    
    //슬라이드 구현을 위한 state
    const [currentSlide ,setCurrentSlide] =useState(0);


    let visibleSlide = 4;//현재 보여지는 슬라이드 갯수
    
    //슬라이드 구현 횟수 = 전체 슬라이드 갯수 - 현재 보여지는 슬라이드 갯수
    const maxSlide = sortItems.length - visibleSlide; 
    
    //버튼을 누르면 state값 증가와 감소
    const onclickMainList = (type)=>{
        if(type ==='+'){
            if(currentSlide === maxSlide) return;
            setCurrentSlide(currentSlide+1);
        }else{
            setCurrentSlide(currentSlide-1);
        }
    }

    //버튼 호버시 true 아웃시 fasle  의 state
    const [hover, setHover] = useState(false);

    //버튼 호버시 true 설정
    const onMouseEnterHover = ()=>{
        setHover(true);
    }

    const onMouseOverHover = ()=>{
        setHover(false);
    }


    //import 용이 아니라 가져다 쓰세요.

    //슬라이드 할 스타일은 style={{ transform: `translateX(-${currentSlide * 23.7}vw)` }} 이런식
    //슬라이드 영역은 직접 계산하든... 방법을 모색하세요


    //슬라이드 버튼 전버튼은 
    {
        currentSlide>0 && <button style={{left :5 ,transform: 'rotateY(180deg)'}}
        type='button'
        onClick={()=>{onclickMainList('-')}}
        onMouseEnter={onMouseEnterHover}
        onMouseOut={onMouseOverHover}>
            <img src={hover ? "/images/buy/arrow-right-2.png" : "/images/buy/arrow-right-3.png" }
            alt="left" />
        </button> 
    }

    //슬라이드 버튼 후버튼은 
    {
        currentSlide < maxSlide && <button style={{right :5}}
        type='button'
        onClick={()=>{onclickMainList('+')}}
        onMouseEnter={onMouseEnterHover}
        onMouseOut={onMouseOverHover}>
            <img src={hover ? "/images/buy/arrow-right-2.png" : "/images/buy/arrow-right-3.png" }
            alt="right" />
        </button> 
    }


    // 2. 숫자를 금액으로 변경해주는 함수 ========================================
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    }



    //3. 페이지 네이션 ==========================================================

    //버튼 클릭에 따라 전달될 매개변수 값.
    const [currentPage, setCurrentPage] = useState(1); 

    //현재 보여질 페이지 아이템 수.
    const itemsPage = 8; 

    //총 아이템 수
    const totalItems = selectItem.length;

    //총 페이지는 총아이템수 나누기 현재 보여지 페이지 아이템수 올림계산
    const totalPages = Math.ceil(totalItems / itemsPage);
    
    //selectItem 에서 걸러낼 slice (0~8 /8~16... )
    const paginatedItems = selectItem.slice((currentPage - 1) * itemsPage, currentPage * itemsPage);
    
    //for문이 JSX에서 돌아가지 않아서 함수로 따로 뺌. page라는 배열에 button을 만들어 추가.
    const pageNation = ()=>{
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(<button value={i} className='centerButton' onClick={()=>onClickPage(i)}
            style={{ boxShadow: currentPage === i && 'inset 0px -5px 0px rgba(166, 255, 0, 0.233)' ,
                color: currentPage === i && 'red' ,
                fontSize : currentPage ===i && '18px',
                fontWeight : currentPage===i && '700'}}>{i}</button>)
        }
        //결과값을 page라는 배열을 반환.
        return pages;
    }
    
    //매개변수를 받아 그 값으로 currentPage 값을 바꿈.
    const onClickPage =(page)=>{
        setCurrentPage(page)
    }

    //4. 글씨 애니메이션 속도 조절 (글의 길이가 다르기 때문에 속도에서 차이남.)===========


    //-> 리턴값 <ProductMainGuide text={product.mainGuide} /> </p>
    //text 라는 프롭스의 형태로 글을 전달.

    const ProductMainGuide = ({ text }) => {
        const guideRef = useRef(null); //요소 지정을 위한 Ref 사용
    
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
    

    //5. 추천상품을 원하는 갯수만큼 slice 하기==========================================
    const recommendItemid = selectedProduct.id;
    const recommendItem = GoodsItems.filter(it => it.id !== recommendItemid)
        .sort((a, b) => b.reviews.length - a.reviews.length)
        .slice(0, 4);

    