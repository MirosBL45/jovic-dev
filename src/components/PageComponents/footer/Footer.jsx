// react/next stuff
import Link from 'next/link';

// style
import styles from './footer.module.css';

// icons
import { FaLinkedin, FaGithub } from 'react-icons/fa6';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.container}>
      <div>&copy; {currentYear} All rights reserved.</div>
      <div className={styles.links}>
        <span>
          Designed by{' '}
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href={'https://www.devu.design/'}
          >
            DeVu
          </Link>
          .
        </span>{' '}
        <span>
          Developed by <Link href={'/contact'}>Miroslav Jovic</Link>.
        </span>
      </div>
      <div className={styles.icons}>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href={'https://www.linkedin.com/in/mj888/'}
        >
          <FaLinkedin />
        </Link>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href={'https://github.com/MirosBL45'}
        >
          <FaGithub />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
