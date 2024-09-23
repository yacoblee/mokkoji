import '../../css/main.css';
import { useEffect, useRef } from 'react';
import About from './About';

const SliderSection = () => {
    const aboutRef = useRef(null);

    useEffect(() => {
        const sections = document.querySelectorAll('#section2');
        const options = {
            threshold: 0.5,
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
                    setTimeout(() => {
                        about?.classList.add('about_visible');
                    }, 600);

                } else {
                    setTimeout(() => {
                        leftImage?.classList.remove('left_motion');
                        rightImage?.classList.remove('right_motion');
                        startImage?.classList.remove('start_motion');
                        endImage?.classList.remove('end_motion');
                        about?.classList.remove('about_visible');
                    }, 600);


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
        <>
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
        </>
    );
};

export default SliderSection;
