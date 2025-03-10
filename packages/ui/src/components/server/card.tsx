import { FiArrowUpRight } from '@vertisanpro/react-icons/fi';
import { Children, cloneElement, isValidElement, PropsWithChildren, ReactElement } from 'react';
import { cn } from 'server/utils';

export interface CardItemProps {
    title: string;
    href?: string;
    newTab?: boolean;
    full?: boolean;
}

export const CardItem = ({ title, href, children, full = false, newTab = false }: PropsWithChildren<CardItemProps>) => {
    return href ? (
        <a
            href={href}
            className={cn(
                'not-prose text-base-800 hover:text-base-900 dark:text-base-400 dark:hover:text-base-300 group relative my-2 flex flex-col items-start gap-2 rounded-md border border-black/15 px-6 py-3 text-sm font-normal transition-all duration-150 hover:shadow-md dark:border-white/15',
                full ? 'w-full' : 'w-1/2',
            )}
            target={newTab ? '_blank' : undefined}
            rel={newTab ? 'noreferrer noopener' : undefined}
        >
            <span className='text-base-950 group-hover:text-accent-600 dark:text-base-100 text-xl font-semibold transition-all duration-150'>
                {title}
            </span>
            <div>{children}</div>
            <FiArrowUpRight
                size={18}
                className='text-base-950 group-hover:text-accent-600 dark:text-base-100 absolute top-2 right-2 transition-all duration-150'
            />
        </a>
    ) : (
        <div
            className={cn(
                'not-prose text-base-800 dark:text-base-400 relative my-2 flex flex-col items-start gap-2 rounded-md border border-black/15 px-6 py-3 text-sm font-normal hover:shadow-md dark:border-white/15',
                full ? 'w-full' : 'w-1/2',
            )}
        >
            <span className='text-base-900 dark:text-base-100 text-xl font-semibold transition-all duration-150'>
                {title}
            </span>
            <div>{children}</div>
        </div>
    );
};

export interface CardGroupProps {
    cols: number;
    title?: string;
    children: ReactElement<CardItemProps> | ReactElement<CardItemProps>[];
}

export const CardGroup = ({ cols, children, title }: CardGroupProps) => {
    const modifiedChildren = Children.map(children, (child) => {
        if (isValidElement<CardItemProps>(child)) {
            return cloneElement(child, {
                ...child.props,
                full: true,
            });
        }
        return child;
    });
    return (
        <>
            {title && <h2 className='text-base-900 dark:text-base-100 text-2xl font-bold'>{title}</h2>}
            <div
                style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                }}
                className='grid w-full gap-4'
            >
                {modifiedChildren}
            </div>
        </>
    );
};
