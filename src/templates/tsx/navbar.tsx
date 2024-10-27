// @ts-nocheck

'use client';

import { Cmdk } from '@/components/doxium/cmdk';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { BsDiscord, BsGithub } from 'react-icons/bs';

export const Navbar = () => {
    const [scrollHeight, setScrollHeight] = useState(0);
    const pathname = usePathname();
    const path = pathname.split('/')[1];

    const CMDKElement = useMemo(() => <Cmdk />, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrollHeight(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollHeight]);

    return (
        <nav
            className={cn(
                'fixed inset-0 z-50 flex h-fit w-full flex-row items-center gap-8 border-b border-white/0 px-[20vw] py-4 text-sm font-normal text-zinc-300 decoration-dotted transition-all duration-300',
                scrollHeight > 0 && 'border-white/5 bg-zinc-950/90 backdrop-blur-lg',
            )}
        >
            <Link href='/' className='text-xl font-bold text-zinc-100 hover:text-zinc-50'>
                Doxium
            </Link>
            <Link
                href='/'
                className={cn('text-sm font-medium hover:underline', path === '' ? 'text-blue-500' : 'text-zinc-200')}
            >
                Home
            </Link>
            <Link
                href='/docs'
                className={cn(
                    'text-sm font-medium hover:underline',
                    path === 'docs' ? 'text-blue-500' : 'text-zinc-200',
                )}
            >
                Docs
            </Link>
            {CMDKElement}
            <div className='hidden flex-row items-center gap-2 lg:flex'>
                <a
                    className='flex items-center justify-center rounded-sm p-2 hover:bg-zinc-900'
                    href='https://github.com/konyogony'
                    rel='noopener noreferrer'
                    target='_blank'
                >
                    <BsGithub size={20} />
                </a>
                <a
                    className='flex items-center justify-center rounded-sm p-2 hover:bg-zinc-900'
                    href='https://discord.gg/UW4CpNeq'
                    rel='noopener noreferrer'
                    target='_blank'
                >
                    <BsDiscord size={20} />
                </a>
            </div>
        </nav>
    );
};
