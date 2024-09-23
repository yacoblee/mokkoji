import { useRef, useEffect } from "react";

export default function Background() {
    const videoRef = useRef();

    useEffect(() => {
        const video = videoRef.current;

        const handleTimeUpdate = () => {
            if (video.currentTime >= 22) {
                video.currentTime = 0;
                video.play();
            }
        };

        if (video) {
            video.addEventListener('timeupdate', handleTimeUpdate);
        }

        return () => {
            if (video) {
                video.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, []);

    const chageSection = (event) => {
        event.preventDefault();
        const section2 = document.querySelector('#section2');
        if (section2) {
            const scrollPosition = section2.getBoundingClientRect().top + -(window.innerHeight - 1000);
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            <video muted autoPlay loop ref={videoRef} style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                objectFit: 'cover'
            }}>
                <source src='/images/main/mainMediea.mp4' type="video/mp4" />
            </video >

            <div className="video_intro">
                <div><span>Meet a variety of character products</span></div>
                <div><span>Traditional Korean character merchandise</span></div>
                <div><a href="#section2" onClick={chageSection}><span>Learn More</span></a></div>
            </div>
        </>
    );
}


