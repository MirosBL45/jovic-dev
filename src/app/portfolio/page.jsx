// components
import PortfolioCard from '@/components/UIComponents/Cards/PortfolioCard';

// data
import { portfolioData } from '@/utils/allData/mainPortfolio';

// style
import styles from './page.module.css';

// Static metadata
export const metadata = {
  title: 'Portfolio of Jović Miroslav | Frontend Developer',
};

function Portfolio() {
  return (
    <main className={`${styles.container} ${styles.mainHolder}`}>
      <h2>
        Choose {'['}an area{']'} to see my work
      </h2>
      <PortfolioCard portfolioData={portfolioData} />
    </main>
  );
}

export default Portfolio;
