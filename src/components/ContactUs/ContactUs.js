import React from 'react';
import styles from './ContactUs.module.css'; 

const ContactUs = () => {
  return (
    <div className={styles.contactUsContainer} id="contact">
      <h2 className={styles.contactUsHeading}>Contact Us</h2>
      <form className={styles.contactUsForm}>
        <input className={styles.contactUsInput} type="text" placeholder="Your Name" required />
        <input className={styles.contactUsInput} type="email" placeholder="Your Email" required />
        <textarea className={styles.contactUsTextArea} rows="5" placeholder="Your Message" required />
        <button className={styles.contactUsButton} type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactUs;
