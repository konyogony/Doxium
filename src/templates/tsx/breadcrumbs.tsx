// @ts-nocheck

'use client';

import { prettifyText } from 'lib/prettify-text';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from 'ui/breadcrumb';

const Breadcrumbs = () => {
    const pathname = usePathname();
    const path = pathname.split('/').filter((p) => p !== '');
    return (
        <Breadcrumb className='not-prose text mt-16  mb-8  lg:mt-4 lg:mb-2 flex w-full'>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={'/'}>Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {path.map((v, i) => {
                    const href = `/${path.slice(0, i + 1).join('/')}`;
                    const isLast = i === path.length - 1;
                    return (
                        <Fragment key={i}>
                            <BreadcrumbSeparator />
                            {v === 'docs' ? (
                                <BreadcrumbItem className={isLast ? 'text-$COLOR-50' : ''}>
                                    <BreadcrumbLink asChild>
                                        <Link href={`/${v}`}>{prettifyText(v)}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            ) : (
                                <BreadcrumbItem className={isLast ? 'text-$COLOR-50' : ''}>
                                    {isLast ? (
                                        <BreadcrumbLink asChild>
                                            <Link href={href}>{prettifyText(v)}</Link>
                                        </BreadcrumbLink>
                                    ) : (
                                        prettifyText(v)
                                    )}
                                </BreadcrumbItem>
                            )}
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default Breadcrumbs;
