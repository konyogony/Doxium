import { Heading } from '@/types';
import EditButton from 'doxium/edit-button';
import ScrollBackButton from 'doxium/scroll-back-button';
import TOC from 'doxium/toc';

interface SecondarySidebarProps {
    headings: Heading[];
}

const SecondarySidebar = ({ headings }: SecondarySidebarProps) => {
    return (
        <div className='sticky top-24 hidden h-fit w-fit min-w-[20vh] flex-shrink-0 flex-col items-start xl:flex'>
            <span className='py-2 text-sm font-bold text-base-50'>On this page</span>
            <TOC headings={headings} />
            <div className='my-2 h-[1px] w-3/4 bg-white/10' />
            <EditButton />
            <ScrollBackButton />
        </div>
    );
};

export default SecondarySidebar;
