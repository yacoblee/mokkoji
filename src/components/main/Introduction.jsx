import React, { useEffect, useRef } from 'react';

const Introduction = () => {
    const imgRef = useRef(null);

    useEffect(() => {
        const img = imgRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                const { top, height } = entry.boundingClientRect;
                const speed = 0.5; // Adjust the speed as needed
                const offset = window.innerHeight - top;

                if (top <= window.innerHeight && top + height >= 0) {
                    img.style.transform = `translate3d(0, ${-offset * speed}px, 0)`;
                }
            },
            {
                threshold: [0, 1.0]
            }
        );

        observer.observe(img.closest('.section'));

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="intro_container">
            <div className="intro_img" ref={imgRef}>
                <img src="/images/main/메인-배너.jpg" alt="introduction" />
            </div>
            <div className="intro_content">
                <p>Your content goes here</p>
            </div>
        </div>
    );
};

export default Introduction;