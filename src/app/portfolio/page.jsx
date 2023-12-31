// react/next stuff
import Link from 'next/link';
import Image from 'next/image';

// data
import { portfolioData } from '@/utils/data';

// style
import styles from './page.module.css';

// Static metadata
export const metadata = {
  title: 'Jovic-dev Portfolio',
  description: 'Portfolio Jovic Miroslav on web',
};

function Portfolio() {
  return (
    <main className={styles.container}>
      <h2>Choose an area to see my work</h2>
      <section className={styles.items}>
        {portfolioData.map(({ id, title, url, image }) => (
          <Link key={id} href={url} className={styles.item}>
            <Image src={image} width={300} height={300} alt={title} />
            <span className={styles.itemTitle}>{title}</span>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Portfolio;
