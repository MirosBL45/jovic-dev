'use client';

// react/next stuff
import Image from 'next/image';

// emailjs
import emailjs from '@emailjs/browser';
import { useState, useRef } from 'react';

// components
import ClickButton from '@/components/CustomInputs/Buttons/ClickButton';

// style
import styles from './contact.module.css';

import { SERVICE_BASE, TEMPLATE_BASE, PUBLIC_BASE } from '@/utils/constants';

function ContactComponent() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  function sendEmail(e) {
    e.preventDefault();

    setLoading(true);
    emailjs
      .sendForm(SERVICE_BASE, TEMPLATE_BASE, formRef.current, PUBLIC_BASE)
      .then(
        () => {
          setLoading(false);
          alert('Thank you. I will get back to you as soon as possible.');
        },
        (error) => {
          setLoading(false);
          console.log(error);
          alert('Somthing went wrong. Please, try again.');
        }
      );
    e.target.reset();
  }

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
        <form ref={formRef} onSubmit={sendEmail} className={styles.sendingForm}>
          <input
            type="text"
            placeholder="Your Name"
            name="user_name"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            name="user_email"
            required
          />
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            className={styles.subjectInput}
            required
          />
          <textarea
            placeholder="Your Message"
            cols="30"
            rows="10"
            name="message"
            required
          ></textarea>
          <ClickButton title={loading ? `Sending...` : `Let's talk`}>
            {loading ? `Sending...` : `Let's talk`}
          </ClickButton>
        </form>
      </section>
    </>
  );
}

export default ContactComponent;
