import path from 'path';
import spawn from 'cross-spawn';
import fs from 'fs-extra';
import { responseT } from '../utils/types.js';
import { infoText, replaceFilePlaceholders, replacePlaceholders, successText, templatesDir } from '../utils/utils.js';
import { installDocsFolder } from './install-docs-folder.js';
import { installNoDocsFolder } from './install-no-docs-folder.js';

export const configureComp = async (
    response: responseT,
    pm: string,
    empty: boolean,
    mute_output: boolean,
    typesAlias: string,
    libAlias: string,
    componentsAlias: string,
) => {
    const alwaysInstall = [
        // UI components
        { name: 'dialog', type: 'tsx', path: './components/ui/dialog.tsx' },
        { name: 'command', type: 'tsx', path: './components/ui/command.tsx' },
        // Doxium components
        { name: 'copy-button', type: 'tsx', path: '$COMPONENTS-ALIAS/copy-button.tsx' },
        { name: 'navbar', type: 'tsx', path: '$COMPONENTS-ALIAS/navbar.tsx' },
        { name: 'cmdk', type: 'tsx', path: '$COMPONENTS-ALIAS/cmdk.tsx' },
        { name: 'code-wrapper-icon', type: 'tsx', path: '$COMPONENTS-ALIAS/code-wrapper-icon.tsx' },
        { name: 'folder-filetree', type: 'tsx', path: '$COMPONENTS-ALIAS/folder-filetree.tsx' },
        { name: 'link-filetree', type: 'tsx', path: '$COMPONENTS-ALIAS/link-filetree.tsx' },
        { name: 'docs-mdx-components', type: 'tsx', path: '$COMPONENTS-ALIAS/docs-mdx-components.tsx' },
        { name: 'sidebar-filetree', type: 'tsx', path: '$COMPONENTS-ALIAS/sidebar-filetree.tsx' },
        { name: 'nav-buttons', type: 'tsx', path: '$COMPONENTS-ALIAS/nav-buttons.tsx' },
        { name: 'secondary-sidebar', type: 'tsx', path: '$COMPONENTS-ALIAS/secondary-sidebar.tsx' },
        { name: 'hashtag-button', type: 'tsx', path: '$COMPONENTS-ALIAS/hashtag-button.tsx' },
        { name: 'code-wrapper', type: 'tsx', path: '$COMPONENTS-ALIAS/code-wrapper.tsx' },
        { name: 'breadcrumbs', type: 'tsx', path: '$COMPONENTS-ALIAS/breadcrumbs.tsx' },
        { name: 'edit-button', type: 'tsx', path: '$COMPONENTS-ALIAS/edit-button.tsx' },
        { name: 'scroll-back-button', type: 'tsx', path: '$COMPONENTS-ALIAS/scroll-back-button.tsx' },
        { name: 'toc', type: 'tsx', path: '$COMPONENTS-ALIAS/toc.tsx' },
        { name: 'toaster', type: 'tsx', path: '$COMPONENTS-ALIAS/toaster.tsx' },
        { name: 'tabs', type: 'tsx', path: '$COMPONENTS-ALIAS/tabs.tsx' },
        { name: 'alerts', type: 'tsx', path: '$COMPONENTS-ALIAS/alerts.tsx' },
        { name: 'card', type: 'tsx', path: '$COMPONENTS-ALIAS/card.tsx' },
        { name: 'card-group', type: 'tsx', path: '$COMPONENTS-ALIAS/card-group.tsx' },
        { name: 'footer', type: 'tsx', path: '$COMPONENTS-ALIAS/footer.tsx' },
        { name: 'timeline', type: 'tsx', path: '$COMPONENTS-ALIAS/timeline.tsx' },
        { name: 'filetree', type: 'tsx', path: '$COMPONENTS-ALIAS/filetree.tsx' },
        { name: 'image', type: 'tsx', path: '$COMPONENTS-ALIAS/image.tsx' },
        { name: 'video', type: 'tsx', path: '$COMPONENTS-ALIAS/video.tsx' },
        { name: 'accordion', type: 'tsx', path: '$COMPONENTS-ALIAS/accordion.tsx' },
        { name: 'outline', type: 'tsx', path: '$COMPONENTS-ALIAS/outline.tsx' },

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
        { name: 'postcss-config', type: 'mjs', path: './postcss.config.mjs' },
        { name: 'doxium-config', type: 'ts', path: './doxium.config.ts' },
        { name: 'doxium', type: 'json', path: './doxium.json' },
        { name: 'tsconfig', type: 'json', path: './tsconfig.json' },
        { name: 'favicon', type: 'ico', path: './app/favicon.ico' },
        { name: 'Doxium-slim', type: 'svg', path: './public/Doxium-slim.svg' },
        { name: 'DX-slim', type: 'svg', path: './public/DX-slim.svg' },
    ].map((file) => {
        return {
            ...file,
            path: replaceFilePlaceholders(
                file.path,
                componentsAlias ?? 'components/doxium',
                libAlias ?? 'lib',
                typesAlias ?? 'types',
            ),
        };
    });

    !mute_output && console.log('\n' + infoText('Configuring Components...'));
    try {
        // Rename next.config.ts to next.config.mjs, needed for proper MDX configuration
        if (await fs.pathExists('./next.config.ts')) {
            await fs.rename('./next.config.ts', './next.config.mjs');
        }

        // Remove app/fonts directory
        await fs.rm('./app/fonts', { recursive: true });
        await fs.rm('./app/public/*', { recursive: true, force: true });

        await Promise.all(
            alwaysInstall.map(async (file) => {
                try {
                    const templatePath = path.join(templatesDir, file.type, `${file.name}.${file.type}`);
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

        if (response['use-docs']) {
            installDocsFolder(response, pm, empty, typesAlias, libAlias, componentsAlias);
        } else {
            installNoDocsFolder(response, pm, empty, typesAlias, libAlias, componentsAlias);
        }
    } catch (error) {
        console.error('Error creating custom components:', error);
        process.exit(1);
    }

    !mute_output && console.log(successText('Components configured successfully!'));
};
