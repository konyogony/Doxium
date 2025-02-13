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
        separate: false,
    },
} satisfies DoxiumConfig;
