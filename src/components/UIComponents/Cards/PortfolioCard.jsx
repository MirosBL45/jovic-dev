// react/next stuff
import Image from 'next/image';
import Link from 'next/link';

// style
import styles from './cards.module.css';

function PortfolioCard({ portfolioData }) {
  return (
    <section className={styles.projects}>
      {portfolioData.map(({ id, title, url, image, description }) => (
        <Link key={id} href={url} className={styles.item}>
          <article>
            <div
              className={`${styles.imageContainer} ${styles.containerRadius}`}
            >
              <Image
                width={0}
                height={0}
                sizes="100vw"
                src={image}
                alt={`${title} Jovic Miroslav Frontend Developer`}
              />
            </div>
            <h3>{title}</h3>
            <p className={styles.description}>{description}</p>
          </article>
        </Link>
      ))}
    </section>
  );
}

export default PortfolioCard;
