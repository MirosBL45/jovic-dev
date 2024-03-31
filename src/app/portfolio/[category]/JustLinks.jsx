'use client';

// react/next stuff
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// data
import { portfolioData } from '@/utils/allData/mainPortfolio';

// style
import styles from './page.module.css';

export default function JustLinks() {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const lastSegment = segments[segments.length - 1];

  return (
    <section className={styles.links}>
      {portfolioData.map(({ id, title, url, forUrl }) => (
        <Link
          key={id}
          href={url}
          title={`Click to see ${title}`}
          className={
            lastSegment === forUrl ? `${styles.button}` : `${styles.flatButton}`
          }
        >
          {title}
        </Link>
      ))}
    </section>
  );
}
