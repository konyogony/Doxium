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
    libAlias: string,
    componentsAlias: string,
    update: boolean,
) => {
    const alwaysInstall = [
        { name: 'dialog', type: 'tsx', path: '$COMPONENTS-ALIAS/dialog.tsx' },
        { name: 'command', type: 'tsx', path: '$COMPONENTS-ALIAS/command.tsx' },
        { name: 'button', type: 'tsx', path: '$COMPONENTS-ALIAS/button.tsx' },
        { name: 'breadcrumb', type: 'tsx', path: '$COMPONENTS-ALIAS/breadcrumb.tsx' },
        { name: 'copy-button', type: 'tsx', path: '$COMPONENTS-ALIAS/copy-button.tsx' },
        { name: 'navbar', type: 'tsx', path: '$COMPONENTS-ALIAS/navbar.tsx' },
        { name: 'cmdk', type: 'tsx', path: '$COMPONENTS-ALIAS/cmdk.tsx' },
        { name: 'code-wrapper-icon', type: 'tsx', path: '$COMPONENTS-ALIAS/code-wrapper-icon.tsx' },
        { name: 'filetree-navigation', type: 'tsx', path: '$COMPONENTS-ALIAS/filetree-navigation.tsx' },
        { name: 'mdx-components', type: 'tsx', path: '$COMPONENTS-ALIAS/mdx-components.tsx' },
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
        { name: 'alert', type: 'tsx', path: '$COMPONENTS-ALIAS/alert.tsx' },
        { name: 'card', type: 'tsx', path: '$COMPONENTS-ALIAS/card.tsx' },
        { name: 'column', type: 'tsx', path: '$COMPONENTS-ALIAS/column.tsx' },
        { name: 'footer', type: 'tsx', path: '$COMPONENTS-ALIAS/footer.tsx' },
        { name: 'timeline', type: 'tsx', path: '$COMPONENTS-ALIAS/timeline.tsx' },
        { name: 'filetree', type: 'tsx', path: '$COMPONENTS-ALIAS/filetree.tsx' },
        { name: 'image', type: 'tsx', path: '$COMPONENTS-ALIAS/image.tsx' },
        { name: 'video', type: 'tsx', path: '$COMPONENTS-ALIAS/video.tsx' },
        { name: 'accordion', type: 'tsx', path: '$COMPONENTS-ALIAS/accordion.tsx' },
        { name: 'outline', type: 'tsx', path: '$COMPONENTS-ALIAS/outline.tsx' },
        { name: 'useMediaQuery', type: 'ts', path: '$LIB-ALIAS/useMediaQuery.ts' },
        { name: 'types', type: 'ts', path: '$LIB-ALIAS/types.ts' },
        { name: 'utils', type: 'ts', path: '$LIB-ALIAS/utils.ts' },
        { name: 'lib', type: 'ts', path: '$LIB-ALIAS/lib.ts' },
        { name: 'next-config', type: 'mjs', path: './next.config.mjs' },
        { name: 'postcss-config', type: 'mjs', path: './postcss.config.mjs' },
        { name: 'tailwind-config', type: 'ts', path: './tailwind.config.ts' },
        { name: 'globals', type: 'css', path: './app/globals.css' },
        { name: 'tsconfig', type: 'json', path: './tsconfig.json' },
        !update && { name: 'doxium-config', type: 'ts', path: './doxium.config.ts' },
        !update && { name: 'favicon', type: 'ico', path: './public/favicon.ico' },
        !update && { name: 'Doxium-slim-dark', type: 'svg', path: './public/doxium/DoxiumDark.svg' },
        !update && { name: 'Doxium-slim-light', type: 'svg', path: './public/doxium/DoxiumLight.svg' },
        !update && { name: 'DX-slim-dark', type: 'svg', path: './public/doxium/DXDark.svg' },
        !update && { name: 'DX-slim-light', type: 'svg', path: './public/doxium/DXLight.svg' },
    ]
        .filter((v) => v !== false)
        .map((file) => {
            return {
                ...file,
                path: replaceFilePlaceholders(file.path, componentsAlias ?? 'components/doxium', libAlias ?? 'lib'),
            };
        });

    !mute_output && console.log('\n' + infoText('Configuring Components...'));

    try {
        if (update) {
            await fs.rm('./app', { recursive: true });
            await fs.rm('./components', { recursive: true });
            await fs.mkdir('./app');
            await fs.mkdir(componentsAlias ? componentsAlias.replaceAll('@/', '') : 'components/doxium', {
                recursive: true,
            });
            await fs.mkdir(libAlias ? libAlias.replaceAll('@/', '') : 'lib', { recursive: true });
        } else {
            await fs.mkdir(componentsAlias ? componentsAlias.replaceAll('@/', '') : 'components/doxium', {
                recursive: true,
            });

            await fs.mkdir(libAlias ? libAlias.replaceAll('@/', '') : 'lib', { recursive: true });

            spawn.sync(pm, ['run', 'prettier', './', '-w'], { stdio: 'ignore' });

            // Rename next.config.ts to next.config.mjs, needed for proper MDX configuration
            if (await fs.pathExists('./next.config.ts')) {
                await fs.rename('./next.config.ts', './next.config.mjs');
            }

            // Remove app/fonts directory if it exists
            if (await fs.pathExists('./app/fonts')) {
                await fs.rm('./app/fonts', { recursive: true });
            }

            await fs.rm('./app/favicon.ico', { recursive: true });

            // Remove all files in app/public directory if it exists
            if ((await fs.pathExists('./public')) && !update) {
                await fs.rm('./public/*', { recursive: true, force: true });
            }
        }
        await Promise.all(
            alwaysInstall.map(async (file) => {
                try {
                    const templatePath = path.join(templatesDir, file.type, `${file.name}.${file.type}`);
                    const content = replacePlaceholders(
                        await fs.readFile(templatePath, 'utf8'),
                        response,
                        componentsAlias ?? '@/components/doxium',
                        libAlias ?? '@/lib',
                    );

                    await fs.writeFile(file.path, content);
                } catch (error) {
                    console.error('Error configuring Components:', error);
                    process.exit(1);
                }
            }),
        );

        spawn.sync(pm, ['run', 'prettier', './', '-w'], { stdio: 'ignore' });
        if (response['use-docs'] === (typeof response['use-docs'] === 'boolean' ? true : 'true')) {
            installDocsFolder(response, pm, empty, libAlias, componentsAlias, update);
        } else {
            installNoDocsFolder(response, pm, empty, libAlias, componentsAlias, update);
        }
    } catch (error) {
        console.error('Error creating custom components:', error);
        process.exit(1);
    }

    !mute_output && console.log(successText('Components configured successfully!'));
};
