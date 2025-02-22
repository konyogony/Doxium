import { Answers } from 'prompts';

export type responseT = Answers<
    | 'app-name'
    | 'eslint'
    | 'prettier'
    | 'use-docs'
    | 'base-color'
    | 'proceed'
    | 'github-repo'
    | 'accent-color'
    | 'shiki-theme'
    | 'color-scheme'
>;
export interface DoxiumConfig {
    style: {
        colorScheme: 'dark' | 'light' | 'system';
        baseColor: string;
        accentColor: string;
        shikiTheme: string;
    };
    alias: {
        components: string;
        lib: string;
    };
    useDocs: boolean;
    baseUrl: string;
    rootTitle: string;
    rootBreadcrumb: string;
    navLinks: Record<string, string>;
    socials?: {
        githubRepo?: string;
        twitter?: string;
        discord?: string;
    };
    sidebarLinks?: Record<string, string>;
    misc?: {
        toggleFolders: boolean;
        appName: string;
        showAppNameInTitle: boolean;
        separate: boolean;
        scollHeightBreakpoint: number;
        showEditInGithub: boolean;
        breadcrumbSeparator: string;
        linkUnderline: boolean;
        extensions: string[];
        navbarImage?: {
            large?: {
                dark?: string;
                light?: string;
            };
            small?: {
                dark?: string;
                light?: string;
            };
        };
    };
    authors?: Record<string, string>;
}

export const colorSchemes = ['light', 'dark'];
export const baseColors = ['Stone', 'Neutral', 'Zinc', 'Gray', 'Slate'];
export const accentColors = [
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Emerald',
    'Cyan',
    'Blue',
    'Indigo',
    'Violet',
    'Purple',
    'Pink',
];
export const shikiThemes = [
    'Andromeeda',
    'Aurora X',
    'Ayu Dark',
    'Catppuccin Frappé',
    'Catppuccin Latte',
    'Catppuccin Macchiato',
    'Catppuccin Mocha',
    'Dark Plus',
    'Dracula Theme',
    'Dracula Theme Soft',
    'Everforest Dark',
    'Everforest Light',
    'GitHub Dark',
    'GitHub Dark Default',
    'GitHub Dark Dimmed',
    'GitHub Dark High Contrast',
    'GitHub Light',
    'GitHub Light Default',
    'GitHub Light High Contrast',
    'Houston',
    'Kanagawa Dragon',
    'Kanagawa Lotus',
    'Kanagawa Wave',
    'LaserWave',
    'Light Plus',
    'Material Theme',
    'Material Theme Darker',
    'Material Theme Lighter',
    'Material Theme Ocean',
    'Material Theme Palenight',
    'Min Dark',
    'Min Light',
    'Monokai',
    'Night Owl',
    'Nord',
    'One Dark Pro',
    'One Light',
    'Plastic',
    'Poimandres',
    'Red',
    'Rosé Pine',
    'Rosé Pine Dawn',
    'Rosé Pine Moon',
    'Slack Dark',
    'Slack Ochin',
    'Snazzy Light',
    'Solarized Dark',
    'Solarized Light',
    "Synthwave '84",
    'Tokyo Night',
    'Vesper',
    'Vitesse Black',
    'Vitesse Dark',
    'Vitesse Light',
];
