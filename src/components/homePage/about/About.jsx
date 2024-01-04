//components
import AboutComponent from './AboutComponent';

// data
import { aboutData } from '@/utils/data';
import { aboutDataText } from '@/utils/data';
import { allYears } from '@/utils/GeneralFunctions.js';

// style
import styles from './about.module.css';
import '@/app/globals.css';

function About() {
  return (
    <div id="about" className={styles.container}>
      <header className={styles.imgText}>
        <h2>{aboutDataText[7].mainHeadline}</h2>
        <p>{aboutDataText[7].headlineText}</p>
      </header>
      <AboutComponent
        aboutDataText={aboutDataText}
        allYears={allYears}
        aboutData={aboutData}
      />
    </div>
  );
}

export default About;
