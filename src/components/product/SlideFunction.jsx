
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