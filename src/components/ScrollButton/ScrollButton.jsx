'use client';

// react/next stuff
import { useState, useEffect } from 'react';
import Image from 'next/image';

// style
import styles from './ScrollButton.module.css';

// icons
import upArrow from 'public/up-arrow.svg';

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
      title={'Scroll to Top'}
    >
      <Image src={upArrow} alt="Scroll to Top" width={35} height={35} />
    </button>
  );
}

export default ScrollButton;
