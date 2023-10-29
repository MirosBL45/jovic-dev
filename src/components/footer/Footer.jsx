// react/next stuff
import Image from 'next/image';

// style
import styles from './footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.container}>
      <div>&copy;{currentYear} jovic-dev. All rights reserved.</div>
      <div className={styles.social}>
        <Image src={'/1.png'} alt="jovic-dev" width={15} height={15} />
        <Image src={'/2.png'} alt="jovic-dev" width={15} height={15} />
        <Image src={'/3.png'} alt="jovic-dev" width={15} height={15} />
        <Image src={'/4.png'} alt="jovic-dev" width={15} height={15} />
      </div>
    </footer>
  );
}

export default Footer;
