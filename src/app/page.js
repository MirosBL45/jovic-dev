// react/next stuff
import Image from 'next/image';
import Link from 'next/link';

// images
import Hero from 'public/hero.png';

// style
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <header className={styles.item}>
        <h1 className={styles.title}>
          Better design for your digital products.
        </h1>
        <p className={styles.description}>
          Turning your Idea into Reality. We bring together the teams from the
          global tech industry.
        </p>
        <Link prefetch href={'/portfolio'} className={styles.button}>
          See Our Works
        </Link>
      </header>
      <div className={styles.item}>
        <Image src={Hero} alt="jovic-dev hero" className={styles.img} />
      </div>
    </main>
  );
}
