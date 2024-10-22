import path from 'path';
import spawn from 'cross-spawn';
import fs from 'fs-extra';
import { responseT } from '../utils/types.js';
import { infoText, replacePlaceholders, successText } from '../utils/utils.js';

// List of components that should always be installed
const alwaysInstall = [
    // UI components
    { name: 'dialog', type: 'tsx', path: './components/ui/dialog.tsx' },
    { name: 'command', type: 'tsx', path: './components/ui/command.tsx' },

    // Doxium components
    { name: 'copy-button', type: 'tsx', path: './components/doxium/copy-button.tsx' },
    { name: 'cmdk', type: 'tsx', path: './components/doxium/cmdk.tsx' },
    { name: 'docs-code-wrapper-icon', type: 'tsx', path: './components/doxium/docs-code-wrapper-icon.tsx' },
    { name: 'docs-folder', type: 'tsx', path: './components/doxium/docs-folder.tsx' },
    { name: 'docs-link', type: 'tsx', path: './components/doxium/docs-link.tsx' },
    { name: 'docs-mdx-components', type: 'tsx', path: './components/doxium/docs-mdx-components.tsx' },
    { name: 'docs-sidebar', type: 'tsx', path: './components/doxium/docs-sidebar.tsx' },
    { name: 'docs-nav', type: 'tsx', path: './components/doxium/docs-nav.tsx' },
    { name: 'docs-secondary-sidebar', type: 'tsx', path: './components/doxium/docs-secondary-sidebar.tsx' },
    { name: 'docs-hashtag', type: 'tsx', path: './components/doxium/docs-hashtag.tsx' },
    { name: 'docs-code-wrapper', type: 'tsx', path: './components/doxium/docs-code-wrapper.tsx' },
    { name: 'docs-breadcrumbs', type: 'tsx', path: './components/doxium/docs-breadcrumbs.tsx' },
    { name: 'docs-edit', type: 'tsx', path: './components/doxium/docs-edit.tsx' },
    { name: 'docs-scroll', type: 'tsx', path: './components/doxium/docs-scroll.tsx' },
    { name: 'docs-headings', type: 'tsx', path: './components/doxium/docs-headings.tsx' },

    // Lib components
    { name: 'highlighter', type: 'ts', path: './lib/highlighter.ts' },
    { name: 'flatten-structure', type: 'ts', path: './lib/flatten-structure.ts' },
    { name: 'prettify-text', type: 'ts', path: './lib/prettify-text.ts' },
    { name: 'is-light-color', type: 'ts', path: './lib/is-light-color.ts' },
    { name: 'get-repo-link', type: 'ts', path: './lib/get-repo-link.ts' },

    // Config
    { name: 'types', type: 'ts', path: './types.ts' },
    { name: 'mdx-components', type: 'tsx', path: './mdx-components.tsx' },
    { name: 'next-config', type: 'mjs', path: './next.config.mjs' },
    { name: 'doxium', type: 'json', path: './doxium.json' },
];

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

// Path to the templates directory
const templatesDir = path.resolve(__dirname, '../templates');

// Function to configure components based on the response and package manager
export const configureComp = async (response: responseT, pm: string) => {
    console.log('\n' + infoText('Configuring Components...'));
    try {
        // Rename next.config.ts to next.config.mjs, needed for proper MDX configuration
        await fs.rename('./next.config.ts', './next.config.mjs');

        // Create components/doxium directory
        await fs.mkdir('components/doxium');

        // Remove app/fonts directory
        await fs.rm('./app/fonts', { recursive: true });

        // Process alwaysInstall files
        await Promise.all(
            alwaysInstall.map(async (file) => {
                try {
                    const templatePath = path.join(templatesDir, `${file.type}`, `${file.name}.${file.type}`);
                    const content = replacePlaceholders(await fs.readFile(templatePath, 'utf8'), response);

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
        if (response['home-page']) {
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
                        const content = replacePlaceholders(await fs.readFile(templatePath, 'utf8'), response);

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
                        const content = replacePlaceholders(await fs.readFile(templatePath, 'utf8'), response);
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
