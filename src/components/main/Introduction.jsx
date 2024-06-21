import React, { useEffect, useRef } from 'react';

const Introduction = () => {
    const imgRef = useRef(null);

    useEffect(() => {
        const img = imgRef.current;
        const section = img.closest('.section');

        const handleScroll = () => {
            const { top } = section.getBoundingClientRect();
            const visibleHeight = 540; // Visible height
            const totalHeight = 940; // Total image height
            const maxOffset = 120; // Maximum translation offset
            const speed = 0.25; // Adjusted speed to limit movement to 120px

            if (top <= window.innerHeight && top + visibleHeight >= 0) {
                const offset = Math.max(-maxOffset, Math.min(maxOffset, (window.innerHeight - top - (visibleHeight / 2)) * speed));
                img.style.transform = `translate3d(0, ${-offset}px, 0)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => {
            window.removeEventListener('scroll', handleScroll);
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