// @ts-nocheck

import Breadcrumbs from 'doxium/breadcrumbs';
import Footer from 'doxium/footer';
import NavButtons from 'doxium/nav-buttons';
import Navbar from 'doxium/navbar';
import SecondarySidebar from 'doxium/secondary-sidebar';
import Sidebar from 'doxium/sidebar-filetree';
import Toaster from 'doxium/toaster';
import { getJsonData } from 'lib/get-json-data';
import { getStructureInstance } from 'lib/structure';
import { cn } from 'lib/utils';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Doxium app',
    description: 'New doxium app generated by create-doxium-app',
};

const RootLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const { socials, separate } = await getJsonData();
    const structure = await getStructureInstance();
    return (
        <html lang='en' className={cn('dark antialiased', inter.className)}>
            <body className='relative '>
                <main>
                    <Navbar structure={structure} />
                    <div className='relative flex flex-row min-h-screen justify-center gap-8 pt-16 pb-2 lg:pt-24'>
                        <Sidebar structure={structure} separate={separate} />
                        <div className='prose prose-$COLOR prose-invert flex h-fit w-screen flex-shrink-0 flex-col items-start px-6 prose-headings:my-2 prose-headings:w-full prose-headings:border-white/15 prose-h1:my-4 prose-h1:mt-4 prose-h1:border-b prose-h1:pb-2 prose-p:my-2 prose-a:decoration-dotted hover:prose-a:text-$ACCENT-COLOR-600 prose-ol:my-0 prose-ol:mb-4 prose-ul:my-0 prose-ul:mb-4 prose-li:my-0.5 prose-hr:border-white/20 lg:max-w-[40%] lg:px-0'>
                            <Breadcrumbs />
                            {children}
                            <div className='mb-4 mt-8 h-[1px] w-full bg-white/15' />
                            <NavButtons structure={structure} />
                        </div>
                        <SecondarySidebar socials={socials} />
                    </div>
                    <Footer />
                    <Toaster />
                </main>
            </body>
        </html>
    );
};

export default RootLayout;
