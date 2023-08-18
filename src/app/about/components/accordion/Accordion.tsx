"use client";

import React, { useState } from 'react';

import Image from "next/image";

import styles from './accordion.module.scss';

const Accordion = () => {

    const [open_1, setOpen_1] = useState(false);
    const [open_2, setOpen_2] = useState(false);
    const [open_3, setOpen_3] = useState(false);
    const [open_4, setOpen_4] = useState(false);

    const handleClick_1 = () => setOpen_1(prev => !prev);
    const handleClick_2 = () => setOpen_2(prev => !prev);
    const handleClick_3 = () => setOpen_3(prev => !prev);
    const handleClick_4 = () => setOpen_4(prev => !prev);

    return (
        <div className={styles.container}>
            <div className={styles.text_box}>
                <h3 className='block-title'>FAQ</h3>
                <p className='block-subtitle'>
                    Find Answers to Common Questions and Unravel the Mysteries of Car Scoot&apos;s Rental Service
                </p>
            </div>
            <div className={styles.accordion_box}>
                <div className={styles.accordion_item}>
                    <p className={styles.accordion_title}>
                        How do I book a golf cart on Car Scoot?
                    </p>
                    <Image
                        src={'/icons/accordion-button.svg'}
                        alt={'button'}
                        width={56}
                        height={56}
                        onClick={handleClick_1}
                    />
                </div>
                {open_1 &&
                    <p className={styles.accordion_description}>
                        At Car Scoot, safety is our top priority. We ensure that all golf carts available for rent meet stringent safety standards. Our partners regularly inspect and maintain their carts to guarantee their reliability. Additionally, we recommend wearing seat belts while driving and adhering to all golf course safety guidelines.
                    </p>
                }
            </div>
            <div className={styles.accordion_box}>
                <div className={styles.accordion_item}>
                    <p className={styles.accordion_title}>
                        Can I cancel or modify my golf cart booking?
                    </p>
                    <Image
                        src={'/icons/accordion-button.svg'}
                        alt={'button'}
                        width={56}
                        height={56}
                        onClick={handleClick_2}
                    />
                </div>
                {open_2 &&
                    <p className={styles.accordion_description}>
                        At Car Scoot, safety is our top priority. We ensure that all golf carts available for rent meet stringent safety standards. Our partners regularly inspect and maintain their carts to guarantee their reliability. Additionally, we recommend wearing seat belts while driving and adhering to all golf course safety guidelines.
                    </p>
                }
            </div>
            <div className={styles.accordion_box}>
                <div className={styles.accordion_item}>
                    <p className={styles.accordion_title}>
                        What safety measures are implemented for the golf carts?
                    </p>
                    <Image
                        src={'/icons/accordion-button.svg'}
                        alt={'button'}
                        width={56}
                        height={56}
                        onClick={handleClick_3}
                    />
                </div>
                {open_3 &&
                    <p className={styles.accordion_description}>
                        At Car Scoot, safety is our top priority. We ensure that all golf carts available for rent meet stringent safety standards. Our partners regularly inspect and maintain their carts to guarantee their reliability. Additionally, we recommend wearing seat belts while driving and adhering to all golf course safety guidelines.
                    </p>
                }
            </div>
            <div className={styles.accordion_box}>
                <div className={styles.accordion_item}>
                    <p className={styles.accordion_title}>
                        Are there any age restrictions for renting a golf cart?
                    </p>
                    <Image
                        src={'/icons/accordion-button.svg'}
                        alt={'button'}
                        width={56}
                        height={56}
                        onClick={handleClick_4}
                    />
                </div>
                {open_4 &&
                    <p className={styles.accordion_description}>
                        At Car Scoot, safety is our top priority. We ensure that all golf carts available for rent meet stringent safety standards. Our partners regularly inspect and maintain their carts to guarantee their reliability. Additionally, we recommend wearing seat belts while driving and adhering to all golf course safety guidelines.
                    </p>
                }
            </div>
        </div>
    );
};

export default Accordion;