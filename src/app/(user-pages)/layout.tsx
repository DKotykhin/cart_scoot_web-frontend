import { ReactNode } from "react";
import { redirect } from "next/navigation";
import Header from 'components/header/Header';

import { getUserByToken } from "apollo/services/getUserByToken";
import { userTypes } from "types/userTypes";

export default async function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    const data = await getUserByToken();

    return data?.getUserByToken.role === userTypes.admin ? redirect('/admin-dashboard') :
        <>
            <header>
                <Header user={data?.getUserByToken} />
            </header>
            <main>
                {children}
            </main>
        </>
        ;
}