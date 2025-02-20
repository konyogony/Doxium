import * as fs from 'fs/promises';
import * as path from 'path';

interface DoxiumConfig {
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
    navLinks?: Record<string, string>;
    socials?: {
        githubRepo?: string;
        twitter?: string;
        discord?: string;
    };
    sidebarLinks?: Record<string, string>;
    misc?: {
        toggleFolders?: boolean;
        separate?: boolean;
        appName?: string;
        showAppNameInTitle?: boolean;
        scollHeightBreakpoint?: number;
        extensions?: string[];
        navbarImage?: {
            large?: {
                dark: string;
                light: string;
            };
            small?: {
                dark: string;
                light: string;
            };
        };
    };
    authors?: Record<string, string>;
}

const defaultConfig: DoxiumConfig = {
    style: {
        colorScheme: 'dark',
        baseColor: 'zinc',
        accentColor: 'blue',
        shikiTheme: 'github-dark-dimmed',
    },
    alias: {
        components: '@/components/doxium',
        lib: '@/lib',
    },
    useDocs: false,
    baseUrl: 'app',
    rootTitle: 'Documentation',
    rootBreadcrumb: 'Docs',
    navLinks: { Home: '/' },
    socials: {
        githubRepo: '',
    },
    sidebarLinks: {},
};

// This is probably bad, but still copilot did it.
export const readConfig = async (configPath?: string): Promise<DoxiumConfig> => {
    const configFilePath = configPath || path.join(process.cwd(), 'doxium.config.ts');

    try {
        const content = await fs.readFile(configFilePath, 'utf-8');

        const cleanContent = content.replace(/import.*?;/g, '').replace(/\s+as\s+DoxiumConfig/g, '');

        const match = cleanContent.match(/export\s+default\s+({[\s\S]*})/);
        if (!match?.[1]) return defaultConfig;

        const configStr = match[1]
            .replace(/\/\/.*$/gm, '')
            .replace(/\/\*[\s\S]*?\*\//gm, '')
            .replace(/,(\s*[}\]])/g, '$1')
            .replace(/'([^']*)'|"([^"]*)"/g, (match) => JSON.stringify(match.slice(1, -1)));

        const config = Function(`
            try {
                return ${configStr};
            } catch(e) {
                return ${JSON.stringify(defaultConfig)};
            }
        `)();

        return { ...defaultConfig, ...config };
    } catch (error) {
        return defaultConfig;
    }
};
