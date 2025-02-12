import { DoxiumConfig } from 'types';

export default {
    style: {
        'base-color': 'zinc',
        'accent-color': 'orange',
        'shiki-theme': 'nord',
    },
    alias: {
        components: '@/components/doxium',
        lib: '@/lib',
        types: '@/types',
    },
    'use-docs': false,
    'base-url': 'docs',
    'root-name': 'Getting Started',
    socials: {
        'github-repo': '',
        twitter: 'a',
        discord: '',
    },
    misc: {
        separate: false,
    },
} satisfies DoxiumConfig;
