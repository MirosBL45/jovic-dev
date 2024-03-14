'use client';

// react/next stuff
import { useState, useEffect } from 'react';

// style
import styles from './ScrollButton.module.css';

// icons
import { FaArrowUpLong } from 'react-icons/fa6';

function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 2000);
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
      style={{ display: isVisible ? 'grid' : 'none' }}
      onClick={handleButtonClick}
      title={'Scroll to Top'}
    >
      <FaArrowUpLong className={styles.arrow} />
    </button>
  );
}

export default ScrollButton;
