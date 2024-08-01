import React from 'react';
import styles from './ContactInfo.module.css'

const ContactInfo = () => {
  return (
    <div className={styles.content}>
      <h3>Address:{process.env.REACT_APP_COMPANY_ADDRESS1}</h3>
      <h3>{process.env.REACT_APP_COMPANY_ADDRESS2}</h3>
      <a className={styles.phoneNumber} href={`tel:+1${process.env.REACT_APP_COMPANY_PHONE}`}>
        Phone: +1 {process.env.REACT_APP_COMPANY_PHONE}
      </a>
    </div>
  );
}

export default ContactInfo;
