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
) => {
    const alwaysInstall = [
        { name: 'dialog', type: 'tsx', path: './components/ui/dialog.tsx' },
        { name: 'command', type: 'tsx', path: './components/ui/command.tsx' },
        { name: 'button', type: 'tsx', path: './components/ui/button.tsx' },
        { name: 'breadcrumb', type: 'tsx', path: './components/ui/breadcrumb.tsx' },
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
        { name: 'useMediaQuery', type: 'ts', path: '$LIB-ALIAS/useMediaQuery.ts' },
        { name: 'types', type: 'ts', path: '$LIB-ALIAS/types.ts' },
        { name: 'utils', type: 'ts', path: '$LIB-ALIAS/utils.ts' },
        { name: 'lib', type: 'ts', path: '$LIB-ALIAS/lib.ts' },
        { name: 'next-config', type: 'mjs', path: './next.config.mjs' },
        { name: 'postcss-config', type: 'mjs', path: './postcss.config.mjs' },
        { name: 'tailwind-config', type: 'ts', path: './tailwind.config.ts' },
        { name: 'doxium-config', type: 'ts', path: './doxium.config.ts' },
        { name: 'tsconfig', type: 'json', path: './tsconfig.json' },
        { name: 'favicon', type: 'ico', path: './app/favicon.ico' },
        { name: 'Doxium-slim-dark', type: 'svg', path: './public/Doxium-slim-dark.svg' },
        { name: 'Doxium-slim-light', type: 'svg', path: './public/Doxium-slim-light.svg' },
        { name: 'DX-slim-dark', type: 'svg', path: './public/DX-slim-dark.svg' },
        { name: 'DX-slim-light', type: 'svg', path: './public/DX-slim-light.svg' },
        { name: 'globals', type: 'css', path: './app/globals.css' },
    ].map((file) => {
        return {
            ...file,
            path: replaceFilePlaceholders(file.path, componentsAlias ?? 'components/doxium', libAlias ?? 'lib'),
        };
    });

    !mute_output && console.log('\n' + infoText('Configuring Components...'));

    try {
        await fs.mkdir(componentsAlias ? componentsAlias.replaceAll('@/', '') : 'components/doxium', {
            recursive: true,
        });

        await fs.mkdir(libAlias ? libAlias.replaceAll('@/', '') : 'lib', { recursive: true });

        await fs.mkdir('components/ui', { recursive: true });

        spawn.sync(pm, ['run', 'prettier', './', '-w'], { stdio: 'ignore' });

        // Rename next.config.ts to next.config.mjs, needed for proper MDX configuration
        if (await fs.pathExists('./next.config.ts')) {
            await fs.rename('./next.config.ts', './next.config.mjs');
        }

        // Remove app/fonts directory if it exists
        if (await fs.pathExists('./app/fonts')) {
            await fs.rm('./app/fonts', { recursive: true });
        }

        // Remove all files in app/public directory if it exists
        if (await fs.pathExists('./public')) {
            await fs.rm('./public/*', { recursive: true, force: true });
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

        if (response['use-docs']) {
            installDocsFolder(response, pm, empty, libAlias, componentsAlias);
        } else {
            installNoDocsFolder(response, pm, empty, libAlias, componentsAlias);
        }
    } catch (error) {
        console.error('Error creating custom components:', error);
        process.exit(1);
    }

    !mute_output && console.log(successText('Components configured successfully!'));
};
