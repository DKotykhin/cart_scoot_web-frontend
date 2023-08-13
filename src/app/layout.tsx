import { ReactNode } from "react";

import Image from 'next/image';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { generalMetaData } from 'metadata/metadata';
import Header from 'components/header/Header';

import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = generalMetaData;

export default function RootLayout({
    children,
}: {
    children: ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body className={inter.className}>
                <Image
                    src={'/background.svg'}
                    alt={'background'}
                    width={1440}
                    height={806}
                    priority
                />
                <div className='ellipse'></div>
                <header>
                    <Header />
                </header>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
