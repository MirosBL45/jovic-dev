'use client';

// react/next stuff
import Image from 'next/image';
import { useContext } from 'react';

// style
import styles from './landing.module.css';

// images
import keyboard from 'public/keyboard Miroslav Jovic Frontend Developer.webp';
import keyboardTransparent from 'public/keyboard transparent Miroslav Jovic Frontend Developer.webp';
import mouseTransparent from 'public/mouse transparent Miroslav Jovic Frontend Developer.webp';
import mouse from 'public/mouse Miroslav Jovic Frontend Developer.webp';

// context
import { ThemeContext } from '@/context/ThemeContext';

function Keyboard() {
  const { mode } = useContext(ThemeContext);
  return (
    <div className={styles.keyboard}>
      <Image
        src={mode === 'light' ? keyboard : keyboardTransparent}
        alt="keyboard Miroslav Jovic Frontend Developer"
        width={443}
        height={158}
      />
      <Image
        className={styles.mouse}
        src={mode === 'light' ? mouse : mouseTransparent}
        alt="mouse Miroslav Jovic Frontend Developer"
        width={80}
        height={155}
      />
    </div>
  );
}

export default Keyboard;
