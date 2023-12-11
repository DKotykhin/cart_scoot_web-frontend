import React from 'react';

import { accordionData } from './accordionData';
import AccordionItem from './AccordionItem';

import styles from './accordion.module.scss';

const Accordion = () => {

    return (
        <section className={styles.container}>
            <div className={styles.text_box}>
                <h3 className='block-title'>FAQ</h3>
                <p className='block-subtitle'>
                    Find Answers to Common Questions and Unravel the Mysteries of Cart Scoot&apos;s Rental Service
                </p>
            </div>
            {accordionData.map(item => (
                <article key={item.id} className={styles.accordion_box}>
                    <AccordionItem
                        title={item.title}
                        description={item.description}
                    />
                </article>
            ))}
        </section>
    );
};

export default Accordion;