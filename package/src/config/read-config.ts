import * as fs from 'fs/promises';
import * as path from 'path';

export const readConfig = async (configPath?: string): Promise<DoxiumConfig> => {
    const configFilePath = configPath || path.join(process.cwd(), 'doxium.config.ts');

    try {
        const content = await fs.readFile(configFilePath, 'utf-8');

        // Remove imports and type assertions
        const cleanContent = content.replace(/import.*?;/g, '').replace(/\s+as\s+DoxiumConfig/g, '');

        // Extract config object
        const match = cleanContent.match(/export\s+default\s+({[\s\S]*})/);
        if (!match?.[1]) throw new Error('Invalid config format');

        // Clean and parse config
        const configString = match[1]
            .replace(/\/\/.*$/gm, '') // Remove single-line comments
            .replace(/\/\*[\s\S]*?\*\//gm, '') // Remove multi-line comments
            .replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas

        // Evaluate as JavaScript object
        const config = new Function(`return ${configString}`)();

        return config as DoxiumConfig;
    } catch (error) {
        console.log('Config file not found or invalid, using default configuration');
        return {} as DoxiumConfig;
    }
};

interface DoxiumConfig {
    style: {
        colorScheme: 'dark' | 'light' | 'system';
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
    sidebarLinks: Record<string, string>;
    socials: {
        githubRepo: string;
        twitter: string;
        discord: string;
    };
    misc: {
        toggleFolders: boolean;
        appName: string;
        showAppNameInTitle: boolean;
        separate: boolean;
        scollHeightBreakpoint: number;
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
    authors: Record<string, string>;
}
