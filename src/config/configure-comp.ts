import path from 'path';
import spawn from 'cross-spawn';
import fs from 'fs-extra';
import { responseT } from '../utils/types.js';
import { infoText, replaceFilePlaceholders, replacePlaceholders, successText, templatesDir } from '../utils/utils.js';
import { installDocsFolder } from './install-docs-folder.js';
import { installNoDocsFolder } from './install-no-docs-folder.js';

export const configureComp = async (response: responseT, pm: string, empty: boolean, mute_output: boolean) => {
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
        { name: 'docs-tabs', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-tabs.tsx' },
        { name: 'docs-alerts', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-alerts.tsx' },
        { name: 'docs-cards', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-cards.tsx' },
        { name: 'docs-cards-group', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-cards-group.tsx' },

        // Lib components
        { name: 'highlighter', type: 'ts', path: '$LIB-ALIAS/highlighter.ts' },
        { name: 'flatten-structure', type: 'ts', path: '$LIB-ALIAS/flatten-structure.ts' },
        { name: 'prettify-text', type: 'ts', path: '$LIB-ALIAS/prettify-text.ts' },
        { name: 'is-light-color', type: 'ts', path: '$LIB-ALIAS/is-light-color.ts' },
        { name: 'get-json-data', type: 'ts', path: '$LIB-ALIAS/get-json-data.ts' },
        { name: 'use-media-query', type: 'ts', path: '$LIB-ALIAS/use-media-query.ts' },
        { name: 'structure', type: 'ts', path: '$LIB-ALIAS/structure.ts' },

        // Config
        { name: 'types', type: 'ts', path: '$TYPES-ALIAS.ts' },
        { name: 'mdx-components', type: 'tsx', path: './mdx-components.tsx' },
        { name: 'next-config', type: 'mjs', path: './next.config.mjs' },
        { name: 'doxium', type: 'json', path: './doxium.json' },
        { name: 'tsconfig', type: 'json', path: './tsconfig.json' },
    ].map((file) => {
        return {
            ...file,
            path: replaceFilePlaceholders(file.path, 'components/doxium', 'lib', 'types'),
        };
    });

    !mute_output && console.log('\n' + infoText('Configuring Components...'));
    try {
        // Rename next.config.ts to next.config.mjs, needed for proper MDX configuration
        if (await fs.pathExists('./next.config.ts')) {
            await fs.rename('./next.config.ts', './next.config.mjs');
        }

        await fs.mkdir('components/doxium', { recursive: true });

        // Remove app/fonts directory
        await fs.rm('./app/fonts', { recursive: true });

        await Promise.all(
            alwaysInstall.map(async (file) => {
                try {
                    const templatePath = path.join(templatesDir, file.type, `${file.name}.${file.type}`);
                    const content = replacePlaceholders(
                        await fs.readFile(templatePath, 'utf8'),
                        response,
                        '@/components/doxium',
                        '@/lib',
                        '@/types',
                        'components/doxium',
                    );

                    await fs.writeFile(file.path, content);
                } catch (error) {
                    console.error('Error configuring Components:', error);
                    process.exit(1);
                }
            }),
        );

        spawn.sync(pm, ['run', 'prettier', './', '-w'], { stdio: 'ignore' });

        if (response['use-docs']) {
            installDocsFolder(response, pm, empty);
        } else {
            installNoDocsFolder(response, pm, empty);
        }
    } catch (error) {
        console.error('Error creating custom components:', error);
        process.exit(1);
    }

    !mute_output && console.log(successText('Components configured successfully!'));
};
