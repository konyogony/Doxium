import path from 'path';
import spawn from 'cross-spawn';
import fs from 'fs-extra';
import { responseT } from '../utils/types.js';
import { infoText, replaceFilePlaceholders, replacePlaceholders, successText, templatesDir } from '../utils/utils.js';

// List of files to install if home page is not selected
const filesNoHome = [
    // UI components
    { name: 'main-layout', type: 'tsx', path: './app/layout.tsx' },

    // Config
    { name: 'config', type: 'ts', path: './config.ts' },

    // Mdx
    { name: 'about', type: 'mdx', path: './app/about/page.mdx' },
    { name: 'main', type: 'mdx', path: './app/page.mdx' },
    { name: 'code-block', type: 'mdx', path: './app/features/code-block/page.mdx' },
    { name: 'test', type: 'mdx', path: './app/features/test/page.mdx' },
];

// List of files to install if home page is selected
const filesHome = [
    // UI components
    { name: 'home-main-layout', type: 'tsx', path: './app/layout.tsx' },
    { name: 'home-docs-layout', type: 'tsx', path: './app/docs/layout.tsx' },
    { name: 'home-page', type: 'tsx', path: './app/page.tsx' },

    // Config
    { name: 'home-config', type: 'ts', path: './config.ts' },

    // Mdx
    { name: 'about', type: 'mdx', path: './app/docs/about/page.mdx' },
    { name: 'main', type: 'mdx', path: './app/docs/page.mdx' },
    { name: 'code-block', type: 'mdx', path: './app/docs/features/code-block/page.mdx' },
    { name: 'test', type: 'mdx', path: './app/docs/features/test/page.mdx' },
];

