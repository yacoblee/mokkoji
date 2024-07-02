import { useEffect, useRef } from 'react';
import '../../css/Introduction/IntroductionPage2.css';
const IntroductionPage2 = () => {
  const targetR = useRef(null);

  useEffect(() => {
    const scrollEvent = () => {
      if (window.scrollY > window.innerHeight * 3.4) {
        targetR.current.style.opacity = 0;
      }
      else {
        if (targetR.current) {
          targetR.current.style.opacity = 1;
        };
      };
    }
    window.addEventListener('scroll', scrollEvent);
    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  },[])

  return (
    <div className="container2">
      <div className='container-text' ref={targetR}>
        <h1>디자인을 입은 문화유산,</h1>
        <h1>‘뮷즈’가 되다</h1>
      </div>
    </div>
  )
};

export default IntroductionPage2;