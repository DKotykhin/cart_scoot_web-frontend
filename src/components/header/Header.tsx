"use client";

import React from 'react';

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

    const pathname = usePathname();

    return (
        <nav className={styles.container}>
            <Link href={'/'}>
                <div className={styles.logo}>
                    <Image
                        src={'/logo.svg'}
                        alt={'logo'}
                        width={48}
                        height={48}
                        priority
                    />
                    <p>Cart</p>
                    <p>Scoot</p>
                </div>
            </Link>
            <div className={styles.navLinks}>
                {navLinks.map(item => (
                    <Link href={item.url} key={item.name}>
                        <span className={(pathname === item.url) ? styles.active : ''}>
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
            <div className={styles.navButtons}>
                {navButtons.map(item => (
                    <Link href={item.url} key={item.name}>
                        {item.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Header;