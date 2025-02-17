'use client';

import LogoBigDark from '@/public/Doxium-slim-dark.svg';
import LogoBigLight from '@/public/Doxium-slim-light.svg';
import LogoSmallDark from '@/public/DX-slim-dark.svg';
import LogoSmallLight from '@/public/DX-slim-light.svg';
import { TreeNode } from '@/types';
import config from 'config';
import Cmdk from 'doxium/cmdk';
import { DocLink, Filetree } from 'doxium/filetree-navigation';
import { BsDiscord, BsGithub, BsTwitter } from 'icons/bs';
import { FiChevronRight } from 'icons/fi';
import { cn } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const separate = config.misc.separate;
const socials = config.socials;
const rootTitle = config.rootTitle;

interface NavbarProps {
    tree: TreeNode[];
}

const Navbar = ({ tree }: NavbarProps) => {
    const pathname = usePathname();
    const [opened, setOpened] = useState(false);
    const CMDKElement = useMemo(() => <Cmdk tree={tree} />, [tree]);
    const socialLinks = useMemo(() => {
        return Object.entries(socials).map(([i, v]) => {
            if (!v) return null;
            return (
                <a
                    className='flex items-center justify-center rounded-sm p-2 transition-all duration-300 hover:bg-base-300 dark:hover:bg-base-900'
                    href={v}
                    rel='noopener noreferrer'
                    target='_blank'
                    key={i}
                >
                    {i === 'githubRepo' && <BsGithub size={20} />}
                    {i === 'discord' && <BsDiscord size={20} />}
                    {i === 'twitter' && <BsTwitter size={20} />}
                </a>
            );
        });
    }, []);

    const navLinks = useMemo(
        () =>
            Object.keys(config.navLinks).map((v, i) => {
                return (
                    <Link
                        key={i}
                        href={Object.values(config.navLinks)[i]}
                        className={cn(
                            'text-sm font-medium hover:underline',
                            Object.values(config.navLinks)[i] ===
                                (pathname.split('/')[0] === '' ? '/' : `/${pathname.split('/')[1]}`)
                                ? 'text-accent-500'
                                : 'text-base-950 dark:text-base-200',
                        )}
                    >
                        {v}
                    </Link>
                );
            }),
        [pathname],
    );

    const menuButton = useMemo(
        () => (
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
        ),
        [opened],
    );

    useEffect(() => {
        setOpened(false);
    }, [pathname]);

    return (
        <>
            <div className='fixed inset-0 z-50 flex h-fit w-full flex-col'>
                <nav className='flex h-fit w-full flex-row items-center gap-8 border-black/5 bg-base-100/50 px-[10vw] py-4 text-sm font-normal text-base-950 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-base-950/50 dark:text-base-300 lg:border-b lg:px-[20vw]'>
                    <Link
                        href='/'
                        className='text-xl font-bold text-base-900 hover:text-base-950 dark:text-base-100 dark:hover:text-base-50'
                    >
                        <Image
                            src={config.style.colorScheme === 'dark' ? LogoBigDark : LogoBigLight}
                            alt='Doxium Logo Slim Big'
                            width={100}
                            className='hidden md:flex'
                        />
                        <Image
                            src={config.style.colorScheme === 'dark' ? LogoSmallDark : LogoSmallLight}
                            alt='Doxium Logo Slim Small'
                            width={40}
                            className='flex md:hidden'
                        />
                    </Link>
                    {navLinks}
                    {CMDKElement}
                    <div className='-ml-4 hidden flex-row items-center gap-2 lg:flex'>{socialLinks}</div>
                </nav>
                <div className='z-50 flex w-full flex-col border-y border-black/10 bg-base-400/50 px-[10vw] py-2.5 backdrop-blur-xl dark:border-white/10 dark:bg-base-950/50 lg:hidden'>
                    {menuButton}
                    <div className={cn('w-1/2 flex-col pb-2', opened ? 'flex' : 'hidden')}>
                        <DocLink name={rootTitle} />
                        <Filetree tree={tree} separate={separate} />
                    </div>
                </div>
            </div>
            <button
                className={cn(
                    'fixed inset-0 z-40 h-screen w-screen bg-base-600/30 transition-all duration-300 dark:bg-base-950/50',
                    opened ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
                )}
                aria-label='Close menu'
                onClick={() => setOpened((prev) => !prev)}
            />
        </>
    );
};

export default Navbar;
