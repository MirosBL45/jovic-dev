// react/next stuff
import Link from 'next/link';
import Image from 'next/image';

// data
import { portfolioData } from '@/utils/data';

// style
import styles from './page.module.css';

function Portfolio() {
  return (
    <div className={styles.container}>
      <h2>Choose an area</h2>
      <div className={styles.items}>
        {portfolioData.map(({ id, title, url, image }) => (
          <Link key={id} href={url} className={styles.item}>
            <Image src={image} width={300} height={300} alt={title} />
            <span className={styles.itemTitle}>{title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
