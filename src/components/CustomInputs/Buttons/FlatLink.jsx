// react/next stuff
import Link from 'next/link';

// style
import styles from './button.module.css';

function FlatLink({ text, url, openInNewTab, title }) {
  const linkProps = openInNewTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Link title={title} href={url} {...linkProps} className={styles.flat}>
      {text}
    </Link>
  );
}

export default FlatLink;
