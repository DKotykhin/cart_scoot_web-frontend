import React from 'react';

import Image from "next/image";

import styles from './contactMap.module.scss';

const ContactMap = () => {
    return (
        <div className={styles.map}>            
            <div className={styles.contacts}>
                <h2 className='block-title'>
                    Get in touch with our team
                </h2>
                <h4 className='block-subtitle'>
                    Reach Out to Us for Inquiries, Reservations, and More
                </h4>
                <p>
                    <Image
                        src={'/icons/phone.svg'}
                        alt={'phone'}
                        width={24}
                        height={24}
                    />
                    <a href="tel:159606360691">+ 1 5960 6360 691</a>
                </p>
                <p>
                    <Image
                        src={'/icons/envelope.svg'}
                        alt={'envelope'}
                        width={24}
                        height={24}
                    />
                    <a href="mailto:info@CartScoot.com">info@CartScoot.com</a>
                </p>
                <p>
                    <Image
                        src={'/icons/mapPin.svg'}
                        alt={'mapPin'}
                        width={24}
                        height={24}
                    />
                    <span>775 Rolling Green Rd.</span>
                </p>
            </div>
        </div>
    );
};

export default ContactMap;