import { ReactNode } from "react";

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer, Flip } from 'react-toastify';

import { generalMetaData } from 'metadata/metadata';
import Header from 'components/header/Header';

import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import './globals.scss';
import ApolloProvider from "apollo/ApolloProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = generalMetaData;

export default function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <>
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
                            <Header />
                        </header>
                        <main>
                            {children}
                        </main>
                    </ApolloProvider>
                </body>
            </html>
        </>
    );
}
