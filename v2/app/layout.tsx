import { cn } from 'lib/utils';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import config from 'config';
import Footer from 'doxium/footer';
import Navbar from 'doxium/navbar';
import Sidebar from 'doxium/sidebar-filetree';
import Toaster from 'doxium/toaster';
import { getDocsTree } from 'lib/lib';

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
    const tree = await getDocsTree();
    return (
        <html lang='en' className={cn('antialiased', inter.className, config.style.colorScheme)}>
            <body className='relative'>
                <main>
                    <Navbar tree={tree} />
                    <div className='relative flex min-h-screen flex-row justify-center gap-8 pb-2 pt-16 lg:pt-24'>
                        <Sidebar tree={tree} />
                        {children}
                    </div>
                    <Footer />
                    <Toaster />
                </main>
            </body>
        </html>
    );
};

export default RootLayout;
