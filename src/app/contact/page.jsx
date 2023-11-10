// react/next stuff
import Image from 'next/image';
import Meta from '@/components/meta/Meta';

// style
import styles from './page.module.css';

// export const metadata = {
//   title: 'Jovic-dev contact',
//   description: 'Contact Jovic Miroslav on web',
// };

function Contact() {
  return (
    <>
      <Meta
        title="Next MJ | About"
        regular_keywords="Next MJ | About"
        regular_description="Next MJ | About"
      />
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
    </>
  );
}

export default Contact;
