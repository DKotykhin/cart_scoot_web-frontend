import { ReactNode } from "react";

import { redirect } from "next/navigation";

import { getUserByToken } from 'apollo/services/getUserByToken';

import SideBar from "components/sideBar/SideBar";

import { adminNavLinks } from "constants/navLinks";
import { userTypes } from "types/userTypes";

export default async function AdminLayout({
    children,
}: {
    children: ReactNode
}) {
    const data = await getUserByToken();

    return data?.getUserByToken.role === userTypes.admin ?
        <div className="admin-pages-container">
            <SideBar navLinks={adminNavLinks} />
            {children}
        </div>
        : redirect('/login');
}