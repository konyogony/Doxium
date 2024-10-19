import path from 'path';
import fs from 'fs-extra';
import { infoText, successText } from '../utils/utils.js';

const files = [
    { content: 'cmdk', type: 'tsx', path: './components/ui/cmdk.tsx' },
    { content: 'code-wrapper-singleton', type: 'ts', path: './lib/code-wrapper-singleton.ts' },
    { content: 'command', type: 'tsx', path: './components/ui/command.tsx' },
    { content: 'config', type: 'ts', path: './config.ts' },
    { content: 'flatten-structure', type: 'ts', path: './lib/flatten-structure.ts' },
    { content: 'mdx-components', type: 'tsx', path: './mdx-components.tsx' },
    { content: 'prettify-text', type: 'ts', path: './lib/prettify-text.ts' },
    { content: 'types', type: 'ts', path: './types.ts' },
    { content: 'copy-button', type: 'tsx', path: './components/ui/copy-button.tsx' },
    { content: 'docs-code-wrapper-icon', type: 'tsx', path: './components/ui/docs-code-wrapper-icon.tsx' },
    { content: 'docs-folder', type: 'tsx', path: './components/ui/docs-folder.tsx' },
    { content: 'docs-link', type: 'tsx', path: './components/ui/docs-link.tsx' },
    { content: 'docs-mdx-components', type: 'tsx', path: './components/ui/docs-mdx-components.tsx' },
    { content: 'docs-sidebar', type: 'tsx', path: './components/ui/docs-sidebar.tsx' },
    { content: 'docs-nav', type: 'tsx', path: './components/ui/docs-nav.tsx' },
    { content: 'docs-secondary-sidebar', type: 'tsx', path: './components/ui/docs-secondary-sidebar.tsx' },
    { content: 'docs-hashtag', type: 'tsx', path: './components/ui/docs-hashtag.tsx' },
    { content: 'docs-code-wrapper', type: 'tsx', path: './components/ui/docs-code-wrapper.tsx' },
    { content: 'docs-breadcrumbs', type: 'tsx', path: './components/ui/docs-breadcrumbs.tsx' },
    { content: 'dialogue', type: 'tsx', path: './components/ui/dialogue.tsx' },
    { content: 'next-config', type: 'mjs', path: './next.config.mjs' },
    { content: 'docs-layout', type: 'tsx', path: './app/docs/layout.tsx' },
    { content: 'about', type: 'mdx', path: './app/docs/about/page.mdx' },
    { content: 'main', type: 'mdx', path: './app/docs/page.mdx' },
    { content: 'some-file', type: 'mdx', path: './app/docs/folder/some-file/page.mdx' },
    { content: 'test', type: 'mdx', path: './app/docs/folder/test/page.mdx' },
];

const templatesDir = path.resolve(__dirname, '../templates');

export const configureMdx = async () => {
    console.log('\n' + infoText('Configuring MDX Components...'));
    try {
        await fs.rename('./next.config.ts', './next.config.mjs');
        await fs.mkdir('app/docs');
        await fs.mkdir('app/docs/about');
        await fs.mkdir('app/docs/folder');
        await fs.mkdir('app/docs/folder/some-file');
        await fs.mkdir('app/docs/folder/test');
    } catch (error) {
        console.error('Error renaming and creating folders:', error);
        process.exit(1);
    }
    await Promise.all(
        files.map(async (file) => {
            try {
                const templatePath = path.join(templatesDir, `${file.content}.template.${file.type}`);
                const content = (await fs.readFile(templatePath, 'utf8')).replace(/\/\/ @ts-nocheck\n/, '');

                await fs.writeFile(file.path, content);
            } catch (error) {
                console.error('Error configuring MDX:', error);
                process.exit(1);
            }
        }),
    );

    console.log(successText('MDX Components configured successfully!'));
};
