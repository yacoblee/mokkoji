import React, { useRef } from 'react';
import Background from '../main/Backgroud'
import ProductSection from '../main/Productsection';
import Introduction from '../main/Introduction';
import About from '../main/About'
import SlideSection from '../main/SliderSection';
const Section = ({ id, text, color }) => {


    return (
        <div>
            <section id='section1' className="" style={{ backgroundColor: color }}>
                <Background />
            </section>

            <section id='section2' className="section" >
                <ProductSection />
            </section>

            <section id='section3' className="section">
                <SlideSection />
            </section>


            <section id='section5' className="section" style={{ backgroundColor: color }}>
                Section 1
            </section>
            <section id='section4' className="section">
                <Introduction />
            </section>
        </div>
    );
};

export default Section;