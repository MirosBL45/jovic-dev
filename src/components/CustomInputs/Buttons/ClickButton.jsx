'use client';

// style
import styles from './button.module.css';
import '@/app/globals.css';

function ClickButton({ children, onClick, title }) {
  return (
    <button className={styles.button} title={title} onClick={onClick}>
      {children}
    </button>
  );
}

export default ClickButton;
