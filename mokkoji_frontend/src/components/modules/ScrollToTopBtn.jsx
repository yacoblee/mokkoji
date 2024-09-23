import React, { useState, useEffect } from 'react'
import '../../css/buy/ScrollToTopBtn.css'


const TopButton = () => {
    const [showButton, setShowButton] = useState(false);

    const [fly , setFly] = useState(false);

    const scrollToTop = () => {
        setFly(true);
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
        setTimeout(() => {
            setFly(false);
        }, 700);
    }
    useEffect(() => {
        const ShowButtonClick = () => {
            if (window.scrollY > 300) {
                setShowButton(true)
            } else {
                if(fly){
                    setTimeout(() => {
                        
                        setShowButton(false)
                    }, 500);
                }else{
                    setShowButton(false);
                }
            }
        }
        window.addEventListener("scroll", ShowButtonClick)
        return () => {
            window.removeEventListener("scroll", ShowButtonClick)
        }
    }, [])
    return (
        <div >
            {showButton &&
                <div className="scroll-to-top">
                    <button onClick={scrollToTop}
                        className="button-container"
                        type="button">
                        <img src="/images/buy/arrow1.png" alt="arrow1" 
                        // style={{transform: 'rotateY(360deg)'}}
                        className={`arrow ${fly ? 'fly' : ''}`}/>
                        <img src="/images/buy/bow.png"
                        // style={{transform: 'rotateY(180deg)'}} 
                        alt="bow" className="bow"/>
                    </button>
                </div>
            }
        </div>
    )
}

export default TopButton;