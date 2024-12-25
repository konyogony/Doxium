// @ts-nocheck

import { FiArrowUpRight } from 'icons/fi';
import { cn } from 'lib/utils';

export interface CardProps {
    title: string;
    href?: string;
    newTab?: boolean;
    full?: boolean;
}

const Card = ({ title, href, children, full = false, newTab = false }: React.PropsWithChildren<CardProps>) => {
    return href ? (
        <a
            href={href}
            className={cn(
                'not-prose group relative my-2 flex flex-col items-start gap-1 rounded-md border border-white/15 px-4 py-2.5 text-sm font-normal text-$COLOR-400 transition-all duration-150 hover:text-$COLOR-300',
                full ? 'w-full' : 'w-1/2',
            )}
            target={newTab ? '_blank' : undefined}
            rel={newTab ? 'noreferrer noopener' : undefined}
        >
            <span className='text-xl font-semibold group-hover:text-$ACCENT-COLOR-600 decoration-dotted transition-all duration-150 text-$COLOR-100 underline'>
                {title}
            </span>
            <div>{children}</div>
            <FiArrowUpRight
                size={18}
                className='absolute right-2 top-2 group-hover:text-$ACCENT-COLOR-600 transition-all duration-150 text-$COLOR-100'
            />
        </a>
    ) : (
        <div
            className={cn(
                'not-prose relative my-2 flex flex-col items-start gap-1 rounded-md border border-white/15 px-4 py-2.5 text-sm font-normal text-$COLOR-400',
                full ? 'w-full' : 'w-1/2',
            )}
        >
            <span className='text-xl font-semibold text-$COLOR-100 transition-all duration-150'>{title}</span>
            <div>{children}</div>
        </div>
    );
};

export default Card;
