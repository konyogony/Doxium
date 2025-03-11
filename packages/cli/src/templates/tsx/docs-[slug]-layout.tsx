// @ts-nocheck

import Footer from 'doxium/components/footer';
import Navbar from 'doxium/components/navbar';
import Sidebar from 'doxium/components/sidebar-filetree';
import Toaster from 'doxium/components/toaster';
import { getDocsTree } from 'doxium/lib';

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const tree = await getDocsTree();
    return (
        <>
            <Navbar tree={tree} />
            <div className='relative flex min-h-screen flex-row justify-center gap-8 pb-2 pt-16 lg:pt-24'>
                <Sidebar tree={tree} />
                {children}
            </div>
            <Footer />
            <Toaster />
        </>
    );
};

export default Layout;
