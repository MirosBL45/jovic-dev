// 'use client';

// components
import ContactComponent from './ContactComponent';

// data
import { contactData } from '@/utils/data';

// style
import styles from './contact.module.css';
import '@/app/globals.css';

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
