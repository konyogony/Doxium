// @ts-nocheck

import EditButton from 'doxium/edit-button';
import ScrollBackButton from 'doxium/scroll-back-button';
import TOC from 'doxium/toc';

interface SecondarySidebarProps {
    socials: {
        'github-repo': string;
        twitter: string;
        discord: string;
    };
}

const SecondarySidebar = ({ socials }: SecondarySidebarProps) => {
    return (
        <div className='sticky top-24 hidden h-fit w-fit min-w-[20vh] flex-shrink-0 flex-col items-start lg:flex'>
            <span className='py-2 text-sm font-bold text-$COLOR-50'>On this page</span>
            <TOC />
            <div className='my-2 h-[1px] w-3/4 bg-white/10' />
            <EditButton repoString={socials['github-repo']} />
            <ScrollBackButton />
        </div>
    );
};

export default SecondarySidebar;
