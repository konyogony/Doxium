// @ts-nocheck

'use client';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { prettifyText } from '@/lib/prettify-text';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

export const DocsBreadcrumbs = () => {
    const pathname = usePathname();
    const path = pathname.split('/').filter((p) => p !== '');
    return (
        <Breadcrumb className='not-prose text mt-8 flex w-full'>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={'/'}>Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {path.map((v, i) => {
                    const href = `/${path.slice(0, i + 1).join('/')}`;
                    return (
                        <Fragment key={i}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className={i === path.length - 1 ? 'text-$COLOR-50' : ''}>
                                <BreadcrumbLink asChild>
                                    <Link href={href}>{prettifyText(v)}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
