//components
import LinkButton from '@/components/CustomInputs/Buttons/LinkButton';

// style
import styles from './portfolio.module.css';

// data
import { homePortfolio } from '@/utils/allData/homePortfolio';

function Portfolio() {
  return (
    <div id="portfolio" className={styles.container}>
      <header className={styles.mainHeadline}>
        <h2>
          My {'{'}dev{'}'} projects
        </h2>
        <p>From Web Apps to Websites & Games</p>
      </header>
      <section className={styles.portfolioItems}>
        {homePortfolio.map((item) => (
          <p key={item.id}>{item.title}</p>
        ))}
      </section>
      <LinkButton
        title={'See more projects'}
        text={'See more projects'}
        url={'/portfolio'}
      />
    </div>
  );
}

export default Portfolio;
