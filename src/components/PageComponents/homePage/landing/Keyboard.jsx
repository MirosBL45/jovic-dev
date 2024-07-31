'use client';

// react/next stuff
import Image from 'next/image';
import { useContext } from 'react';

// context
import { ThemeContext } from '@/context/ThemeContext';

// style
import styles from './landing.module.css';

// images
import keyboard from 'public/homePage/landing/keyboard Miroslav Jovic Frontend Developer.webp';
import keyboardTransparent from 'public/homePage/landing/keyboard transparent Miroslav Jovic Frontend Developer.webp';
import mouseTransparent from 'public/homePage/landing/mouse transparent Miroslav Jovic Frontend Developer.webp';
import mouse from 'public/homePage/landing/mouse Miroslav Jovic Frontend Developer.webp';

function Keyboard() {
  const { mode } = useContext(ThemeContext);
  return (
    <div className={styles.keyboardAndMouse}>
      <div className={styles.keyboard}>
        <Image
          src={mode === 'light' ? keyboard : keyboardTransparent}
          alt="keyboard Miroslav Jovic Frontend Developer"
          title="keyboard Miroslav Jovic Frontend Developer"
          // width={0}
          // height={0}
          // sizes="100vw"
          width="908"
          height="308"
          sizes="(min-width: 700px) 443px, (min-width: 500px) 400px, calc(80.56vw + 13px)"
          priority={true}
        />
      </div>
      <div className={styles.mouse}>
        <Image
          src={mode === 'light' ? mouse : mouseTransparent}
          alt="mouse Miroslav Jovic Frontend Developer"
          title="mouse Miroslav Jovic Frontend Developer"
          // width={0}
          // height={0}
          // sizes="100vw"
          width="168"
          height="308"
          sizes="(min-width: 700px) 80px, 70px"
        />
      </div>
    </div>
  );
}

export default Keyboard;
