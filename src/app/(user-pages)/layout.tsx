import { ReactNode } from "react";

import Header from 'components/header/Header';

import { getUserByToken } from "apollo/services/getUserByToken";

export default async function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    const data = await getUserByToken();

    return (
        <>
            <header>
                <Header user={data?.getUserByToken} />
            </header>
            <main>
                {children}
            </main>
        </>
    );
}