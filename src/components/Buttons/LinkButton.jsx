// react/next stuff
import Link from 'next/link';

// style
import styles from './button.module.css';

function LinkButton({ text, url, openInNewTab }) {
  const linkProps = openInNewTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Link href={url} {...linkProps} className={styles.button}>
      {text}
    </Link>
  );
}

export default LinkButton;
