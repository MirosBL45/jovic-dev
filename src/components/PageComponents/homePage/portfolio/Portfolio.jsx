//components
import LinkButton from '@/components/CustomInputs/Buttons/LinkButton';
import MiniHeadline from '../../MiniHeadline/MiniHeadline';
import Change from './Change';

// style
import styles from './portfolio.module.css';

// data
import { homePortfolio } from '@/utils/allData/homePortfolio';

function Portfolio() {
  const headlineText = 'My {dev} projects';
  const descriptionText = `From Web Apps to Websites & Games`;

  return (
    // <div id="portfolio" className={styles.container}>
    //   <section className={styles.portfolioItems}>
    //     {homePortfolio.map((item) => (
    //       <p key={item.id}>{item.title}</p>
    //     ))}
    //   </section>
    //   <LinkButton
    //     title={'See more projects'}
    //     text={'See more projects'}
    //     url={'/portfolio'}
    //   />
    // </div>
    <MiniHeadline
      id="portfolio"
      headline={headlineText}
      description={descriptionText}
    >
      <Change />
    </MiniHeadline>
  );
}

export default Portfolio;
