// components
import ContactComponent from '@/components/PageComponents/homePage/contact/ContactComponent';

// style
import styles from './page.module.css';

// Static metadata
export const metadata = {
  title: 'Contact Jović Miroslav',
  description:
    'Contact Jović Miroslav on the web. Send me a message, I look forward to our meeting',
};

function Contact() {
  return (
    <main className={`${styles.container} layoutContainerAll`}>
      <header>
        <h1>{`Let’s [work] together`}</h1>
      </header>
      <ContactComponent />
    </main>
  );
}

export default Contact;
