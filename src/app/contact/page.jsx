// 'use client';

// components
import ContactComponent from '@/components/homePage/contact/ContactComponent';

// data
import { contactData } from '@/utils/data';

// style
import styles from './page.module.css';
import '@/app/globals.css';

// Static metadata
export const metadata = {
  title: 'Jovic-dev Contact',
  description: 'Contact Jovic Miroslav on web',
};

function Contact() {
  return (
    <main className={`${styles.container} layoutContainerAll`}>
      <header>
        <h1>{contactData.mainHeadline}</h1>
      </header>
      <ContactComponent />
    </main>
  );
}

export default Contact;
