// react/next stuff
import Link from 'next/link';

// style
import styles from './footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.container}>
      <div>
        &copy;{currentYear} <Link href={'/contact'}>jovic-dev</Link>. All rights
        reserved.
      </div>
    </footer>
  );
}

export default Footer;
