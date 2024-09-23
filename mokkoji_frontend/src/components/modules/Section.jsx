import React, { useRef } from 'react';
import Background from '../main/Backgroud'
import SliderSection from '../main/SliderSection';
import PostCard from '../main/PostCard';
import Productsection from '../main/Productsection';
import ReserveSection from './../main/ReserveSection';
const Section = ({ id, text, color }) => {

    return (
        <div>
            <section id='section1' className="" style={{ backgroundColor: color }}>
                <Background />
            </section>

            <section id='section2' className="section" >
                <SliderSection />
            </section>

            <section id='section3' className="section">
                <Productsection />
            </section>


            <section id='section4' className="section" >
                <ReserveSection />
            </section>
            <section id='section5' className="section">
                <PostCard />
            </section>
        </div>
    );
};

export default Section;