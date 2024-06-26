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
          <Link key={item._id} href={`blog/${item.slug}`}>
            <article>
              <ImageCard
                src={item.image}
                alt={item.title}
                additionalClass={styles.containerRadius}
              />
              <p className={styles.technologies}>
                <time>{item.createdAt && formatDate(item.createdAt)}</time>
              </p>
              <h3>{item.title}</h3>
              <p className={styles.description}>{item.description1}</p>
            </article>
          </Link>
        ))}
    </main>
  );
}

export default BlogsCard;
