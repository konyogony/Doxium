// Import Shiki syntax highlighting types
import { BundledLanguage, BundledTheme, LanguageInput, SpecialLanguage, StringLiteralUnion } from 'shiki';

// Type for URL parameters, currently only supports slug arrays
export type params = Promise<{
    slug?: string[];
}>;

// Available separator styles for breadcrumb navigation
export type separatorType = 'chevron' | 'double-chevron' | 'slash' | 'horizontal-line' | 'dot' | 'triangle';

// Props extension for pre elements with additional documentation features
export type preProps = React.HTMLAttributes<HTMLPreElement> & {
    lineNumbers?: boolean; // Show line numbers in code blocks
    noTopBar?: boolean; // Hide the top bar in code blocks
    noCopyButton?: boolean; // Hide the copy button
    twoSlash?: boolean; // Enable TypeScript twoslash annotations
    name?: string; // Optional filename or title
};

// Node structure for documentation tree
export interface TreeNode {
    name: string; // Display name of the node
    type: 'file' | 'folder'; // Node type
    sort: number; // Sorting priority
    slug?: string; // URL path for files
    nodes?: TreeNode[]; // Child nodes for folders
}

// Documentation file metadata structure
export interface DoxiumFile {
    title: string; // Page title
    slug: string; // URL path
    sort: number; // Sorting priority
    groupTitle?: string; // Optional group/folder title
    groupSort?: number; // Optional group sorting priority
}

