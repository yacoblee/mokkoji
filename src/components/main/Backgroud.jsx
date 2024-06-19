import { useRef } from "react";

export default function Background() {
    const videoRef = useRef();

    return (
        <>
            <video muted autoPlay loop ref={videoRef} >
                <source src='/images/main/mainMediea.mp4' type="video/mp4" />
            </video>
        </>
    );
}