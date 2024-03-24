// react/next stuff
import Link from 'next/link';

// components
import ImageCard from './ImageCard';
import LinkButton from '@/components/CustomInputs/Buttons/LinkButton';

// style
import styles from './cards.module.css';

function SinglePortfolioCard({ data }) {
  return (
    <main className={styles.projects}>
      {data.map((item) => (
        <article key={item.id}>
          <ImageCard
            src={item.image}
            alt={item.title}
            additionalClass={styles.containerRadius}
          />
          <p className={styles.technologies}>
            <LinkButton
              title={'Click to see live project'}
              openInNewTab={true}
              text={'See Live'}
              url={item.url}
              buttonStyle={'flat mb-4'}
            />
            <LinkButton
              title={'Click to see project on Github'}
              openInNewTab={true}
              text={'See on Github'}
              url={item.github}
              buttonStyle={'flat mb-al'}
            />
          </p>
          <h3>{item.title}</h3>
          {item.desc.split('||').map((paragraph, index) => (
            <p key={index} className={styles.description}>
              {paragraph}
            </p>
          ))}
        </article>
      ))}
    </main>
  );
}

export default SinglePortfolioCard;