// Function to configure components based on the response and package manager
export const configureComp = async (response: responseT, pm: string) => {
    // List of dyanmic components that should always be installed
    const alwaysInstall = [
        // UI components
        { name: 'dialog', type: 'tsx', path: './components/ui/dialog.tsx' },
        { name: 'command', type: 'tsx', path: './components/ui/command.tsx' },

        // Doxium components
        { name: 'copy-button', type: 'tsx', path: '$COMPONENTS-ALIAS/copy-button.tsx' },
        { name: 'navbar', type: 'tsx', path: '$COMPONENTS-ALIAS/navbar.tsx' },
        { name: 'cmdk', type: 'tsx', path: '$COMPONENTS-ALIAS/cmdk.tsx' },
        { name: 'docs-code-wrapper-icon', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-code-wrapper-icon.tsx' },
        { name: 'docs-folder', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-folder.tsx' },
        { name: 'docs-link', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-link.tsx' },
        { name: 'docs-mdx-components', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-mdx-components.tsx' },
        { name: 'docs-sidebar', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-sidebar.tsx' },
        { name: 'docs-nav', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-nav.tsx' },
        { name: 'docs-secondary-sidebar', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-secondary-sidebar.tsx' },
        { name: 'docs-hashtag', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-hashtag.tsx' },
        { name: 'docs-code-wrapper', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-code-wrapper.tsx' },
        { name: 'docs-breadcrumbs', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-breadcrumbs.tsx' },
        { name: 'docs-edit', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-edit.tsx' },
        { name: 'docs-scroll', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-scroll.tsx' },
        { name: 'docs-headings', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-headings.tsx' },
        { name: 'docs-toaster', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-toaster.tsx' },

        // Lib components
        { name: 'highlighter', type: 'ts', path: '$LIB-ALIAS/highlighter.ts' },
        { name: 'flatten-structure', type: 'ts', path: '$LIB-ALIAS/flatten-structure.ts' },
        { name: 'prettify-text', type: 'ts', path: '$LIB-ALIAS/prettify-text.ts' },
        { name: 'is-light-color', type: 'ts', path: '$LIB-ALIAS/is-light-color.ts' },
        { name: 'get-repo-link', type: 'ts', path: '$LIB-ALIAS/get-repo-link.ts' },
        { name: 'get-highlighter-theme', type: 'ts', path: '$LIB-ALIAS/get-highlighter-theme.ts' },
        { name: 'use-media-query', type: 'ts', path: '$LIB-ALIAS/use-media-query.ts' },

        // Config
        { name: 'types', type: 'ts', path: '$TYPES-ALIAS.ts' },
        { name: 'mdx-components', type: 'tsx', path: './mdx-components.tsx' },
        { name: 'next-config', type: 'mjs', path: './next.config.mjs' },
        { name: 'doxium', type: 'json', path: './doxium.json' },
    ].map((file) => {
        return {
            ...file,
            path: replaceFilePlaceholders(file.path, './components/doxium', './lib', './types'),
        };
    });

    console.log('\n' + infoText('Configuring Components...'));
    try {
        // Rename next.config.ts to next.config.mjs, needed for proper MDX configuration
        if (await fs.pathExists('./next.config.ts')) {
            await fs.rename('./next.config.ts', './next.config.mjs');
        }

        // Create components/doxium directory
        await fs.mkdir('components/doxium', { recursive: true });

        // Remove app/fonts directory
        await fs.rm('./app/fonts', { recursive: true });

        // Process alwaysInstall files
        await Promise.all(
            alwaysInstall.map(async (file) => {
                try {
                    const templatePath = path.join(templatesDir, `${file.type}`, `${file.name}.${file.type}`);
                    const content = replacePlaceholders(
                        await fs.readFile(templatePath, 'utf8'),
                        response,
                        '@/components/doxium',
                        '@/lib',
                        '@/types',
                    );

                    await fs.writeFile(file.path, content);
                } catch (error) {
                    console.error('Error configuring Components:', error);
                    process.exit(1);
                }
            }),
        );

        // Run prettier to format the code
        spawn.sync(pm, ['run', 'prettier', './', '-w'], { stdio: 'ignore' });

        // Process files based on whether home page is selected or not
        if (response['use-docs']) {
            // Create necessary directories for home page users
            await fs.mkdir('app/docs');
            await fs.mkdir('app/docs/about');
            await fs.mkdir('app/docs/features');
            await fs.mkdir('app/docs/features/code-block');
            await fs.mkdir('app/docs/features/test');
            await Promise.all(
                filesHome.map(async (file) => {
                    try {
                        const templatePath = path.join(templatesDir, `${file.type}`, `${file.name}.${file.type}`);
                        const content = replacePlaceholders(
                            await fs.readFile(templatePath, 'utf8'),
                            response,
                            '@/components/doxium',
                            '@/lib',
                            '@/types',
                        );
                        await fs.writeFile(file.path, content);
                    } catch (error) {
                        console.error('Error configuring Components:', error);
                        process.exit(1);
                    }
                }),
            );
        } else {
            // Remove app/page.tsx and create necessary directories for non-home page users
            await fs.rm('./app/page.tsx');
            await fs.mkdir('app/about');
            await fs.mkdir('app/features');
            await fs.mkdir('app/features/code-block');
            await fs.mkdir('app/features/test');
            await Promise.all(
                filesNoHome.map(async (file) => {
                    try {
                        const templatePath = path.join(templatesDir, `${file.type}`, `${file.name}.${file.type}`);
                        const content = replacePlaceholders(
                            await fs.readFile(templatePath, 'utf8'),
                            response,
                            '@/components/doxium',
                            '@/lib',
                            '@/types',
                        );
                        await fs.writeFile(file.path, content);
                    } catch (error) {
                        console.error('Error configuring Components:', error);
                        process.exit(1);
                    }
                }),
            );
        }

        // Run prettier again to format the code
        spawn.sync(pm, ['run', 'prettier', './', '-w'], { stdio: 'ignore' });
    } catch (error) {
        console.error('Error creating custom components:', error);
        process.exit(1);
    }

    console.log(successText('Components configured successfully!'));
};
