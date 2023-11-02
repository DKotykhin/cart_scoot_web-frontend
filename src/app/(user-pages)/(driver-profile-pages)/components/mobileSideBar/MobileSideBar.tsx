"use client";

import React, { useEffect, useState } from 'react';

import Image from "next/image";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import Cookies from 'js-cookie';

import LogoutCard from 'components/userPanel/logoutCard/LogoutCard';
import { useUserStore } from 'stores/userStore';

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

    const [openLogoutCard, setOpenLogoutCard] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { setUserEmpty } = useUserStore();

    useEffect(() => {
        const offset = window.innerWidth - document.body.offsetWidth + 'px';
        if (openLogoutCard) {
            document.body.style.overflowY = 'hidden';
            document.body.style.paddingRight = offset;
        } else {
            document.body.style.overflowY = 'unset';
            document.body.style.paddingRight = '0px';
        }

    }, [openLogoutCard]);

    const logoutOpenClick = () => setOpenLogoutCard(true);
    const logoutCancelClick = () => setOpenLogoutCard(false);
    const logoutClick = () => {
        setOpenLogoutCard(false);
        Cookies.remove('token');
        router.push('/login');
        setUserEmpty();
    };

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
                        className={styles.user_logout}
                        onClick={logoutOpenClick}
                    >
                        <Image
                            src={'/icons/signOut.svg'}
                            alt={'out'}
                            width={24}
                            height={24}
                        />
                        <span>Logout</span>
                    </div>
                </div>
            </div>
            {openLogoutCard &&
                <LogoutCard
                    logoutCancelClick={logoutCancelClick}
                    logoutClick={logoutClick}
                />
            }
        </>
    );
};

export default MobileSideBar;