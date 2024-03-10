//components
import LinkButton from '@/components/CustomInputs/Buttons/LinkButton';
import MiniHeadline from '../../MiniHeadline/MiniHeadline';

// style
import styles from './portfolio.module.css';

// data
import { homePortfolio } from '@/utils/allData/homePortfolio';

function Portfolio() {
  const headlineText = 'My {dev} projects';
  const descriptionText = `From Web Apps to Websites & Games`;

  return (
    // <div id="portfolio" className={styles.container}>
    //   <header className={styles.mainHeadline}>
    //     <h2>
    //       My {'{'}dev{'}'} projects
    //     </h2>
    //     <p>From Web Apps to Websites & Games</p>
    //   </header>
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
      {/* <AboutText /> */}
    </MiniHeadline>
  );
}

export default Portfolio;
