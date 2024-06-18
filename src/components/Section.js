import React from 'react';
import '../Section.css';

const Section = ({ id, text, color }) => {
    return (
        <section id={id} className="section" style={{ backgroundColor: color }}>
            {text}
        </section>
    );
};

export default Section;