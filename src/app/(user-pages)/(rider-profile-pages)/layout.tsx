import { ReactNode } from "react";

import { redirect } from "next/navigation";

import { getUserByToken } from 'apollo/services/getUserByToken';
import { userTypes } from "types/userTypes";

export default async function AuthLayout({
    children,
}: {
    children: ReactNode
}) {
    const data = await getUserByToken();

    return data?.getUserByToken.role === userTypes.rider ?
        { children }
        : redirect('/');
}