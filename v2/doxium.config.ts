import { DoxiumConfig } from 'types';

export default {
    style: {
        colorScheme: 'dark',
        baseColor: 'zinc',
        accentColor: 'blue',
        shikiTheme: 'nord',
    },
    alias: {
        components: '@/components/doxium',
        lib: '@/lib',
        types: '@/types',
    },
    useDocs: false,
    baseUrl: 'docs',
    rootTitle: 'Documentation',
    rootBreadcrumb: 'Docs',
    navLinks: {
        Home: '/',
    },
    socials: {
        githubRepo: 'a',
        twitter: 'a',
        discord: '',
    },
    sidebarLinks: {
        'Open our website': 'https://google.com',
    },
    misc: {
        toggleFolders: false,
        separate: false,
        appName: 'Doxium',
        showAppNameInTitle: true,
        extensions: ['ts', 'tsx', 'jsx', 'rs', 'html', 'mdx', 'bash', 'sh', 'js', 'css', 'json'],
    },
    authors: {
        konyogony: 'https://github.com/konyogony',
        PadowYT2: '',
    },
} as DoxiumConfig;
