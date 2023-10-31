// react/next stuff
import Link from 'next/link';

// style
import styles from './button.module.css';

function Button({ text, url }) {
  return (
    <Link prefetch href={url} className={styles.button}>
      {text}
    </Link>
  );
}

export default Button;
