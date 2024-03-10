// components
import ContactComponent from './ContactComponent';

// data
import { contactData } from '@/utils/allData/contact';

// style
import styles from './contact.module.css';

function Contact() {
  return (
    <div id="contact" className={styles.container}>
      <header>
        <h2>{contactData.mainHeadline}</h2>
      </header>
      <ContactComponent />
    </div>
  );
}

export default Contact;
