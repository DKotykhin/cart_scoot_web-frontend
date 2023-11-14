"use client";

import React, { useEffect, useState } from 'react';

import Image from "next/image";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

import LogoutCard from 'components/userPanel/logoutCard/LogoutCard';
import { useUserStore } from 'stores/userStore';
import { userTypes } from 'types/userTypes';

import styles from './sideBar.module.scss';

interface ISideBar {
    navLinks: {
        name: string,
        url: string,
        icon: string,
        activeIcon: string,
    }[]
}

const SideBar: React.FC<ISideBar> = ({ navLinks }) => {

    const [openLogoutCard, setOpenLogoutCard] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { userData, setUserEmpty } = useUserStore();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeydown = (e: { code: string }) => {
        if (e.code === 'Escape') {
            setOpenLogoutCard(false);
        };
    };
    useEffect(() => {
        window.addEventListener("keydown", handleKeydown);

        return () => window.removeEventListener("keydown", handleKeydown);
    }, [handleKeydown]);

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

    useEffect(() => {
        const width = window.innerWidth;
        if ((width < 1300) && userData?.role === userTypes.admin) {
            toast.warn('Please use a desktop for an access', {
                bodyClassName: "wrong-toast",
                icon: <Image
                    src={'/icons/wrong-code.svg'}
                    alt='icon'
                    width={56}
                    height={56}
                />
            });
        }
    }, [userData?.role]);

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
                            {`/${pathname.split('/')[1]}` === item.url ?
                                <Image
                                    src={'/icons/navbarLine-green.svg'}
                                    alt={'line'}
                                    width={8}
                                    height={56}
                                />
                                :
                                <Image
                                    src={'/icons/navbarLine-white.svg'}
                                    alt={'line'}
                                    width={8}
                                    height={56}
                                />
                            }
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
                </div>
                <div
                    className={styles.user_logout}
                    onClick={() => setOpenLogoutCard(true)}
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
            {openLogoutCard &&
                <LogoutCard
                    logoutCancelClick={() => setOpenLogoutCard(false)}
                    logoutClick={logoutClick}
                />
            }
        </>
    );
};

export default SideBar;