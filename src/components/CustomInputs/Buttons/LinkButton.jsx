// react/next stuff
import Link from 'next/link';

// style
import styles from './button.module.css';

// function LinkButton({ text, url, openInNewTab, title }) {
//   const linkProps = openInNewTab
//     ? { target: '_blank', rel: 'noopener noreferrer' }
//     : {};

//   return (
//     <Link title={title} href={url} {...linkProps} className={styles.button}>
//       {text}
//     </Link>
//   );
// }

// export default LinkButton;

function LinkButton({ text, url, openInNewTab, title, buttonStyle }) {
  const linkProps = openInNewTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  const combinedStyles = `${styles.link} ${buttonStyle}`;

  return (
    <Link title={title} href={url} {...linkProps} className={combinedStyles}>
      {text}
    </Link>
  );
}

export default LinkButton;
