import path from 'path';
import fs from 'fs-extra';
import { responseT } from '../utils/types.js';
import { infoText, successText } from '../utils/utils.js';

const filesAll = [
    // UI components
    { content: 'dialog', type: 'tsx', path: './components/ui/dialog.tsx' },
    { content: 'command', type: 'tsx', path: './components/ui/command.tsx' },

    // Doxium components
    { content: 'copy-button', type: 'tsx', path: './components/doxium/copy-button.tsx' },
    { content: 'cmdk', type: 'tsx', path: './components/doxium/cmdk.tsx' },
    { content: 'docs-code-wrapper-icon', type: 'tsx', path: './components/doxium/docs-code-wrapper-icon.tsx' },
    { content: 'docs-folder', type: 'tsx', path: './components/doxium/docs-folder.tsx' },
    { content: 'docs-link', type: 'tsx', path: './components/doxium/docs-link.tsx' },
    { content: 'docs-mdx-components', type: 'tsx', path: './components/doxium/docs-mdx-components.tsx' },
    { content: 'docs-sidebar', type: 'tsx', path: './components/doxium/docs-sidebar.tsx' },
    { content: 'docs-nav', type: 'tsx', path: './components/doxium/docs-nav.tsx' },
    { content: 'docs-secondary-sidebar', type: 'tsx', path: './components/doxium/docs-secondary-sidebar.tsx' },
    { content: 'docs-hashtag', type: 'tsx', path: './components/doxium/docs-hashtag.tsx' },
    { content: 'docs-code-wrapper', type: 'tsx', path: './components/doxium/docs-code-wrapper.tsx' },
    { content: 'docs-breadcrumbs', type: 'tsx', path: './components/doxium/docs-breadcrumbs.tsx' },

    // Lib components
    { content: 'code-wrapper-singleton', type: 'ts', path: './lib/code-wrapper-singleton.ts' },
    { content: 'flatten-structure', type: 'ts', path: './lib/flatten-structure.ts' },
    { content: 'prettify-text', type: 'ts', path: './lib/prettify-text.ts' },

    // Config
    { content: 'types', type: 'ts', path: './types.ts' },
    { content: 'mdx-components', type: 'tsx', path: './mdx-components.tsx' },
    { content: 'next-config', type: 'mjs', path: './next.config.mjs' },
];

const filesNoHome = [
    // UI components
    { content: 'main-layout', type: 'tsx', path: './app/layout.tsx' },

    // Config
    { content: 'config', type: 'ts', path: './config.ts' },

    // Mdx
    { content: 'about', type: 'mdx', path: './app/about/page.mdx' },
    { content: 'main', type: 'mdx', path: './app/page.mdx' },
    { content: 'code-block', type: 'mdx', path: './app/features/code-block/page.mdx' },
    { content: 'test', type: 'mdx', path: './app/features/test/page.mdx' },
];

const filesHome = [
    // UI components
    { content: 'home-main-layout', type: 'tsx', path: './app/layout.tsx' },
    { content: 'home-docs-layout', type: 'tsx', path: './app/docs/layout.tsx' },
    { content: 'home-page', type: 'tsx', path: './app/page.tsx' },

    // Config
    { content: 'home-config', type: 'ts', path: './config.ts' },

    // Mdx
    { content: 'about', type: 'mdx', path: './app/docs/about/page.mdx' },
    { content: 'main', type: 'mdx', path: './app/docs/page.mdx' },
    { content: 'code-block', type: 'mdx', path: './app/docs/features/code-block/page.mdx' },
    { content: 'test', type: 'mdx', path: './app/docs/features/test/page.mdx' },
];

const templatesDir = path.resolve(__dirname, '../templates');

export const configureComp = async (response: responseT) => {
    console.log('\n' + infoText('Configuring Components...'));
    try {
        await fs.rename('./next.config.ts', './next.config.mjs');
        await fs.mkdir('components/doxium');
        await fs.rm('./app/fonts', { recursive: true });

        await Promise.all(
            filesAll.map(async (file) => {
                try {
                    const templatePath = path.join(
                        templatesDir,
                        `${file.type}`,
                        `${file.content}.template.${file.type}`,
                    );
                    const content = (await fs.readFile(templatePath, 'utf8')).replace(/\/\/ @ts-nocheck\n/, '');

                    await fs.writeFile(file.path, content);
                } catch (error) {
                    console.error('Error configuring Components:', error);
                    process.exit(1);
                }
            }),
        );

        if (response['home-page']) {
            await fs.mkdir('app/docs');
            await fs.mkdir('app/docs/about');
            await fs.mkdir('app/docs/features');
            await fs.mkdir('app/docs/features/code-block');
            await fs.mkdir('app/docs/features/test');
            await Promise.all(
                filesHome.map(async (file) => {
                    try {
                        const templatePath = path.join(
                            templatesDir,
                            `${file.type}`,
                            `${file.content}.template.${file.type}`,
                        );
                        const content = (await fs.readFile(templatePath, 'utf8')).replace(/\/\/ @ts-nocheck\n/, '');

                        await fs.writeFile(file.path, content);
                    } catch (error) {
                        console.error('Error configuring Components:', error);
                        process.exit(1);
                    }
                }),
            );
        } else {
            await fs.rm('./app/page.tsx');
            await fs.mkdir('app/about');
            await fs.mkdir('app/features');
            await fs.mkdir('app/features/code-block');
            await fs.mkdir('app/features/test');
            await Promise.all(
                filesNoHome.map(async (file) => {
                    try {
                        const templatePath = path.join(
                            templatesDir,
                            `${file.type}`,
                            `${file.content}.template.${file.type}`,
                        );
                        const content = (await fs.readFile(templatePath, 'utf8')).replace(/\/\/ @ts-nocheck\n/, '');

                        await fs.writeFile(file.path, content);
                    } catch (error) {
                        console.error('Error configuring Components:', error);
                        process.exit(1);
                    }
                }),
            );
        }
    } catch (error) {
        console.error('Error renaming and creating folders:', error);
        process.exit(1);
    }

    console.log(successText('Components configured successfully!'));
};
