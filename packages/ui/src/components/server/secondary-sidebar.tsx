import dynamic from 'next/dynamic';
import { getConfig } from 'server/lib';
import { Heading } from 'server/types';
import { cn } from 'server/utils';

interface SecondarySidebarProps {
    headings: Heading[] | null;
}

const FiArrowUpRight = dynamic(() => import('@vertisanpro/react-icons/fi').then((mod) => mod.FiArrowUpRight));
const EditButton = dynamic(() => import('client/edit-button').then((mod) => mod.EditButton));
const ScrollBackButton = dynamic(() => import('client/scroll-back-button').then((mod) => mod.ScrollBackButton));
const TOC = dynamic(() => import('client/toc').then((mod) => mod.TOC));

export const SecondarySidebar = async ({ headings }: SecondarySidebarProps) => {
    const config = await getConfig();
    const sidebarLinks = config.sidebarLinks;
    const linkUnderline = config.misc.linkUnderline;
    return (
        <div className='sticky top-24 hidden h-fit w-fit min-w-[20vh] shrink-0 flex-col items-start xl:flex'>
            <span className='text-base-950 dark:text-base-50 py-2 text-sm font-bold'>On this page</span>
            {headings && (
                <>
                    <TOC headings={headings} />
                    <div className='my-2 h-[1px] w-3/4 bg-black/10 dark:bg-white/15' />
                    <EditButton />
                    {Object.keys(sidebarLinks).map((v, i) => (
                        <a
                            key={i}
                            href={Object.values(sidebarLinks)[i]}
                            rel='noopener noreferrer'
                            target='_blank'
                            className={cn(
                                'text-base-500 flex flex-row items-center gap-1 text-sm transition-all duration-300',
                                linkUnderline ? 'hover:underline' : 'hover:text-base-900 dark:hover:text-base-50',
                            )}
                        >
                            {v} <FiArrowUpRight />
                        </a>
                    ))}
                    <ScrollBackButton />
                </>
            )}
        </div>
    );
};
