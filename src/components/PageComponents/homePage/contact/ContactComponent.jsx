// react/next stuff
import Image from 'next/image';

// components
import ClickButton from '@/components/CustomInputs/Buttons/ClickButton';

// style
import styles from './contact.module.css';
import '@/app/globals.css';

function ContactComponent() {
  return (
    <>
      <section className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            className="moveImage"
            src={'/emailContact.svg'}
            alt="contact jovic-dev"
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <form className={styles.sendingForm}>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message" cols="30" rows="10"></textarea>
          <ClickButton title={'Send Message'}>{'Send Message'}</ClickButton>
        </form>
      </section>
    </>
  );
}

export default ContactComponent;
