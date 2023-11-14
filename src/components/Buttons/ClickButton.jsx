'use client';

// style
import styles from './button.module.css';

function ClickButton({ children, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}

export default ClickButton;
