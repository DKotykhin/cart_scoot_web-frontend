"use client";

import React, { useState, useEffect } from 'react';

import { usePathname } from 'next/navigation';
import Image from "next/image";
import Link from 'next/link';

import styles from './header.module.scss';

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

    const [openUserMenu, setOpenUserMenu] = useState(false);
    const [openLogoutMenu, setOpenLogoutMenu] = useState(false);

    const pathname = usePathname();

    const isLogin = true;

    const handleUserClick = () => setOpenUserMenu(prev => !prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeydown = (e: { code: string }) => {
        if (e.code === 'Escape') {
            if (openLogoutMenu) {
                setOpenLogoutMenu(false);
            } else setOpenUserMenu(false);
        };
    };
    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);

        return () => window.removeEventListener("keydown", handleKeydown);
    }, [handleKeydown]);

    const logoutModalClick = () => setOpenLogoutMenu(true);

    const logoutCancelClick = () => setOpenLogoutMenu(false);
    const logoutClick = () => setOpenLogoutMenu(false);

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
            {openUserMenu &&
                <div className={styles.user_panel}>
                    <Image
                        src={'/avatars/John.svg'}
                        alt={'avatar'}
                        width={56}
                        height={56}
                        className={styles.user_logo}
                    />
                    <p className={styles.user_title}>Jimmy Dalton</p>
                    <p className={styles.user_subtitle}>Jimmy@gmail.com</p>
                    <div className={styles.user_list}>
                        <div className={styles.list_item}>
                            <span>Trips & Requests</span>
                            <Image
                                src={'/icons/caretRight.svg'}
                                alt={'right'}
                                width={24}
                                height={24}
                            />
                        </div>
                        <div className={styles.list_item}>
                            <span>Notification</span>
                            <div className={styles.badge_box}>
                                <span className={styles.list_badge}>
                                    1
                                </span>
                                <Image
                                    src={'/icons/caretRight.svg'}
                                    alt={'right'}
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </div>
                        <div className={styles.list_item}>
                            <span>Change Password</span>
                            <Image
                                src={'/icons/caretRight.svg'}
                                alt={'right'}
                                width={24}
                                height={24}
                            />
                        </div>
                    </div>
                    <div
                        className={styles.user_logout}
                    >
                        <Image
                            src={'/icons/signOut.svg'}
                            alt={'out'}
                            width={24}
                            height={24}
                        />
                        <span onClick={logoutModalClick}>Logout</span>
                    </div>
                </div>
            }
            {openLogoutMenu &&
                <>
                    <div className={styles.logout_background}></div>
                    <div className={styles.logout_menu}>
                        <Image
                            src={'/avatars/logoutAvatar.svg'}
                            alt={'logout'}
                            width={120}
                            height={120}
                            className={styles.logout_avatar}
                        />
                        <p className={styles.logout_title}>Logout</p>
                        <p className={styles.logout_subtitle}>Are you sure to logout?</p>
                        <div className='line'></div>
                        <div className={styles.logout_buttons}>
                            <button
                                onClick={logoutCancelClick}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={logoutClick}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </>
            }
        </nav>
    );
};

export default Header;