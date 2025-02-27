// @ts-nocheck

import { cn } from '@doxium/ui';
import config from 'config';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const colorScheme = config.style.colorScheme;

export const metadata: Metadata = {
    title: 'Doxium app',
    description: 'New doxium app generated by create-doxium-app',
};

const RootLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang='en' className={cn('antialiased', inter.className, colorScheme === 'dark' ? 'dark' : 'light')}>
            <body className='relative'>
                <main>{children}</main>
            </body>
        </html>
    );
};

export default RootLayout;
