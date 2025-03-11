// @ts-nocheck

// This is from shadcn/ui

import { Slot } from '@radix-ui/react-slot';
import config from 'config';
import { separatorType } from 'doxium/types';
import { cn } from 'doxium/utils';
import {
    RxChevronRight,
    RxDividerVertical,
    RxDotFilled,
    RxDotsHorizontal,
    RxDoubleArrowRight,
    RxSlash,
    RxTriangleRight,
} from 'icons/rx';
import { ComponentProps, ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';

const configSeparator = config.misc.breadcrumbSeparator;

const separatorIcon = (type: separatorType) => {
    switch (type) {
        case 'chevron':
            return <RxChevronRight />;
        case 'double-chevron':
            return <RxDoubleArrowRight />;
        case 'slash':
            return <RxSlash />;
        case 'triangle':
            return <RxTriangleRight />;
        case 'horizontal-line':
            return <RxDividerVertical />;
        case 'dot':
            return <RxDotFilled />;
        default:
            return <RxChevronRight />;
    }
};

const Breadcrumb = forwardRef<
    HTMLElement,
    ComponentPropsWithoutRef<'nav'> & {
        separator?: ReactNode;
    }
>(({ ...props }, ref) => <nav ref={ref} aria-label='breadcrumb' {...props} />);
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = forwardRef<HTMLOListElement, ComponentPropsWithoutRef<'ol'>>(({ className, ...props }, ref) => (
    <ol
        ref={ref}
        className={cn(
            'text-base-500 dark:text-base-400 flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5',
            className,
        )}
        {...props}
    />
));
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
));
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = forwardRef<
    HTMLAnchorElement,
    ComponentPropsWithoutRef<'a'> & {
        asChild?: boolean;
    }
>(({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a';

    return (
        <Comp
            ref={ref}
            className={cn('hover:text-base-950 dark:hover:text-base-50 transition-colors', className)}
            {...props}
        />
    );
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>(({ className, ...props }, ref) => (
    <span
        ref={ref}
        role='link'
        aria-disabled='true'
        aria-current='page'
        className={cn('text-base-950 dark:text-base-50 font-normal', className)}
        {...props}
    />
));
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = ({ children, className, ...props }: ComponentProps<'li'>) => {
    return (
        <li role='presentation' aria-hidden='true' className={cn('[&>svg]:h-3.5 [&>svg]:w-3.5', className)} {...props}>
            {children ?? separatorIcon(configSeparator)}
        </li>
    );
};
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbEllipsis = ({ className, ...props }: ComponentProps<'span'>) => (
    <span
        role='presentation'
        aria-hidden='true'
        className={cn('flex h-9 w-9 items-center justify-center', className)}
        {...props}
    >
        <RxDotsHorizontal className='h-4 w-4' />
        <span className='sr-only'>More</span>
    </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis';

export {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
};
