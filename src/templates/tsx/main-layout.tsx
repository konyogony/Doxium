// @ts-nocheck

import { cn } from '@/lib/utils';
import { Cmdk } from '$COMPONENTS-ALIAS/cmdk';
import { DocsBreadcrumbs } from '$COMPONENTS-ALIAS/docs-breadcrumbs';
import { DocsNav } from '$COMPONENTS-ALIAS/docs-nav';
import { SecondarySidebar } from '$COMPONENTS-ALIAS/docs-secondary-sidebar';
import { Sidebar } from '$COMPONENTS-ALIAS/docs-sidebar';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { BsDiscord, BsGithub } from 'react-icons/bs';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Doxium app',
    description: 'New doxium app generated by create-doxium-app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className={cn('dark antialiased', inter.className)}>
            <body className='relative '>
                <nav className='bg-$COLOR-950/90 text-$COLOR-300 fixed inset-0 z-50 flex h-fit w-full flex-row items-center gap-8 border-b border-white/5 px-[20vw] py-4 text-sm font-normal decoration-dotted backdrop-blur-lg'>
                    <Link href='/' className='text-$COLOR-100 hover:text-$COLOR-50 text-xl font-bold'>
                        Doxium
                    </Link>
                    <Cmdk />
                    <div className='hidden flex-row items-center gap-2 lg:flex'>
                        <a
                            className='hover:bg-$COLOR-900 flex items-center justify-center rounded-sm p-2'
                            href='https://github.com/konyogony'
                            rel='noopener noreferrer'
                            target='_blank'
                        >
                            <BsGithub size={20} />
                        </a>
                        <a
                            className='hover:bg-$COLOR-900 flex items-center justify-center rounded-sm p-2'
                            href='https://discord.gg/UW4CpNeq'
                            rel='noopener noreferrer'
                            target='_blank'
                        >
                            <BsDiscord size={20} />
                        </a>
                    </div>
                </nav>
                <main>
                    <div className='relative flex flex-row justify-center space-x-8 py-24'>
                        <Sidebar />
                        <div className='prose prose-$COLOR prose-invert prose-p:my-4 prose-headings:my-2 prose-headings:mt-4 prose-headings:w-full prose-headings:border-b prose-headings:border-white/15 prose-headings:pb-1.5 prose-a:decoration-dotted hover:prose-a:text-blue-500 prose-ol:my-0 prose-ul:my-0 prose-hr:border-white/20 flex h-fit w-screen flex-shrink-0 flex-col items-start lg:max-w-[40%] lg:px-0'>
                            <DocsBreadcrumbs />
                            {children}
                            <div className='mb-4 mt-8 h-[1px] w-full bg-white/15' />
                            <DocsNav />
                        </div>
                        <SecondarySidebar />
                    </div>
                    <Toaster richColors theme='dark' />
                </main>
            </body>
        </html>
    );
}
