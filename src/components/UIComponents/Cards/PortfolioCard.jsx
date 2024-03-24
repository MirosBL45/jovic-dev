// react/next stuff
import Link from 'next/link';

// components
import ImageCard from './ImageCard';

// style
import styles from './cards.module.css';

function PortfolioCard({ portfolioData }) {
  return (
    <section className={styles.projects}>
      {portfolioData.map(({ id, title, url, image, description }) => (
        <Link href={url} className={styles.item}>
          <article key={id}>
            <ImageCard
              src={image}
              alt={title}
              additionalClass={styles.containerRadius}
            />
            <h3>{title}</h3>
            <p className={styles.description}>{description}</p>
          </article>
        </Link>
      ))}
    </section>
  );
}

export default PortfolioCard;
