// components
import ContactComponent from './ContactComponent';
import MiniHeadline from '../../MiniHeadline/MiniHeadline';
import LinksText from './LinksText';

// data
import { contactData } from '@/utils/allData/contact';

function Contact() {
  return (
    <MiniHeadline
      id="contact"
      headline={contactData.headlineText}
      description={contactData.descriptionText}
    >
      <LinksText />
      <ContactComponent />
    </MiniHeadline>
  );
}

export default Contact;
