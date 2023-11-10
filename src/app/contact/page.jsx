// react/next stuff
import Image from 'next/image';

// style
import styles from './page.module.css';

// Static metadata
export const metadata = {
  title: 'Jovic-dev Contact',
  description: 'Contact Jovic Miroslav on web',
};

function Contact() {
  return (
    <div className={styles.container}>
      <h1>Let's Keep in Touch</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            className="moveImage"
            src={'/contact.png'}
            alt="contact jovic-dev"
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <form className={styles.sendingForm}>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message" cols="30" rows="10"></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
