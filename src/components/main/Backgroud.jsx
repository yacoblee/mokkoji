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
        </>
    );
}