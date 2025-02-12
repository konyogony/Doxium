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
    'base-url': 'app',
    'root-name': 'Getting Started',
    socials: {
        'github-repo': '',
        twitter: '',
        discord: '',
    },
    misc: {
        separate: false,
    },
} satisfies DoxiumConfig;
