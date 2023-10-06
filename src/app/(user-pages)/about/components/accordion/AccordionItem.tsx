"use client";

import React, { useState } from 'react';

import Image from "next/image";

import styles from './accordion.module.scss';

interface IAccordionItem {
    title: string,
    description: string,
}

const AccordionItem: React.FC<IAccordionItem> = ({ title, description }) => {

    const [open, setOpen] = useState(false);

    const handleClick = () => setOpen(prev => !prev);

    return (
        <>
            <div className={styles.accordion_item}>
                <p className={styles.accordion_title}>
                    {title}
                </p>
                <Image
                    src={'/icons/accordion-button.svg'}
                    alt={'button'}
                    width={56}
                    height={56}
                    onClick={handleClick}
                />
            </div>
            {open &&
                <p className={styles.accordion_description}>
                    {description}
                </p>
            }
        </>
    );
};

export default AccordionItem;