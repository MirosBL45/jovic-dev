// react/next stuff
import Link from 'next/link';
import Image from 'next/image';

//components
import LinkButton from '@/components/CustomInputs/Buttons/LinkButton';

// style
import styles from './portfolio.module.css';

// data
import { homePortfolio } from '@/utils/allData/homePortfolio';

function Portfolio() {
  return (
    <div id="portfolio" className={styles.container}>
      <header>
        <h2>My Work</h2>
        <h3>Take a look at some of my projects</h3>
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
