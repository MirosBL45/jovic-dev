// components
import PortfolioCard from '@/components/UIComponents/Cards/PortfolioCard';

// data
import { portfolioData } from '@/utils/allData/mainPortfolio';

// style
import styles from './page.module.css';

// Static metadata
export const metadata = {
  title: 'Portfolio of Jović Miroslav',
  description: 'Portfolio of Jović Miroslav on the web. Look at my works',
};

function Portfolio() {
  return (
    <main className={styles.container}>
      <h2>
        Choose {'['}an area{']'} to see my work
      </h2>
      <PortfolioCard portfolioData={portfolioData} />
    </main>
  );
}

export default Portfolio;
