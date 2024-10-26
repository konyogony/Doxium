// @ts-nocheck

import { BundledLanguage, BundledTheme, HighlighterGeneric } from 'shiki';

export interface DocsNode {
    name: string;
    path?: string;
    nodes?: DocsNode[];
}

export interface DoxiumConfig {
    'github-repo': string;
    'shiki-theme': string;
}

export interface HighlighterResult {
    highlighter: HighlighterGeneric<BundledLanguage, BundledTheme>;
    theme: BundledTheme;
}

// Not in use, but for perspective
// export const ShikiThemeBackgroundHexDefault: Record<BundledTheme, string> = {
//     andromeeda: '#23262E',
//     'aurora-x': '#07090F',
//     'ayu-dark': '#0B0E14',
//     'catppuccin-frappe': '#303446',
//     'catppuccin-latte': '#EFF1F5',
//     'catppuccin-macchiato': '#24273A',
//     'catppuccin-mocha': '#1E1E2E',
//     'dark-plus': '#1E1E1E',
//     dracula: '#282A36',
//     'dracula-soft': '#282A36',
//     'everforest-dark': '#2D353B',
//     'everforest-light': '#FDF6E3',
//     'github-dark': '#24292E',
//     'github-dark-default': '#0D1117',
//     'github-dark-dimmed': '#22272E',
//     'github-dark-high-contrast': '#0A0C10',
//     'github-light': '#FFFFFF',
//     'github-light-default': '#FFFFFF',
//     'github-light-high-contrast': '#FFFFFF',
//     houston: '#17191E',
//     'kanagawa-dragon': '#181616',
//     'kanagawa-lotus': '#F2ECBC',
//     'kanagawa-wave': '#1F1F28',
//     laserwave: '#27212E',
//     'light-plus': '#FFFFFF',
//     'material-theme': '#263238',
//     'material-theme-darker': '#212121',
//     'material-theme-lighter': '#FAFAFA',
//     'material-theme-ocean': '#0F111A',
//     'material-theme-palenight': '#292D3E',
//     'min-dark': '#1F1F1F',
//     'min-light': '#FFFFFF',
//     monokai: '#272822',
//     'night-owl': '#011627',
//     nord: '#2E3440',
//     'one-dark-pro': '#282C34',
//     'one-light': '#FAFAFA',
//     plastic: '#21252B',
//     poimandres: '#1B1E28',
//     red: '#390000',
//     'rose-pine': '#191724',
//     'rose-pine-dawn': '#FAF4ED',
//     'rose-pine-moon': '#232136',
//     'slack-dark': '#222222',
//     'slack-ochin': '#FFFFFF',
//     'snazzy-light': '#FAFBFC',
//     'solarized-dark': '#002B36',
//     'solarized-light': '#FDF6E3',
//     'synthwave-84': '#262335',
//     'tokyo-night': '#1A1B26',
//     vesper: '#101010',
//     'vitesse-black': '#000000',
//     'vitesse-dark': '#121212',
//     'vitesse-light': '#FFFFFF',
// };

// Darker by 20%
export const ShikiThemeBackgroundHexDimmed: Record<BundledTheme, string> = {
    andromeeda: '#1F2226',
    'aurora-x': '#06080D',
    'ayu-dark': '#0A0C12',
    'catppuccin-frappe': '#2B2F3F',
    'catppuccin-latte': '#D8D9DC',
    'catppuccin-macchiato': '#202536',
    'catppuccin-mocha': '#1A1A29',
    'dark-plus': '#1A1A1A',
    dracula: '#24262F',
    'dracula-soft': '#24262F',
    'everforest-dark': '#293033',
    'everforest-light': '#E6E0D3',
    'github-dark': '#20252A',
    'github-dark-default': '#0B0F14',
    'github-dark-dimmed': '#1F242A',
    'github-dark-high-contrast': '#090A0C',
    'github-light': '#E6E6E6',
    'github-light-default': '#E6E6E6',
    'github-light-high-contrast': '#E6E6E6',
    houston: '#15171A',
    'kanagawa-dragon': '#131111',
    'kanagawa-lotus': '#C1BC96',
    'kanagawa-wave': '#181820',
    laserwave: '#231D26',
    'light-plus': '#E6E6E6',
    'material-theme': '#232A2E',
    'material-theme-darker': '#1E1E1E',
    'material-theme-lighter': '#E6E6E6',
    'material-theme-ocean': '#0D0F16',
    'material-theme-palenight': '#262A36',
    'min-dark': '#1B1B1B',
    'min-light': '#E6E6E6',
    monokai: '#23251F',
    'night-owl': '#011422',
    nord: '#2A2F3A',
    'one-dark-pro': '#24282F',
    'one-light': '#E6E6E6',
    plastic: '#1E2025',
    poimandres: '#181A22',
    red: '#330000',
    'rose-pine': '#17151F',
    'rose-pine-dawn': '#E6E0D3',
    'rose-pine-moon': '#1F1D2F',
    'slack-dark': '#1F1F1F',
    'slack-ochin': '#E6E6E6',
    'snazzy-light': '#E6E6E6',
    'solarized-dark': '#00262F',
    'solarized-light': '#E6E0D3',
    'synthwave-84': '#231F2F',
    'tokyo-night': '#171A21',
    vesper: '#0E0E0E',
    'vitesse-black': '#000000',
    'vitesse-dark': '#0F0F0F',
    'vitesse-light': '#E6E6E6',
};

export type preProps = React.HTMLAttributes<HTMLPreElement> & {
    lineNumbers?: boolean;
};
