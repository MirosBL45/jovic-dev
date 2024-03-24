// react/next stuff
import Link from 'next/link';

// components
import ImageCard from './ImageCard';
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
              <ImageCard
                src={item.image}
                alt={item.title}
                additionalClass={styles.containerRadius}
              />
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
