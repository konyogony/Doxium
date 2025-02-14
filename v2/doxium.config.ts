import { DoxiumConfig } from 'types';

export default {
    style: {
        baseColor: 'zinc',
        accentColor: 'orange',
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
    socials: {
        githubRepo: '',
        twitter: 'a',
        discord: '',
    },
    misc: {
        toggleFolders: true,
        separate: false,
        appName: 'Doxium',
        showAppNameInTitle: true,
        extensions: ['ts', 'tsx', 'jsx', 'rs', 'html', 'mdx', 'bash', 'sh', 'js', 'css', 'json'],
    },
} satisfies DoxiumConfig;
