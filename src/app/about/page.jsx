//components
import AboutComponent from '@/components/homePage/about/AboutComponent';

// data
import { aboutData, aboutDataText } from '@/utils/allData/about';
import { allYears } from '@/utils/GeneralFunctions.js';

// style
import styles from './page.module.css';
import '@/app/globals.css';

// Static metadata
export const metadata = {
  title: 'Jovic-dev About',
  description: 'About Jovic Miroslav on web',
};

function About() {
  return (
    <div className={`${styles.container} layoutContainerAll`}>
      <header className={styles.imgText}>
        <h1>{aboutDataText[7].mainHeadline}</h1>
        <p>{aboutDataText[7].headlineText}</p>
      </header>
      <main>
        <AboutComponent
          aboutDataText={aboutDataText}
          allYears={allYears}
          aboutData={aboutData}
        />
      </main>
    </div>
  );
}

export default About;
