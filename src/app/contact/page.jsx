// components
import ContactComponent from '@/components/PageComponents/homePage/contact/ContactComponent';

// style
import styles from './page.module.css';

// Static metadata
export const metadata = {
  title: 'Contact Jović Miroslav | Frontend Developer',
  description:
    'Contact Jović Miroslav on the web. Send me a message, I look forward to our meeting. Explore my portfolio showcasing quick, stable, and responsive online applications and websites crafted with Next.js, React, MongoDB, Mongoose, and SWR. As a frontend developer, I bring digital dreams to life with cutting-edge technologies, ensuring seamless user experiences. Dive into my work and discover the power of innovative frontend development',
  twitter: {
    title: 'Contact Jović Miroslav | Frontend Developer',
    description:
      'Contact Jović Miroslav on the web. Send me a message, I look forward to our meeting. Explore my portfolio showcasing quick, stable, and responsive online applications and websites crafted with Next.js, React, MongoDB, Mongoose, and SWR. As a frontend developer, I bring digital dreams to life with cutting-edge technologies, ensuring seamless user experiences. Dive into my work and discover the power of innovative frontend development',
  },
  openGraph: {
    title: 'Contact Jović Miroslav | Frontend Developer',
    description:
      'Contact Jović Miroslav on the web. Send me a message, I look forward to our meeting. Explore my portfolio showcasing quick, stable, and responsive online applications and websites crafted with Next.js, React, MongoDB, Mongoose, and SWR. As a frontend developer, I bring digital dreams to life with cutting-edge technologies, ensuring seamless user experiences. Dive into my work and discover the power of innovative frontend development',
  },
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
