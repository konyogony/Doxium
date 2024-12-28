import path from 'path';
import spawn from 'cross-spawn';
import fs from 'fs-extra';
import { responseT } from '../utils/types.js';
import { replacePlaceholders, templatesDir } from '../utils/utils.js';

export const installDocsFolder = async (
    response: responseT,
    pm: string,
    empty: boolean,
    typesAlias: string,
    libAlias: string,
    componentsAlias: string,
) => {
    const filesHome = [
        { name: 'docs-folder-root-layout', type: 'tsx', path: './app/layout.tsx' },
        { name: 'docs-folder-docs-layout', type: 'tsx', path: './app/docs/layout.tsx' },
        { name: 'docs-folder-home-page', type: 'tsx', path: './app/page.tsx' },
        !empty && { name: 'about', type: 'mdx', path: './app/docs/about/page.mdx' },
        !empty && { name: 'getting-started', type: 'mdx', path: './app/docs/page.mdx' },
        !empty && { name: 'code-block', type: 'mdx', path: './app/docs/components/code-block/page.mdx' },
        !empty && { name: 'alerts', type: 'mdx', path: './app/docs/components/alerts/page.mdx' },
        !empty && { name: 'cards', type: 'mdx', path: './app/docs/components/cards/page.mdx' },
        !empty && { name: 'routing', type: 'mdx', path: './app/docs/features/routing/page.mdx' },
        !empty && { name: 'mdx', type: 'mdx', path: './app/docs/features/mdx/page.mdx' },
        !empty && { name: 'sort-root', type: 'json', path: './app/docs/_sort.json' },
    ].filter((file) => file !== false);

    try {
        await fs.mkdir('app/docs');

        if (!empty) {
            await fs.mkdir('app/docs/about');
            await fs.mkdir('app/docs/features');
            await fs.mkdir('app/docs/components');
            await fs.mkdir('app/docs/components/code-block');
            await fs.mkdir('app/docs/components/alerts');
            await fs.mkdir('app/docs/components/cards');
            await fs.mkdir('app/docs/features/routing');
            await fs.mkdir('app/docs/features/mdx');
        }

        await Promise.all(
            filesHome.map(async (file) => {
                try {
                    const templatePath = path.join(templatesDir, `${file.type}`, `${file.name}.${file.type}`);
                    const content = replacePlaceholders(
                        await fs.readFile(templatePath, 'utf8'),
                        response,
                        componentsAlias ?? '@/components/doxium',
                        libAlias ?? '@/lib',
                        typesAlias ?? '@/types',
                    );
                    await fs.writeFile(file.path, content);
                } catch (error) {
                    console.error('Error configuring Components:', error);
                    process.exit(1);
                }
            }),
        );

        spawn.sync(pm, ['run', 'prettier', './', '-w'], { stdio: 'inherit' });
    } catch (error) {
        console.error('Error creating custom components:', error);
        process.exit(1);
    }
};
