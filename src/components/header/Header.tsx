"use client";

import React, { useState, useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';
import Image from "next/image";
import Link from 'next/link';

import Cookies from 'js-cookie';

import UserPanel from 'components/userPanel/UserPanel';
import LogoutCard from 'components/userPanel/logoutCard/LogoutCard';
import ChangePasswordCard from 'components/userPanel/changePasswordCard/ChangePasswordCard';

import { useUserStore } from 'stores/userStore';
import { navLinks } from 'constants/navLinks';
import { IUser } from 'types/userTypes';

import styles from './header.module.scss';
import AddMobilePhoneCard from 'components/userPanel/addMobilePhoneCard/AddMobilePhoneCard';

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

interface IHeader {
    user: IUser;
}

const Header: React.FC<IHeader> = ({ user }) => {

    const [openUserPanel, setOpenUserPanel] = useState(false);
    const [openLogoutCard, setOpenLogoutCard] = useState(false);
    const [openChangePasswordCard, setOpenChangePasswordCard] = useState(false);
    const [openAddMobileCard, setOpenAddMobileCard] = useState(false);

    const pathname = usePathname();
    const router = useRouter();
    const { userData, addUser, setUserEmpty } = useUserStore();

    useEffect(() => {
        if (user?._id) addUser(user);
    }, [addUser, user]);

    const handleUserClick = () => setOpenUserPanel(prev => !prev);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeydown = (e: { code: string }) => {
        if (e.code === 'Escape') {
            if (openLogoutCard) {
                setOpenLogoutCard(false);
            } else if (openChangePasswordCard) {
                setOpenChangePasswordCard(false);
            } else if (openAddMobileCard) {
                setOpenAddMobileCard(false);
            } else setOpenUserPanel(false);
        };
    };
    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);

        return () => window.removeEventListener("keydown", handleKeydown);
    }, [handleKeydown]);

    useEffect(() => {
        const offset = window.innerWidth - document.body.offsetWidth + 'px';
        if (openLogoutCard || openChangePasswordCard || openAddMobileCard) {
            document.body.style.overflowY = 'hidden';
            document.body.style.paddingRight = offset;
        } else {
            document.body.style.overflowY = 'unset';
            document.body.style.paddingRight = '0px';
        }

    }, [openChangePasswordCard, openLogoutCard, openAddMobileCard]);

    const logoutModalClick = () => {
        setOpenLogoutCard(true);
        setOpenUserPanel(false);
    };
    const logoutCancelClick = () => setOpenLogoutCard(false);
    const logoutClick = () => {
        setOpenLogoutCard(false);
        setOpenUserPanel(false);
        Cookies.remove('token');
        router.push('/login');
        setUserEmpty();
    };

    const changePasswordClick = () => setOpenChangePasswordCard(prev => !prev);
    const addMobileClick = () => setOpenAddMobileCard(prev => !prev);
    const handleClose = () => setOpenAddMobileCard(false);
    const handleCloseClick = () => setOpenUserPanel(false);

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
            {userData?._id ?
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
                    user={userData}
                    handleCloseClick={handleCloseClick}
                    addMobileClick={addMobileClick}
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
            {openAddMobileCard &&
                <AddMobilePhoneCard
                    handleClose={handleClose}
                />
            }
        </nav>
    );
};

export default Header;