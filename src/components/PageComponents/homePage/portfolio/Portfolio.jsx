//components
import MiniHeadline from '../../MiniHeadline/MiniHeadline';
import Projects from './Projects';

function Portfolio() {
  const headlineText = 'My {dev} projects';
  const descriptionText = `From Web Apps to Websites & Games`;

  return (
    <MiniHeadline
      id="portfolio"
      headline={headlineText}
      description={descriptionText}
    >
      <Projects />
    </MiniHeadline>
  );
}

export default Portfolio;
