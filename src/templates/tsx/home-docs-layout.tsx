// @ts-nocheck

import { DocsBreadcrumbs } from '$COMPONENTS-ALIAS/docs-breadcrumbs';
import { DocsNav } from '$COMPONENTS-ALIAS/docs-nav';
import { SecondarySidebar } from '$COMPONENTS-ALIAS/docs-secondary-sidebar';
import { Sidebar } from '$COMPONENTS-ALIAS/docs-sidebar';

interface DocsLayoutProps {
    children: React.ReactNode;
}

const DocsLayout = ({ children }: DocsLayoutProps) => {
    return (
        <div className='relative flex flex-row justify-center space-x-8 py-24'>
            <Sidebar />
            <div className='prose prose-$COLOR prose-invert prose-p:my-4 prose-headings:my-2 prose-headings:mt-4 prose-headings:w-full prose-headings:border-b prose-headings:border-white/15 prose-headings:pb-1.5 prose-a:decoration-dotted hover:prose-a:text-$ACCENT-COLOR-600 prose-ol:my-0 prose-ul:my-0 prose-hr:border-white/20 flex h-fit w-screen flex-shrink-0 flex-col items-start lg:max-w-[40%] lg:px-0'>
                <DocsBreadcrumbs />
                {children}
                <div className='mb-4 mt-8 h-[1px] w-full bg-white/15' />
                <DocsNav />
            </div>
            <SecondarySidebar />
        </div>
    );
};

export default DocsLayout;
