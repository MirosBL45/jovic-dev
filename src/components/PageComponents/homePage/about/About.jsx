// data
import { allYears } from '@/utils/GeneralFunctions.js';

// components
import AboutText from './AboutText';

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
      <AboutText />
    </div>
  );
}

export default About;
