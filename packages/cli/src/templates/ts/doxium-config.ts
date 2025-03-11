// @ts-nocheck

import { DoxiumConfig } from 'doxium/types';

export default {
    style: {
        colorScheme: '$SCHEME',
        baseColor: '$COLOR',
        accentColor: '$ACCENT-COLOR',
        shikiTheme: '$SHIKI-THEME',
    },
    useDocs: $USEDOCS,
    baseUrl: '$BASE-URL',
    rootTitle: 'Documentation',
    rootBreadcrumb: 'Docs',
    navLinks: {
        Home: '/',
    },
    socials: {
        githubRepo: '$GITHUB-REPO',
        twitter: '',
        discord: '',
    },
    sidebarLinks: {},
    misc: {
        toggleFolders: false, // Beware! Experimental feature
        separate: false,
        appName: 'Doxium',
        appDescription: 'A documentation system for Next.js',
        showAppNameInTitle: true,
        scollHeightBreakpoint: 300,
        showEditInGithub: true,
        breadcrumbSeparator: 'chevron',
        extensions: ['ts', 'tsx', 'jsx', 'rs', 'html', 'txt', 'mdx', 'bash', 'sh', 'js', 'css', 'json'], // Default extensions
        linkUnderline: true,
        navbarImage: {
            large: {
                dark: '/doxium/DoxiumDark.svg',
                light: '/doxium/DoxiumLight.svg',
            },
            small: {
                dark: '/doxium/DXDark.svg',
                light: '/doxium/DXLight.svg',
            },
        },
    },
    authors: {},
} as DoxiumConfig;
