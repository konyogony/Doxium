// @ts-nocheck
'use client';

import config from 'config';
import Cmdk from 'doxium/components/cmdk';
import { DocLink, FiletreeNavigation } from 'doxium/components/filetree-navigation';
import { TreeNode } from 'doxium/types';
import { cn } from 'doxium/utils';
import { BsDiscord, BsGithub, BsTwitter } from 'icons/bs';
import { FiChevronRight } from 'icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface NavbarProps {
    tree: TreeNode[];
}

const separate = config.misc.separate;
const socials = config.socials;
const rootTitle = config.rootTitle;
const configNavLinks = config.navLinks;
const colorScheme = config.style.colorScheme;
const navbarImage = config.misc.navbarImage;
const linkUnderline = config.misc.linkUnderline;

const Navbar = ({ tree }: NavbarProps) => {
    const pathname = usePathname();
    const [opened, setOpened] = useState(false);

    const CMDKElement = useMemo(() => <Cmdk tree={tree} />, [tree]);

    const socialLinks = useMemo(() => {
        return Object.entries(socials).map(([i, v]) => {
            if (!v) return null;
            return (
                <a
                    className='hover:bg-base-300 dark:hover:bg-base-900 rounded-xs flex items-center justify-center p-2 transition-all duration-300'
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
            Object.keys(configNavLinks).map((v, i) => {
                return (
                    <Link
                        key={i}
                        href={Object.values(configNavLinks)[i]}
                        className={cn(
                            'text-sm font-medium',
                            linkUnderline ? 'hover:underline' : 'hover:text-accent-500',
                            Object.values(configNavLinks)[i] ===
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

    // Actually awfull
    const NavbarImage = useMemo(
        () =>
            navbarImage && (
                <Link
                    href='/'
                    className='text-base-900 hover:text-base-950 dark:text-base-100 dark:hover:text-base-50 text-xs font-bold'
                >
                    {navbarImage.large && navbarImage.large.dark && navbarImage.large.light && (
                        <Image
                            src={colorScheme === 'dark' ? navbarImage.large.dark : navbarImage.large.light}
                            alt='Logo Big Variable'
                            width={100}
                            height={40}
                            className='hidden md:flex'
                        />
                    )}
                    {navbarImage.large && !navbarImage.large.dark && navbarImage.large.light && (
                        <Image
                            src={navbarImage.large.light}
                            alt='Logo Big Light'
                            width={100}
                            height={40}
                            className='hidden md:flex'
                        />
                    )}
                    {navbarImage.large && navbarImage.large.dark && !navbarImage.large.light && (
                        <Image
                            src={navbarImage.large.dark}
                            alt='Logo Big Dark'
                            width={100}
                            height={40}
                            className='hidden md:flex'
                        />
                    )}
                    {navbarImage.small && navbarImage.small.dark && navbarImage.small.light && (
                        <Image
                            src={colorScheme === 'dark' ? navbarImage.small.dark : navbarImage.small.light}
                            alt='Logo Small Variable'
                            width={40}
                            height={40}
                            className='flex md:hidden'
                        />
                    )}
                    {navbarImage.small && !navbarImage.small.dark && navbarImage.small.light && (
                        <Image
                            src={navbarImage.small.light}
                            alt='Logo Small Light'
                            width={40}
                            height={40}
                            className='flex md:hidden'
                        />
                    )}
                    {navbarImage.small && navbarImage.small.dark && !navbarImage.small.light && (
                        <Image
                            src={navbarImage.small.dark}
                            alt='Logo Small dark'
                            width={40}
                            height={40}
                            className='flex md:hidden'
                        />
                    )}
                </Link>
            ),
        [],
    );

    return (
        <>
            <div className='fixed inset-0 z-50 flex h-fit w-full flex-col'>
                <nav className='bg-base-100/50 text-base-950 dark:bg-base-950/50 dark:text-base-300 flex h-fit w-full flex-row items-center gap-8 border-black/5 px-[10vw] py-4 text-sm font-normal backdrop-blur-xl transition-all duration-300 lg:border-b lg:px-[20vw] dark:border-white/10'>
                    {NavbarImage}
                    {navLinks}
                    {CMDKElement}
                    <div className='-ml-4 hidden flex-row items-center gap-2 lg:flex'>{socialLinks}</div>
                </nav>
                <div className='bg-base-200/50 dark:bg-base-950/50 z-50 flex w-full flex-col border-y border-black/10 px-[10vw] py-2.5 backdrop-blur-xl lg:hidden dark:border-white/10'>
                    {menuButton}
                    <div className={cn('w-1/2 flex-col pb-2', opened ? 'flex' : 'hidden')}>
                        <DocLink name={rootTitle} />
                        <FiletreeNavigation tree={tree} separate={separate} />
                    </div>
                </div>
            </div>
            <button
                className={cn(
                    'bg-base-950/50 fixed inset-0 z-40 h-screen w-screen transition-all duration-300',
                    opened ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
                )}
                aria-label='Close menu'
                onClick={() => setOpened((prev) => !prev)}
            />
        </>
    );
};

export default Navbar;
