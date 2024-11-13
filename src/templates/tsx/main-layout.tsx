// @ts-nocheck

import DocsBreadcrumbs from '$COMPONENTS-ALIAS/docs-breadcrumbs';
import DocsNav from '$COMPONENTS-ALIAS/docs-nav';
import SecondarySidebar from '$COMPONENTS-ALIAS/docs-secondary-sidebar';
import Sidebar from '$COMPONENTS-ALIAS/docs-sidebar';
import DocsToaster from '$COMPONENTS-ALIAS/docs-toaster';
import Navbar from '$COMPONENTS-ALIAS/navbar';
import { getJsonData } from '$LIB-ALIAS/get-json-data';
import { getStructureInstance } from '$LIB-ALIAS/structure';
import { cn } from '$LIB-ALIAS/utils';
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
    const { repo } = await getJsonData();
    const structure = await getStructureInstance();
    return (
        <html lang='en' className={cn('dark antialiased', inter.className)}>
            <body className='relative '>
                <Navbar structure={structure} />
                <main>
                    <div className='relative flex flex-row justify-center space-x-8 py-24'>
                        <Sidebar structure={structure} />
                        <div className='prose prose-$COLOR prose-invert prose-p:flex prose-p:items-center prose-p:gap-4 prose-p:my-4 prose-headings:my-2 prose-headings:mt-4 prose-headings:w-full prose-headings:border-b prose-headings:border-white/15 prose-ul:mb-4 prose-ol:mb-4 prose-headings:pb-1.5 prose-a:decoration-dotted hover:prose-a:text-$ACCENT-COLOR-500 prose-ol:my-0 prose-ul:my-0 prose-hr:border-white/20 flex h-fit w-screen flex-shrink-0 flex-col items-start lg:max-w-[40%] lg:px-0'>
                            <DocsBreadcrumbs />
                            {children}
                            <div className='mb-4 mt-8 h-[1px] w-full bg-white/15' />
                            <DocsNav structure={structure} />
                        </div>
                        <SecondarySidebar repoString={repo} />
                    </div>
                    <DocsToaster />
                </main>
            </body>
        </html>
    );
};

export default RootLayout;
