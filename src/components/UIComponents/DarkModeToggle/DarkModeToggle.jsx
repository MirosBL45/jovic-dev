'use client';

// react/next stuff
import { useContext } from 'react';

// context
import { ThemeContext } from '@/context/ThemeContext';

// style
import styles from './darkModeToggle.module.css';

// icons
import { BsMoonStarsFill } from 'react-icons/bs';
import { ImSun } from 'react-icons/im';

function DarkModeToggle() {
  const { toggle, mode } = useContext(ThemeContext);

  return (
    <div
      className={styles.container}
      onClick={toggle}
      title="switch dark/light mode"
    >
      <div className={styles.icon}>
        <BsMoonStarsFill />
      </div>
      <div className={styles.icon}>
        <ImSun />
      </div>
      <div
        className={styles.ball}
        style={mode === 'light' ? { left: '4px' } : { right: '3px' }}
      />
    </div>
  );
}

export default DarkModeToggle;