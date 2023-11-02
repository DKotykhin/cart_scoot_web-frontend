import { ReactNode } from "react";

import { redirect } from "next/navigation";

import SideBar from "components/sideBar/SideBar";
import MobileSideBar from "./components/mobileSideBar/MobileSideBar";

import { getUserByToken } from 'apollo/services/getUserByToken';
import { driverNavLinks } from "constants/navLinks";

import { userTypes } from "types/userTypes";

import styles from './driver-pages.module.scss';

export default async function AuthLayout({
    children,
}: {
    children: ReactNode
}) {
    const data = await getUserByToken();

    return data?.getUserByToken.role === userTypes.driver ?
        <div className={styles.driver_pages_container}>
            <SideBar navLinks={driverNavLinks} />
            <div className={styles.mobile_side_bar}>
                <MobileSideBar navLinks={driverNavLinks} />
            </div>
            {children}
        </div>
        : redirect('/login');
}