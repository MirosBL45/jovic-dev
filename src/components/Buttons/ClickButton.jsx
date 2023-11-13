'use client';

// style
import styles from './button.module.css';

function ClickButton({ children }) {
  return <button className={styles.button}>{children}</button>;
}

export default ClickButton;
