import type { Metadata } from 'next';

import ContactMap from './components/contactMap/ContactMap';
import ContactForm from './components/contactForm/ContactForm';

import { contactPageMetaData } from 'metadata/metadata';

import styles from './contact.module.scss';

export const metadata: Metadata = contactPageMetaData;

const ContactPage = () => {

    return (
        <section className={styles.container}>
            <ContactMap />
            <ContactForm />
        </section>
    );
};

export default ContactPage;