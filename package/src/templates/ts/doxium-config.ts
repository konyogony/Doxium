// @ts-nocheck

import { DoxiumConfig } from 'lib/types';

export default {
    style: {
        colorScheme: '$SCHEME',
        baseColor: '$COLOR',
        accentColor: '$ACCENT-COLOR',
        shikiTheme: '$SHIKI-THEME',
    },
    alias: {
        components: '$COMPONENTS-ALIAS',
        lib: '$LIB-ALIAS',
    },
    useDocs: $USEDOCS,
    baseUrl: '$BASE-URL',
    rootTitle: 'Documentation',
    rootBreadcrumb: 'Docs',
    navLinks: {
        Home: '/',
    }, // { 'name': 'link', 'name2': 'link2' }
    socials: {
        githubRepo: '$GITHUB-REPO',
        twitter: '',
        discord: '',
    },
    sidebarLinks: {}, // { 'name': 'link', 'name2': 'link2' }
    misc: {
        toggleFolders: false, // Experimental feature
        separate: false,
        appName: 'Doxium',
        showAppNameInTitle: true,
        scollHeightBreakpoint: 300,
        extensions: ['ts', 'tsx', 'jsx', 'rs', 'html', 'txt', 'mdx', 'bash', 'sh', 'js', 'css', 'json'], // Just default values
    },
    authors: {}, // { name: 'link?', name2: 'link2?' }
} as DoxiumConfig;
