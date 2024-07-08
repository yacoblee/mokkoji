import { useEffect, useRef, useState } from 'react';
import '../../css/Introduction/IntroductionPage.css';

const IntroductionPage = () => {


  const [showTitle, setShowTitle] = useState(false);
  const [showSub, setShowSub] = useState(false);

  useEffect(() => {
    // 타이틀 .3초 뒤에 등장
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 300);

    // 서브 .7초 뒤에 등장
    const subTimer = setTimeout(() => {
      setShowSub(true);
    }, 700);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subTimer);
    };
  }, []);

  const moveArea1 = useRef(null);
  const moveArea2 = useRef(null);
  const moveArea3 = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entriese) => {
      entriese.forEach((it) => {
        if (it.isIntersecting) {
          it.target.style.opacity = 1;
          if (it.target === moveArea2.current) {
            it.target.classList.add('frame-in-reverse');
          } else {
            it.target.classList.add('frame-in');
          }
        }
      })
    },
      {
        threshold: 0.4, // 60% 지점에서 트리거
      }
    )

    if (moveArea1.current) observer.observe(moveArea1.current);
    if (moveArea2.current) observer.observe(moveArea2.current);
    if (moveArea3.current) observer.observe(moveArea3.current);
  }, [])

  return (
    <div className="hy_container1">
      <div className={`intro-textBox ${showTitle ? 'show' : ''}`}>
        <div>
          <p>뮷즈 소개페이지</p>
        </div>
        <div className={`intro-textBox-innertext ${showSub ? 'show' : ''}`}>
          <p>박물관을 좀 더 특별하게 보기 위한 방법!</p>
          <p>뮷즈를 통해 재탄생한 전시작품을 찾아보세요!</p>
        </div>
      </div>

      <div className="intro-moveArea">
        <div className='moveArea1' ref={moveArea1}>
          <div className='move-img1'>
            <img src="/images/login/muds5.png" alt="소개 이미지1" />
          </div>
          <div className='text-bodyArea'>
            <p className='text-title'>상품을 통한 국립박물관 유산의 인식 확산</p>
            <p className='text-body'>국립박물관을 방문하지 않아도 온오프라인 채널과 미디어를 통해 뮷즈라는 브랜드와 국립박물관의 문화 유산의 의미를 더욱 손쉽게 알아볼 수 있습니다.</p>
          </div>
        </div>
        <div className='moveArea2' ref={moveArea2}>
          <div className='text-bodyArea'>
            <p className='text-title'>국립박물관의 문화유산 컨텐츠 발굴</p>
            <p className='text-body'>전통 문화에 거리감을 느끼는 Z세대를 위해 실생활에서 쉽게 접할 수 있는 컨텐츠를 바탕으로 전통문화를 보다 친숙하게 받아들이도록 하기 위해,
              역사적 요소를 현대적인 감각으로 재해석하여 새로운 소비문화와 박물관의 미래가치를 확산합니다.</p>
          </div>
          <div className='move-img2'>
            <img src="/images/login/muds6.png" alt="소개 이미지2" />
          </div>
        </div>
        <div className='moveArea3' ref={moveArea3} >
          <div className='move-img3'>
            <img src="/images/login/muds7.png" alt="소개 이미지3" />
          </div>
          <div className='text-bodyArea'>
            <p className='text-title'>문화유산을 통해 우리 일상에 가치를 더함</p>
            <p className='text-body'>독특한 박물관 굿즈를 소비하며 자신의 개성과 취향을 드러내고, 아름다운 유물을 소재로 하여,
              실용적으로 사용할 수 있는 상품으로 재탄생시켜 심미적 아름다움과 일상에 가치를 더합니다.</p>
          </div>
        </div>

      </div>
    </div >
  )
};

export default IntroductionPage;