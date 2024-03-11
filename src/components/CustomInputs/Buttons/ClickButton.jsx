'use client';

// style
import styles from './button.module.css';

function ClickButton({ children, onClick, title, buttonStyle }) {
  // const combinedStyles = `${buttonStyle || 'button'}`;

  return (
    // <button title={title} onClick={onClick} className={buttonStyle}>
    <button title={title} onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
}

export default ClickButton;
