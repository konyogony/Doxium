import { DoxiumConfig } from 'lib/types';

export default {
    style: {
        colorScheme: 'light',
        baseColor: 'zinc',
        accentColor: 'blue',
        shikiTheme: 'vitesse-light',
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
        githubRepo: 'https://github.com/konyogony/edalem-docs',
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
        scollHeightBreakpoint: 300,
        showEditInGithub: false,
        extensions: ['ts', 'tsx', 'jsx', 'rs', 'html', 'mdx', 'bash', 'sh', 'js', 'css', 'json'],
        navbarImage: {
            large: {
                dark: '/Doxium-slim-dark.svg',
                light: '/Doxium-slim-light.svg',
            },
            small: {
                dark: '/DX-slim-dark.svg',
                light: '/DX-slim-light.svg',
            },
        },
    },
    authors: {
        konyogony: 'https://github.com/konyogony',
        PadowYT2: '',
    },
} as DoxiumConfig;
