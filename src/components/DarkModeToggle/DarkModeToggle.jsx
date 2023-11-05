'use client';

// react/next stuff
import { useContext } from 'react';

// context
import { ThemeContext } from '../../../context/ThemeContext';

// style
import styles from './darkModeToggle.module.css';

function DarkModeToggle() {
  const { toggle, mode } = useContext(ThemeContext);

  return (
    <div
      className={styles.container}
      onClick={toggle}
      title="switch dark/light mode"
    >
      <div className={styles.icon}>🌙</div>
      <div className={styles.icon}>🔆</div>
      <div
        className={styles.ball}
        style={mode === 'light' ? { left: '3px' } : { right: '3px' }}
      />
    </div>
  );
}

export default DarkModeToggle;
