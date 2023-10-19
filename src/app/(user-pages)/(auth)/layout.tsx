import { ReactNode } from "react";

import { redirect } from "next/navigation";

import { getUserByToken } from 'apollo/services/getUserByToken';

export default async function AuthLayout({
    children,
}: {
    children: ReactNode
}) {
    const data = await getUserByToken();

    return data ? redirect('/') : <div>{children}</div>;
}