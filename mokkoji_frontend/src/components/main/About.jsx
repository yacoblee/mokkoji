import { Link } from "react-router-dom";
import React, { useState } from "react";


const About = () => {


    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };
    const contents = (
        <>
            <div>Welcome to our Korean Traditional Merchandise page!</div>
            <div>Discover a curated collection of products inspired by Korea's rich cultural heritage</div>
            <div>Explore and find the perfect piece to celebrate Korea's beauty and tradition</div>
            <div className="learn-more">Learn More</div >
        </>
    );
    return (
        <>
            <div className="about_head">
                <h1>About</h1>
            </div>
            <Link to={'/introduction'}>
                <div className={isHovering ? 'about_img hide' : 'about_img'}>

                    <div className={isHovering ? 'about_content show' : 'about_content'}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}>

                        {isHovering ? contents : ""}

                    </div>
                </div>
            </Link>
        </>
    );
}


export default About