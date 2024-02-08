import React from 'react';

import styles from './policy.module.scss';
import Link from 'next/link';

export const Policy = () => {
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Privacy Notice for CartScoot.com</h1>
                <p className={styles.subtitle}>Last Updated: 2/5/2024</p>
                <p>
                    Thank you for choosing CartScoot.com. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Notice outlines how we collect, use, disclose, and protect your data when you use our ride-sharing services through our website.
                </p>
                <ol>
                    <li>
                        <p className={styles.list_title}>
                            Information We Collect
                        </p>
                        <p className={styles.list_text}>
                            We collect the following types of information:
                        </p>
                        <ul>
                            <li>
                                Personal Information:
                                <p>
                                    <span>User Profile Information: </span>
                                    Your name, contact details, profile picture, and other information you provide when creating an account.
                                </p>
                                <p>
                                    <span>Location Data: </span>
                                    Your current location and destination to facilitate the ride-sharing service.
                                </p>
                            </li>
                            <li>
                                Usage Information:
                                <p>
                                    <span>Device Information: </span>
                                    Information about your device, including the type, operating system, unique device identifiers and device location.
                                </p>
                                <p>
                                    <span>Log Data: </span>
                                    Details about your use of our services, such as the date and time of each ride, routes taken, and interactions with the app.
                                </p>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p className={styles.list_title}>
                            How We Use Your Information
                        </p>
                        <p className={styles.list_text}>
                            We use your information for the following purposes:
                        </p>
                        <p>
                            <span>Providing Services: </span>
                            To facilitate and process ride requests, manage user accounts, and improve our services.
                        </p>
                        <p>
                            <span>Communication: </span>
                            Sending service-related notifications, updates, and promotional messages.
                        </p>
                        <p>
                            <span>Safety and Security: </span>
                            Verifying accounts, monitoring for fraudulent activities, and ensuring the safety of our users.
                        </p>
                        <p>
                            <span>Improving Services: </span>
                            Analyzing user behavior, conducting research, and enhancing our website and mobile application.
                        </p>
                    </li>
                    <li>
                        <p className={styles.list_title}>
                            Information Sharing
                        </p>
                        <p className={styles.list_text}>
                            We may share your information in the following circumstances:
                        </p>
                        <p>
                            <span>Service Providers: </span>
                            Sharing data with third-party service providers who assist us in delivering our services.
                        </p>
                        <p>
                            <span>Legal Compliance: </span>
                            Complying with legal obligations, law enforcement requests, and protecting our rights.
                        </p>
                        <p>
                            <span>Anonymized Data: </span>
                            Aggregated and anonymized data may be shared for research and analytical purposes.
                        </p>
                    </li>
                    <li>
                        <p className={styles.list_title}>
                            Data Security
                        </p>
                        <p className={styles.list_text}>
                            We take reasonable steps to protect your personal information from unauthorized access, disclosure, alteration, and destruction. We use encryption, secure socket layer technology (SSL), and other industry-standard measures
                        </p>
                    </li>
                    <li>
                        <p className={styles.list_title}>
                            Your Choices
                        </p>
                        <p className={styles.list_text}>
                            You have the right to:
                        </p>
                        <p>
                            <span>Access and Update: </span>
                            Review and update your account information.
                        </p>
                        <p>
                            <span>Opt-Out: </span>
                            Opt-out of promotional communications.
                        </p>
                        <p>
                            <span>Deactivate Account: </span>
                            Deactivate your account by contacting our support team.
                        </p>
                    </li>
                    <li>
                        <p className={styles.list_title}>
                            Cookie Disclosure
                        </p>
                        <p className={styles.list_text}>
                            Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. By continuing to use our website, you consent to the use of cookies in accordance with this disclosure. We utilize both first-party and third-party cookies for various purposes, including but not limited to, essential website functionality, performance and analytics, advertising, and social media integration. You can manage your cookie preferences through your browser settings. Please note that disabling cookies may affect certain features of our website.
                        </p>
                    </li>
                    <li>
                        <p className={styles.list_title}>
                            Contact Us
                        </p>
                        <p className={styles.list_text}>
                            If you have any questions or concerns about our Privacy Notice, please contact us at <Link href={'/contact'} className={styles.link}>contact us page.</Link>
                        </p>
                        <p className={styles.list_text}>
                            By using our services, you agree to the terms outlined in this Privacy Notice. Thank you for trusting CartScoot.com.
                        </p>
                    </li>
                    <li>
                        <p className={styles.list_title}>
                            Changes to this Privacy Notice
                        </p>
                        <p className={styles.list_text}>
                            We may update this Privacy Notice periodically. Please review it regularly for any changes. Your continued use of our services after changes are posted implies your acceptance of those changes.
                        </p>
                    </li>
                </ol>
            </div>
        </section>
    );
};
