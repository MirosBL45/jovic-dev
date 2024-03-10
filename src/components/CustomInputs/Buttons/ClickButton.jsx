'use client';

// style
import styles from './button.module.css';

function ClickButton({ children, onClick, title }) {
  return (
    <button title={title} onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}

export default ClickButton;
