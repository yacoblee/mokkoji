import IntroductionPage from "./IntroductionPage";
import '../../css/Introduction/Introduction.css'
import React, { useState } from "react";
import IntroductionPage2 from "./IntroductionPage2";
import IntroductionPage3 from "./IntroductionPage3";
import IntroductionPage4 from "./IntroductionPage4";
import IntroductionPage5 from "./IntroductionPage5";
import { useDispatch } from 'react-redux';
import TopButton from "../modules/ScrollToTopBtn";


const Introduction = () => {

    const [getLocation, setGetLocation] = useState(false)
    return (
        <div className="hy_main-container">
            <IntroductionPage />
            <IntroductionPage2 getLocation={getLocation} />
            <IntroductionPage3 setGetLocation={setGetLocation}/>
            <IntroductionPage4  />
            {/* <IntroductionPage5/> */}
            <TopButton />
        </div>
    )
}
export default Introduction;