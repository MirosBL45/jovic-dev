//components
import AboutComponent from './AboutComponent';
import MeComponent from './MeComponent';

// data
import { allYears } from '@/utils/GeneralFunctions.js';

// style
import styles from './about.module.css';
import '@/app/globals.css';

function About() {
  return (
    <div id="about" className={styles.container}>
      <header className={styles.mainHeadline}>
        <h2>
          Problem solver {'<'}coder{'>'}
        </h2>
        <p>Frontend Developer with over {allYears} years of experience.</p>
      </header>
      {/* <MeComponent
        element="h2"
        mainHeadline={aboutDataText[7].mainHeadline}
        headlineText={aboutDataText[7].headlineText}
        image={aboutDataText[7].image}
      />
      <AboutComponent
        aboutDataText={aboutDataText}
        allYears={allYears}
        aboutData={aboutData}
      /> */}
    </div>
  );
}

export default About;
