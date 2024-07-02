import '../../css/main.css';
import { useEffect, useRef } from 'react';
import About from './About';

const ProductSection = () => {
    const aboutRef = useRef(null);

    const throttle = (func, delay) => {
        let timer;

        return () => {
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null;
                    func();
                }, delay);
            }
        };
    };

    useEffect(() => {
        const sections = document.querySelectorAll('#section2');
        const options = {
            threshold: 0.8,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const leftImage = entry.target.querySelector('.left_door');
                const rightImage = entry.target.querySelector('.right_door');
                const startImage = entry.target.querySelector('.start_door');
                const endImage = entry.target.querySelector('.end_door');
                const about = entry.target.querySelector('.section2_about');

                if (entry.isIntersecting) {
                    leftImage?.classList.add('left_motion');
                    rightImage?.classList.add('right_motion');
                    startImage?.classList.add('start_motion');
                    endImage?.classList.add('end_motion');
                    about.style.zIndex = '0';  // 슬라이드가 시작할 때 zIndex를 0으로 설정

                    throttle(() => {
                        about.style.zIndex = '1';
                    }, 800)();
                } else {
                    leftImage?.classList.remove('left_motion');
                    rightImage?.classList.remove('right_motion');
                    startImage?.classList.remove('start_motion');
                    endImage?.classList.remove('end_motion');
                    about.style.zIndex = '0';
                }
            });
        }, options);

        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);

    return (
        <div id="section2">
            <div className='section2_inner'>
                <img src="/images/main/traditional01.png" className='first_door' alt="" />
                <img src="/images/main/traditional01.png" className='left_door' alt="" />
                <img src="/images/main/traditional01.png" className='start_door' alt="" />
                <img src="/images/main/traditional01.png" className='end_door' alt="" />
                <img src="/images/main/traditional02.png" className='right_door' alt="" />
                <img src="/images/main/traditional02.png" className='final_door' alt="" />
            </div>
            <div className='section2_about' ref={aboutRef}>
                <About />
            </div>
            {/* <SlideSection title='베스트 상품' sort='count' /> */}
        </div>
    );
};

export default ProductSection;
