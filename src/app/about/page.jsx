//components
import AboutComponent from '@/components/PageComponents/homePage/about/AboutComponent';
import MeComponent from '@/components/PageComponents/homePage/about/MeComponent';

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
      <MeComponent
        element="h1"
        mainHeadline={aboutDataText[7].mainHeadline}
        headlineText={aboutDataText[7].headlineText}
        image={aboutDataText[7].image}
      />
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
