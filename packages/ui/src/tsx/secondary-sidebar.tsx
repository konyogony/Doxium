import { FiArrowUpRight } from 'icons/fi';
import { getConfig } from 'ts/lib';
import { Heading } from 'ts/types';
import { cn } from 'ts/utils';
import { EditButton } from 'tsx/edit-button';
import { ScrollBackButton } from 'tsx/scroll-back-button';
import { TOC } from 'tsx/toc';

interface SecondarySidebarProps {
    headings: Heading[] | null;
}

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
