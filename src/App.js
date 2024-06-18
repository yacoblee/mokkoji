import React, { useEffect } from 'react';
import Header from './components/Header';
import Section from './components/Section';
import './index.css';

const App = () => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('header');
      if (window.scrollY > 10) {
        header.classList.remove('deactive');
        header.classList.add('active');
      } else {
        header.classList.remove('active');
        header.classList.add('deactive');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="master_page">
      <Header />
      <Section id="section1" text="Section 1" color="#3c97d3b3" />
      <Section id="section2" text="Section 2" color="#2ecc71" />
      <Section id="section3" text="Section 3" color="#e74c3c" />
      <Section id="section4" text="Section 4" color="#9b59b6" />
      <Section id="section5" text="Section 5" color="#f39c12" />
    </div>
  );
};

export default App;