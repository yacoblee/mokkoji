import IntroductionPage from "./IntroductionPage";
import '../../css/Introduction/Introduction.css'
import React, { useState } from "react";
import IntroductionPage2 from "./IntroductionPage2";
import IntroductionPage3 from "./IntroductionPage3";
import IntroductionPage4 from "./IntroductionPage4";
import { useDispatch } from 'react-redux';



const Introduction = () => {

    const [getLocation, setGetLocation] = useState(false)
    console.log(getLocation);
    return (
        <div className="hy_main-container">
            <IntroductionPage />
            <IntroductionPage2 getLocation={getLocation} />
            <IntroductionPage3 setGetLocation={setGetLocation}/>
            <IntroductionPage4  />
        </div>
    )
}
export default Introduction;