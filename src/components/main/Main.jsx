import { useEffect } from 'react';
import '../../css/main.css'
import Section from '../modules/Section';

const Main = () => {
    // useEffect(() => {
    //     const sections = document.querySelectorAll('.section:not(.fixed-section)');
    //     const options = {
    //         threshold: 0.3,
    //     };

    //     const observer = new IntersectionObserver((entries) => {
    //         entries.forEach((entry) => {
    //             if (entry.isIntersecting) {
    //                 entry.target.classList.add('in-view');
    //             } else {
    //                 entry.target.classList.remove('in-view');
    //             }
    //         });
    //     }, options);

    //     sections.forEach((section) => {
    //         observer.observe(section);
    //     });

    //     return () => {
    //         sections.forEach((section) => {
    //             observer.unobserve(section);
    //         });
    //     };
    // }, []);
    return (
        <div className="master_page">
            <Section></Section>
        </div>
    )
}

export default Main;
