// @ts-nocheck

'use client';

import { BsDiscord, BsGithub, BsTwitter } from '@vertisanpro/react-icons/bs';
import { FiChevronRight } from '@vertisanpro/react-icons/fi';
import Cmdk from '$COMPONENTS-ALIAS/cmdk';
import FolderFiletree from '$COMPONENTS-ALIAS/folder-filetree';
import LinkFiletree from '$COMPONENTS-ALIAS/link-filetree';
import { cn } from '$LIB-ALIAS/utils';
import { DocsNode } from '$TYPES-ALIAS';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface NavbarProps {
    structure: DocsNode[];
    socials: {
        'github-repo': string;
        discord: string;
        twitter: string;
    };
}

const Navbar = ({ structure, socials }: NavbarProps) => {
    const pathname = usePathname();
    const path = pathname.split('/')[1];
    const [opened, setOpened] = useState(false);
    const CMDKElement = useMemo(() => <Cmdk structure={structure} />, [structure]);

    useEffect(() => {
        setOpened(false);
    }, [pathname]);

    return (
        <>
            <div className='fixed inset-0 z-50 flex h-fit w-full flex-col'>
                <nav
                    className={
                        'flex h-fit w-full flex-row items-center gap-8 border-white/10 bg-$COLOR-950/50 px-[10vw] py-4 text-sm font-normal text-$COLOR-300 decoration-dotted backdrop-blur-xl transition-all duration-300 lg:border-b lg:px-[20vw]'
                    }
                >
                    <Link href='/' className='text-xl font-bold text-$COLOR-100 hover:text-$COLOR-50'>
                        Doxium
                    </Link>
                    <Link
                        href='/'
                        className={cn(
                            'text-sm font-medium hover:underline',
                            path === '' ? 'text-$ACCENT-COLOR-500' : 'text-$COLOR-200',
                        )}
                    >
                        Home
                    </Link>
                    <Link
                        href='/docs'
                        className={cn(
                            'text-sm font-medium hover:underline',
                            path === 'docs' ? 'text-$ACCENT-COLOR-500' : 'text-$COLOR-200',
                        )}
                    >
                        Docs
                    </Link>
                    {CMDKElement}
                    <div className='-ml-4 hidden flex-row items-center gap-2 lg:flex'>
                        {socials &&
                            Object.entries(socials).map(([i, v]) => {
                                if (!v) return null;
                                return (
                                    <a
                                        className='flex items-center justify-center rounded-sm p-2 hover:bg-$COLOR-900'
                                        href={v}
                                        rel='noopener noreferrer'
                                        target='_blank'
                                        key={i}
                                    >
                                        {i === 'github-repo' && <BsGithub size={20} />}
                                        {i === 'discord' && <BsDiscord size={20} />}
                                        {i === 'twitter' && <BsTwitter size={20} />}
                                    </a>
                                );
                            })}
                    </div>
                </nav>
                <div className='z-50 flex w-full flex-col border-y border-white/10 bg-$COLOR-950/50 px-[10vw] py-2.5 backdrop-blur-xl lg:hidden'>
                    <button className='flex flex-row items-center gap-1' onClick={() => setOpened((prev) => !prev)}>
                        Menu
                        <FiChevronRight
                            size={18}
                            className='transition-all duration-150'
                            style={{
                                rotate: opened ? '90deg' : '0deg',
                            }}
                        />
                    </button>
                    <div className={cn('w-1/2 flex-col pb-2', opened ? 'flex' : 'hidden')}>
                        <LinkFiletree name='Documentation' />
                        {structure.map((v, i) => (
                            <FolderFiletree key={i} node={v} separate={false} />
                        ))}
                    </div>
                </div>
            </div>
            <button
                className={cn(
                    'fixed inset-0 z-40 h-screen w-screen bg-$COLOR-950/50 transition-all duration-300',
                    opened ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
                )}
                aria-label='Close menu'
                onClick={() => setOpened((prev) => !prev)}
            />
        </>
    );
};

export default Navbar;
