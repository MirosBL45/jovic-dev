// react/next stuff
import Link from 'next/link';
import Image from 'next/image';

// style
import styles from './contact.module.css';

// images
import Miroslav from 'public/homePage/Miroslav Jovic Frontend Developer.png';

function LinksText() {
  return (
    <>
      <div className={styles.avatar}>
        <Image
          src={Miroslav}
          alt="Miroslav Jovic Frontend Developer"
          title="Miroslav Jovic Frontend Developer"
          width={0}
          height={0}
          sizes="100vw"
        />
      </div>
      <p className={styles.socials}>
        Contact me on{' '}
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href={'https://www.linkedin.com/in/mj888/'}
          title={`Jovic Miroslav's Frontend Developer Linkedin profile`}
        >
          LinkedIn
        </Link>
        , visit my{' '}
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href={'https://github.com/MirosBL45'}
          title={`Jovic Miroslav's Frontend Developer Github profile`}
        >
          Github
        </Link>
        , or email me:
      </p>
    </>
  );
}

export default LinksText;
