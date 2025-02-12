import { cn } from 'lib/utils';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Your Website Title',
    description: 'Your Website Description',
};

async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' className={cn('dark antialiased', inter.className)}>
            <body>
                <main>{children}</main>
            </body>
        </html>
    );
}

export default RootLayout;
