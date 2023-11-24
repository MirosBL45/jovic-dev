'use client';
import { useState, useEffect } from 'react';
import styles from './ScrollButton.module.css';

function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 200);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleButtonClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      className={styles.scrollButton}
      style={{ display: isVisible ? 'block' : 'none' }}
      onClick={handleButtonClick}
    >
      Scroll to Top
    </button>
  );
}

export default ScrollButton;
