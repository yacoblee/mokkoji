import { useEffect, useRef, useState } from 'react'
import '../../css/Introduction/IntroductionPage3.css';


const IntroductionPage3 = ({ setGetLocation }) => {
  const showDiv = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entriese) => {
      entriese.forEach((e) => {
        if (e.isIntersecting) {
          setGetLocation(true);
        }
        else {
          setGetLocation(false);
        }

      })
    },
      {
        threshold: 0.4, // 40% 지점에서 트리거
      }


    )

    if (showDiv.current) {
      observer.observe(showDiv.current);
    }


    return () => {
      if (showDiv.current) {
        observer.unobserve(showDiv.current)
      }
      observer.disconnect();
    }
  }, [setGetLocation]);


  return (
    <div className="container3">
      <div className='container3-text' ref={showDiv}>
        <p>디자인 단계에서는 유물 본연의 느낌을 그대로 표현할 것인지 혹은 새롭게 그릴 것인지, 그도 아니면 유물 형태를 지우고 느낌만 가져올 것인지 등 고심 끝에 디자인 방향을 정하고서 그래픽 디자인을 합니다. 이러한 과정에서 문화유산의 정체성을 잃지 않도록 굿즈제작에 노력을 기울입니다. </p>
      </div>
    </div>
  )
};

export default IntroductionPage3;