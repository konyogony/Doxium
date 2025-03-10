import { DoxiumConfig } from '@doxium/ui/server';

export default {
    style: {
        colorScheme: 'dark',
        baseColor: 'zinc',
        accentColor: 'blue',
        shikiTheme: 'github-dark-dimmed',
    },
    useDocs: false,
    baseUrl: 'app',
    rootTitle: 'Documentation',
    rootBreadcrumb: 'Docs',
    navLinks: {
        Home: '/',
    },
    socials: {
        githubRepo: '',
        twitter: '',
        discord: '',
    },
    sidebarLinks: {},
    misc: {
        toggleFolders: false, // Beware! Experimental feature
        separate: false,
        appName: 'Doxium',
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
