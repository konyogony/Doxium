// @ts-nocheck

'use client';

import { BsDiscord, BsGithub } from '@vertisanpro/react-icons/bs';
import Cmdk from '$COMPONENTS-ALIAS/cmdk';
import { cn } from '$LIB-ALIAS/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const Navbar = () => {
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
                'fixed inset-0 z-50 flex h-fit w-full flex-row items-center gap-8 border-b border-white/0 px-[20vw] py-4 text-sm font-normal text-$COLOR-300 decoration-dotted transition-all duration-300',
                scrollHeight > 0 && 'border-white/5 bg-$COLOR-950/90 backdrop-blur-lg',
            )}
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
            <div className='hidden flex-row items-center gap-2 lg:flex'>
                <a
                    className='flex items-center justify-center rounded-sm p-2 hover:bg-$COLOR-900'
                    href='https://github.com/konyogony'
                    rel='noopener noreferrer'
                    target='_blank'
                >
                    <BsGithub size={20} />
                </a>
                <a
                    className='flex items-center justify-center rounded-sm p-2 hover:bg-$COLOR-900'
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

export default Navbar;
