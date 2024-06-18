import React, { useEffect } from 'react';
import './index.css';
import Main from './components/main/main';

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
    <div>
      <Main />
    </div>
  );
};

export default App;