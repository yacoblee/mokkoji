import '../../css/main.css'
import Section from '../modules/Section';

const Main = () => {


    return (
        <div className="master_page">

            <Section id="section1" text="Section 1" color="#3c97d3b3" />
            <Section id="section2" text="Section 2" color="#2ecc71" />
            <Section id="section3" text="Section 3" color="#e74c3c" />
            <Section id="section4" text="Section 4" color="#9b59b6" />
            <Section id="section5" text="Section 5" color="#f39c12" />
        </div>
    )
}

export default Main;