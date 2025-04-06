// react/next stuff
import Link from 'next/link';

// style
import styles from './footer.module.css';

// icons
import { FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.container}>
      <div className={styles.links}>
        <span>
          &copy; {currentYear} Designed by{' '}
          <Link
            rel="noopener noreferrer"
            target="_blank"
            href={'https://www.devu.design/'}
            title={'Design & Dev Studio – where Creativity & Technology unite.'}
          >
            Devu Design
          </Link>
          .
        </span>{' '}
        <span>
          Developed by{' '}
          <Link title={'Miroslav Jovic Frontend Developer'} href={'/contact'}>
            Miroslav Jovic
          </Link>
          .
        </span>
      </div>
      <div className={styles.icons}>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href={'https://www.linkedin.com/in/mj888/'}
          title={`Jovic Miroslav's Frontend Developer Linkedin profile`}
        >
          <FaLinkedin />
        </Link>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href={'https://github.com/MirosBL45'}
          title={`Jovic Miroslav's Frontend Developer Github profile`}
        >
          <FaGithub />
        </Link>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href={'https://x.com/MiroslavJovic45'}
          title={`Jovic Miroslav's Frontend Developer X profile`}
        >
          <FaXTwitter />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
