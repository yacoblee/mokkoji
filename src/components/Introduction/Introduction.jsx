import IntroductionPage from "./IntroductionPage";
import '../../css/Introduction/Introduction.css'
import React from "react"; 
import IntroductionPage2 from "./IntroductionPage2";
import IntroductionPage3 from "./IntroductionPage3";
import IntroductionPage4 from "./IntroductionPage4";



const Introduction = () => {

    return (
        <div className="main-container">
            <IntroductionPage/>
            <IntroductionPage2/>
            <IntroductionPage3/>
            <IntroductionPage4/>
        </div>
    )
}
export default Introduction;