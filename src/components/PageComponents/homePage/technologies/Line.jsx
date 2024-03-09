'use client';

// react/next stuff
import Image from 'next/image';
import { useContext } from 'react';

// context
import { ThemeContext } from '@/context/ThemeContext';

// images
import lineDark from 'public/homePage/about/line dark Miroslav Jovic Frontend Developer.png';
import lineLight from 'public/homePage/about/line light Miroslav Jovic Frontend Developer.png';

// style
import styles from './technologies.module.css';

function Line() {
  const { mode } = useContext(ThemeContext);

  return (
    <Image
      className={styles.lineTech}
      src={mode === 'light' ? lineDark : lineLight}
      alt="line Miroslav Jovic Frontend Developer"
      width={0}
      height={0}
    />
  );
}

export default Line;
