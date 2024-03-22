// react/next stuff
import Image from 'next/image';
import Link from 'next/link';

// components
import { formatDate } from '@/utils/GeneralFunctions';

// style
import styles from './cards.module.css';

function BlogsCard({ data }) {
  return (
    <main className={styles.projects}>
      {data
        .slice()
        .reverse()
        .map((item) => (
          <Link href={`blog/${item.slug}`}>
            <article key={item._id}>
              <div
                className={`${styles.imageContainer} ${styles.containerRadius}`}
              >
                <Image
                  src={item.image}
                  alt={`${item.title} - Jovic Miroslav, Frontend Developer`}
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
              <p className={styles.technologies}>
                <time>{item.createdAt && formatDate(item.createdAt)}</time>
              </p>
              <h3>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </article>
          </Link>
        ))}
    </main>
  );
}

export default BlogsCard;
