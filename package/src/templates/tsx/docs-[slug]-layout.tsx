// @ts-nocheck

import Footer from 'doxium/footer';
import Navbar from 'doxium/navbar';
import Sidebar from 'doxium/sidebar-filetree';
import Toaster from 'doxium/toaster';
import { getDocsTree } from 'lib/lib';

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
