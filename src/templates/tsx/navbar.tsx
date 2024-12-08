// @ts-nocheck

'use client';
'use client';

import Cmdk from '@/components/doxium/cmdk';
import { cn } from '@/lib/utils';
import { DocsNode } from '@/types';
import { BsDiscord, BsGithub, BsTwitter } from '@vertisanpro/react-icons/bs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

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

    const CMDKElement = useMemo(() => <Cmdk structure={structure} />, [structure]);

    return (
        <nav
            className={
                'fixed inset-0 z-50 flex h-fit w-full flex-row items-center gap-8 border-b border-white/10 bg-$COLOR-950/40 px-[10vw] py-4 text-sm font-normal text-$COLOR-300 decoration-dotted backdrop-blur-xl transition-all duration-300 md:px-[20vw]'
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
                                className='flex items-center justify-center rounded-sm p-2 hover:bg-zinc-900'
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
    );
};

export default Navbar;
