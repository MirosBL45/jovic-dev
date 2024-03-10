// data
import { allYears } from '@/utils/GeneralFunctions.js';

// components
import AboutText from './AboutText';
import MiniHeadline from '../../MiniHeadline/MiniHeadline';

function About() {
  const headlineText = 'Problem solver <coder>';
  const descriptionText = `Frontend Developer with over ${allYears} years of experience.`;

  return (
    <MiniHeadline
      id="about"
      headline={headlineText}
      description={descriptionText}
    >
      <AboutText />
    </MiniHeadline>
  );
}

export default About;
