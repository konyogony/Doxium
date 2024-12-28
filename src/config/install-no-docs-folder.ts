import path from 'path';
import spawn from 'cross-spawn';
import fs from 'fs-extra';
import { responseT } from '../utils/types.js';
import { replacePlaceholders, templatesDir } from '../utils/utils.js';

export const installNoDocsFolder = async (
    response: responseT,
    pm: string,
    empty: boolean,
    typesAlias: string,
    libAlias: string,
    componentsAlias: string,
) => {
    const filesNoHome = [
        { name: 'no-folder-filetree-root-layout', type: 'tsx', path: './app/layout.tsx' },
        !empty && { name: 'about', type: 'mdx', path: './app/about/page.mdx' },
        !empty && { name: 'getting-started', type: 'mdx', path: './app/page.mdx' },
        !empty && { name: 'code-block', type: 'mdx', path: './app/components/code-block/page.mdx' },
        !empty && { name: 'alerts', type: 'mdx', path: './app/components/alerts/page.mdx' },
        !empty && { name: 'cards', type: 'mdx', path: './app/components/cards/page.mdx' },
        !empty && { name: 'routing', type: 'mdx', path: './app/features/routing/page.mdx' },
        !empty && { name: 'mdx', type: 'mdx', path: './app/features/mdx/page.mdx' },
        !empty && { name: 'sort-root', type: 'json', path: './app/_sort.json' },
    ].filter((file) => file !== false);

    try {
        await fs.rm('./app/page.tsx');

        if (!empty) {
            await fs.mkdir('app/about');
            await fs.mkdir('app/features');
            await fs.mkdir('app/components');
            await fs.mkdir('app/components/code-block');
            await fs.mkdir('app/components/alerts');
            await fs.mkdir('app/components/cards');
            await fs.mkdir('app/features/routing');
            await fs.mkdir('app/features/mdx');
        }

        await Promise.all(
            filesNoHome.map(async (file) => {
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

        spawn.sync(pm, ['run', 'prettier', './', '-w'], { stdio: 'ignore' });
    } catch (error) {
        console.error('Error creating custom components:', error);
        process.exit(1);
    }
};
