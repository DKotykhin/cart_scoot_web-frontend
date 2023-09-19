import { ReactNode } from "react";

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer, Flip } from 'react-toastify';

import { generalMetaData } from 'metadata/metadata';
import Header from 'components/header/Header';

import ApolloProvider from "apollo/ApolloProvider";
import { GET_USER_BY_TOKEN } from "apollo/queries/user";
import { getClient } from "apollo/getClient";

import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import "mapbox-gl/dist/mapbox-gl.css";
import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = generalMetaData;

const getUserByToken = async () => {
    try {
        const { data } = await getClient().query({
            query: GET_USER_BY_TOKEN
        });
        return data;
    } catch (error: any) {
        console.log(error.message);
    }
};

export default async function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    const data = await getUserByToken();

    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body className={inter.className}>
                <div className='ellipse'></div>
                <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar
                    transition={Flip}
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <ApolloProvider>
                    <header>
                        <Header user={data?.getUserByToken} />
                    </header>
                    <main>
                        {children}
                    </main>
                </ApolloProvider>
            </body>
        </html>
    );
}
