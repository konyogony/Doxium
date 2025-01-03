// @ts-nocheck

import { DoxiumConfig } from 'types';

export default {
    style: {
        'base-color': '$COLOR',
        'accent-color': '$ACCENT-COLOR',
        'shiki-theme': '$SHIKI-THEME',
    },
    alias: {
        components: '$COMPONENTS-ALIAS',
        lib: '$LIB-ALIAS',
        types: '$TYPES-ALIAS',
    },
    'use-docs': $USEDOCS,
    'base-url': '$BASE-URL',
    'root-name': 'Getting Started',
    socials: {
        'github-repo': '$GITHUB-REPO',
        twitter: '',
        discord: '',
    },
    misc: {
        separate: false,
    },
} satisfies DoxiumConfig;