// Main configuration interface for the documentation system
export interface DoxiumConfig {
    style: {
        colorScheme: 'dark' | 'light' | 'system'; // Note: 'system' is not fully implemented
        baseColor: 'stone' | 'neutral' | 'zinc' | 'gray' | 'slate';
        accentColor:
            | 'red'
            | 'orange'
            | 'yellow'
            | 'green'
            | 'emerald'
            | 'cyan'
            | 'blue'
            | 'indigo'
            | 'violet'
            | 'purple'
            | 'pink';
        shikiTheme: BundledTheme;
    };
    // Note: useDocs should be set to false as it's currently broken
    useDocs: boolean;
    baseUrl: string;
    rootTitle: string;
    rootBreadcrumb: string;
    navLinks: Record<string, string>; // Navigation menu links
    sidebarLinks: Record<string, string>; // Sidebar additional links
    socials: {
        githubRepo: string;
        twitter: string;
        discord: string;
    };
    misc: {
        toggleFolders: boolean; // Experimental: Folder collapse feature
        appName: string;
        showAppNameInTitle: boolean;
        separate: boolean;
        scollHeightBreakpoint: number;
        showEditInGithub: boolean;
        breadcrumbSeparator: separatorType;
        linkUnderline: boolean;
        extensions: (LanguageInput | SpecialLanguage | StringLiteralUnion<BundledLanguage, string>)[];
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
    authors: Record<string, string>; // Author information mapping
}

// Heading structure for document sections
export interface Heading {
    id: string; // Unique identifier
    level: number; // Heading level (h1, h2, h3)
    text: string; // Heading text content
}

// Reference color values for Shiki themes (default state)
export const ShikiThemeBackgroundHexDefault: Record<BundledTheme, string> = {
    andromeeda: '#23262E',
    'aurora-x': '#07090F',
    'ayu-dark': '#0B0E14',
    'catppuccin-frappe': '#303446',
    'catppuccin-latte': '#EFF1F5',
    'catppuccin-macchiato': '#24273A',
    'catppuccin-mocha': '#1E1E2E',
    'dark-plus': '#1E1E1E',
    dracula: '#282A36',
    'dracula-soft': '#282A36',
    'everforest-dark': '#2D353B',
    'everforest-light': '#FDF6E3',
    'github-dark': '#24292E',
    'github-dark-default': '#0D1117',
    'github-dark-dimmed': '#22272E',
    'github-dark-high-contrast': '#0A0C10',
    'github-light': '#FFFFFF',
    'github-light-default': '#FFFFFF',
    'github-light-high-contrast': '#FFFFFF',
    houston: '#17191E',
    'kanagawa-dragon': '#181616',
    'kanagawa-lotus': '#F2ECBC',
    'kanagawa-wave': '#1F1F28',
    laserwave: '#27212E',
    'light-plus': '#FFFFFF',
    'material-theme': '#263238',
    'material-theme-darker': '#212121',
    'material-theme-lighter': '#FAFAFA',
    'material-theme-ocean': '#0F111A',
    'material-theme-palenight': '#292D3E',
    'min-dark': '#1F1F1F',
    'min-light': '#FFFFFF',
    monokai: '#272822',
    'night-owl': '#011627',
    nord: '#2E3440',
    'one-dark-pro': '#282C34',
    'one-light': '#FAFAFA',
    plastic: '#21252B',
    poimandres: '#1B1E28',
    red: '#390000',
    'rose-pine': '#191724',
    'rose-pine-dawn': '#FAF4ED',
    'rose-pine-moon': '#232136',
    'slack-dark': '#222222',
    'slack-ochin': '#FFFFFF',
    'snazzy-light': '#FAFBFC',
    'solarized-dark': '#002B36',
    'solarized-light': '#FDF6E3',
    'synthwave-84': '#262335',
    'tokyo-night': '#1A1B26',
    vesper: '#101010',
    'vitesse-black': '#000000',
    'vitesse-dark': '#121212',
    'vitesse-light': '#FFFFFF',
};

// Reference color values for Shiki themes (dimmed state)
export const ShikiThemeBackgroundHexDimmed: Record<BundledTheme, string> = {
    andromeeda: '#282B33',
    'aurora-x': '#090B11',
    'ayu-dark': '#0D1018',
    'catppuccin-frappe': '#3B3F54',
    'catppuccin-latte': '#F0F2F7',
    'catppuccin-macchiato': '#2E3144',
    'catppuccin-mocha': '#262638',
    'dark-plus': '#262626',
    dracula: '#30323F',
    'dracula-soft': '#30323F',
    'everforest-dark': '#333B40',
    'everforest-light': '#FAF4E8',
    'github-dark': '#2B3036',
    'github-dark-default': '#0F131C',
    'github-dark-dimmed': '#292E36',
    'github-dark-high-contrast': '#0B0E13',
    'github-light': '#F2F2F2',
    'github-light-default': '#F2F2F2',
    'github-light-high-contrast': '#F2F2F2',
    houston: '#1E2025',
    'kanagawa-dragon': '#1B1919',
    'kanagawa-lotus': '#D0CCB2',
    'kanagawa-wave': '#22222B',
    laserwave: '#2D2732',
    'light-plus': '#F2F2F2',
    'material-theme': '#2D353B',
    'material-theme-darker': '#2A2A2A',
    'material-theme-lighter': '#F2F2F2',
    'material-theme-ocean': '#11141E',
    'material-theme-palenight': '#323644',
    'min-dark': '#272727',
    'min-light': '#F2F2F2',
    monokai: '#2D2E2A',
    'night-owl': '#011526',
    nord: '#363D49',
    'one-dark-pro': '#30343D',
    'one-light': '#F2F2F2',
    plastic: '#282A2F',
    poimandres: '#22242E',
    red: '#400000',
    'rose-pine': '#211F2B',
    'rose-pine-dawn': '#FAF4E8',
    'rose-pine-moon': '#29273D',
    'slack-dark': '#2B2B2B',
    'slack-ochin': '#F2F2F2',
    'snazzy-light': '#F2F2F2',
    'solarized-dark': '#002833',
    'solarized-light': '#FAF4E8',
    'synthwave-84': '#2D293B',
    'tokyo-night': '#21242B',
    vesper: '#151515',
    'vitesse-black': '#000000',
    'vitesse-dark': '#171717',
    'vitesse-light': '#D8D8D8',
};
