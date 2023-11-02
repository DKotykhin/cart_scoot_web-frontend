import { ReactNode } from "react";

import { redirect } from "next/navigation";

import { getUserByToken } from 'apollo/services/getUserByToken';
import { driverNavLinks } from "constants/navLinks";
import SideBar from "components/sideBar/SideBar";

import { userTypes } from "types/userTypes";

export default async function AuthLayout({
    children,
}: {
    children: ReactNode
}) {
    const data = await getUserByToken();

    if (data?.getUserByToken.role === userTypes.driver)
        return (
            <div className="driver-pages-container">
                <SideBar navLinks={driverNavLinks} />
                {children}
            </div>
        );
    else redirect('/login');
}