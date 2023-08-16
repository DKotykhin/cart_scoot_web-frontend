import React from 'react';

import ContactMap from './components/contactMap/ContactMap';
import ContactForm from './components/contactForm/ContactForm';

import styles from './contact.module.scss';

const ContactPage = () => {

    return (
        <div className={styles.container}>
            <ContactMap />
            <ContactForm />
        </div>
    );
};

export default ContactPage;