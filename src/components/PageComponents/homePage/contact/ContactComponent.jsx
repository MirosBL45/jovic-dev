'use client';

// emailjs
import emailjs from '@emailjs/browser';
import { useState, useRef } from 'react';

// components
import ClickButton from '@/components/CustomInputs/Buttons/ClickButton';
import Popup from '@/components/UIComponents/PopUp/PopUp';

// style
import styles from './contact.module.css';

import { SERVICE_BASE, TEMPLATE_BASE, PUBLIC_BASE } from '@/utils/constants';

function ContactComponent() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  // for PopUp model
  const [popupMessage, setPopupMessage] = useState(false);
  const [popupMessageEmpty, setPopupMessageEmpty] = useState(false);
  const [popupMessageMail, setPopupMessageMail] = useState(false);

  function handleClose() {
    setPopupMessage(false);
    setPopupMessageEmpty(false);
    setPopupMessageMail(false);
  }

  // A function to check the validity of an email address using regex
  function isValidEmail(email) {
    // Regex for checking email address validity
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function sendEmail(e) {
    e.preventDefault();

    if (!e.target[0].value || !e.target[1].value || !e.target[2].value) {
      setPopupMessageEmpty(true);
      return;
    }

    // Getting the email address value from another form field
    const emailValue = e.target[1].value;
    // Checking the validity of the email address
    if (!isValidEmail(emailValue)) {
      setPopupMessageMail(true);
      return;
    }

    setLoading(true);
    emailjs
      .sendForm(SERVICE_BASE, TEMPLATE_BASE, formRef.current, PUBLIC_BASE)
      .then(
        () => {
          setLoading(false);
          setPopupMessage(true);
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
          <textarea
            placeholder="Your Message"
            cols="30"
            rows="10"
            name="message"
            required
          ></textarea>
          <ClickButton
            disabled={loading}
            title={
              loading
                ? `Sending...`
                : `Send Message to Miroslav Jovic, Frontend Developer`
            }
          >
            {loading ? `Sending...` : `Send Message`}
          </ClickButton>
        </form>
      </section>
      {popupMessage && (
        <Popup
          message="Thank you. I will get back to you as soon as possible."
          onClose={handleClose}
          showPopup={popupMessage}
        />
      )}
      {popupMessageEmpty && (
        <Popup
          message="Fill all fileds"
          onClose={handleClose}
          showPopup={popupMessageEmpty}
        />
      )}
      {popupMessageMail && (
        <Popup
          message="Enter valid mail"
          onClose={handleClose}
          showPopup={popupMessageMail}
        />
      )}
    </>
  );
}

export default ContactComponent;
