
import { useRef, useEffect } from 'react';

const ProductMainGuide = ({ text }) => {
    const guideRef = useRef(null);

    useEffect(() => {
        const guideElement = guideRef.current;
        const containerWidth = guideElement.offsetWidth;
        const animationDuration = containerWidth / 30;
        const animationDelay = -containerWidth / 50;

        guideElement.style.animation = 'none';
        guideElement.style.animation = `scrollText ${animationDuration}s linear infinite`;
        guideElement.style.animationDelay = `${animationDelay}s`;
    }, [text]);

    return (
        <p className="productMainGuide" ref={guideRef} style={{ animation: "scrollText linear infinite" }}>
            {text}
        </p>
    );
};

export default ProductMainGuide;