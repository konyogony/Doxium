import { FiArrowUpRight } from 'icons/fi';
import { cn } from 'lib/utils';

export interface CardProps {
    title: string;
    href?: string;
    newTab?: boolean;
    full?: boolean;
}

// TODO: Please rework EVERYTHING here to actually be useful and look good.

const Card = ({ title, href, children, full = false, newTab = false }: React.PropsWithChildren<CardProps>) => {
    return href ? (
        <a
            href={href}
            className={cn(
                'not-prose group relative my-2 flex flex-col items-start gap-1 rounded-md border border-black/15 px-4 py-2.5 text-sm font-normal text-base-800 transition-all duration-150 hover:text-base-900 dark:border-white/15 dark:text-base-400 dark:hover:text-base-300',
                full ? 'w-full' : 'w-1/2',
            )}
            target={newTab ? '_blank' : undefined}
            rel={newTab ? 'noreferrer noopener' : undefined}
        >
            <span className='text-xl font-semibold text-base-950 underline transition-all duration-150 group-hover:text-accent-600 dark:text-base-100'>
                {title}
            </span>
            <div>{children}</div>
            <FiArrowUpRight
                size={18}
                className='absolute right-2 top-2 text-base-950 transition-all duration-150 group-hover:text-accent-600 dark:text-base-100'
            />
        </a>
    ) : (
        <div
            className={cn(
                'not-prose relative my-2 flex flex-col items-start gap-1 rounded-md border border-black/15 px-4 py-2.5 text-sm font-normal text-base-800 dark:border-white/15 dark:text-base-400',
                full ? 'w-full' : 'w-1/2',
            )}
        >
            <span className='text-xl font-semibold text-base-900 transition-all duration-150 dark:text-base-100'>
                {title}
            </span>
            <div>{children}</div>
        </div>
    );
};

export default Card;
