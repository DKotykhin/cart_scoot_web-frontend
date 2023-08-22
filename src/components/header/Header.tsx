"use client";

import React, { useState, useEffect } from 'react';

import { usePathname } from 'next/navigation';
import Image from "next/image";
import Link from 'next/link';

import styles from './header.module.scss';
import UserPanel from 'components/userPanel/UserPanel';
import LogoutCard from 'components/userPanel/logoutCard/LogoutCard';
import ChangePasswordCard from 'components/userPanel/changePasswordCard/ChangePasswordCard';

const navLinks = [
    {
        name: 'Home',
        url: '/',
    },
    {
        name: 'About us',
        url: '/about',
    },
    {
        name: 'Contact us',
        url: '/contact',
    },
];
const navButtons = [
    {
        name: 'Login',
        url: '/login',
    },
    {
        name: 'Register',
        url: '/register',
    },
];

const Header = () => {

    const [openUserPanel, setOpenUserPanel] = useState(false);
    const [openLogoutCard, setOpenLogoutCard] = useState(false);
    const [openChangePasswordCard, setOpenChangePasswordCard] = useState(false);

    const pathname = usePathname();

    const isLogin = true;

    const handleUserClick = () => setOpenUserPanel(prev => !prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeydown = (e: { code: string }) => {
        if (e.code === 'Escape') {
            if (openLogoutCard) {
                setOpenLogoutCard(false);
            } else if (openChangePasswordCard) {
                setOpenChangePasswordCard(false);
            } else setOpenUserPanel(false);
        };
    };
    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);

        return () => window.removeEventListener("keydown", handleKeydown);
    }, [handleKeydown]);

    const logoutModalClick = () => setOpenLogoutCard(true);

    const logoutCancelClick = () => setOpenLogoutCard(false);
    const logoutClick = () => setOpenLogoutCard(false);

    const changePasswordClick = () => setOpenChangePasswordCard(prev => !prev);

    return (
        <nav className={styles.container}>
            <Link href={'/'}>
                <div className={styles.logo}>
                    <Image
                        src={'/logo.svg'}
                        alt={'logo'}
                        width={48}
                        height={48}
                    />
                    <p>Cart<span>Scoot</span></p>
                </div>
            </Link>
            <div className={styles.navLinks}>
                {navLinks.map(item => (
                    <Link href={item.url} key={item.name}>
                        <span className={(pathname === item.url) ? `${styles.active} ${styles.active_2}` : ''}>
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
            {isLogin ?
                <div className={styles.authButtons}>
                    <div
                        className={styles.user_button}
                        onClick={handleUserClick}
                    >
                        <div className={styles.badge}>
                            1
                        </div>
                        <Image
                            src={'/icons/user-black.svg'}
                            alt={'user'}
                            width={24}
                            height={24}
                            className={styles.user_avatar}
                        />
                    </div>
                    <Link href={'/'}>
                        Book a Cart
                    </Link>
                </div>
                :
                <div className={styles.navButtons}>
                    {navButtons.map(item => (
                        <Link href={item.url} key={item.name}>
                            {item.name}
                        </Link>
                    ))}
                </div>
            }
            {openUserPanel &&
                <UserPanel
                    logoutModalClick={logoutModalClick}
                    changePasswordClick={changePasswordClick}
                />
            }
            {openLogoutCard &&
                <LogoutCard
                    logoutCancelClick={logoutCancelClick}
                    logoutClick={logoutClick}
                />
            }
            {openChangePasswordCard &&
                <ChangePasswordCard
                    changePasswordClick={changePasswordClick}
                />
            }
        </nav>
    );
};

export default Header;