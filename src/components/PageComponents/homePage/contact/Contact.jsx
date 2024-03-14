// components
import ContactComponent from './ContactComponent';
import MiniHeadline from '../../MiniHeadline/MiniHeadline';

function Contact() {
  const headlineText = `Let’s [work] together`;
  const descriptionText = `Open to full time, remote jobs or freelance projects.`;

  return (
    <MiniHeadline
      id="contact"
      headline={headlineText}
      description={descriptionText}
    >
      <ContactComponent />
    </MiniHeadline>
  );
}

export default Contact;
