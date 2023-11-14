"use client";

import React, { useEffect, useState } from 'react';

import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ChangePasswordCard from 'components/userPanel/changePasswordCard/ChangePasswordCard';

import styles from './mobileSideBar.module.scss';

interface ISideBar {
    navLinks: {
        name: string,
        url: string,
        icon: string,
        activeIcon: string,
    }[]
}

const MobileSideBar: React.FC<ISideBar> = ({ navLinks }) => {

    const [openChangePasswordCard, setOpenChangePasswordCard] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const offset = window.innerWidth - document.body.offsetWidth + 'px';
        if (openChangePasswordCard) {
            document.body.style.overflowY = 'hidden';
            document.body.style.paddingRight = offset;
        } else {
            document.body.style.overflowY = 'unset';
            document.body.style.paddingRight = '0px';
        }

    }, [openChangePasswordCard]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.navLinks}>
                    {navLinks.map(item => (
                        <Link href={item.url} key={item.name}>
                            <Image
                                src={`/${pathname.split('/')[1]}` === item.url ? item.activeIcon : item.icon}
                                alt={'icon'}
                                width={24}
                                height={24}
                            />
                            <span className={(`/${pathname.split('/')[1]}` === item.url) ? styles.active : ''}>
                                {item.name}
                            </span>
                        </Link>
                    ))}
                    <div
                        className={styles.change_password}
                        onClick={() => setOpenChangePasswordCard(true)}
                    >
                        <Image
                            src={'/icons/key-black.svg'}
                            alt={'key'}
                            width={24}
                            height={24}
                        />
                        <span>Password</span>
                    </div>
                </div>
            </div>
            {openChangePasswordCard &&
                <ChangePasswordCard
                    changePasswordClick={() => setOpenChangePasswordCard(false)}
                    openChangePasswordClick={() => setOpenChangePasswordCard(false)}
                />
            }
        </>
    );
};

export default MobileSideBar;