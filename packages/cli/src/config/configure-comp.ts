import path from 'path';
import { installDocsFolder } from '@/config/install-docs-folder';
import { installNoDocsFolder } from '@/config/install-no-docs-folder';
import { responseT } from '@/lib/types';
import { infoText, replacePlaceholders, successText, templatesDir } from '@/lib/utils';
import spawn from 'cross-spawn';
import fs from 'fs-extra';

export const configureComp = async (
    response: responseT,
    pm: string,
    empty: boolean,
    mute_output: boolean,
    update: boolean,
) => {
    const alwaysInstall = [
        { name: 'globals', type: 'css', path: './app/globals.css' },
        { name: 'postcss-config', type: 'mjs', path: './postcss.config.mjs' },
        { name: 'tsconfig', type: 'json', path: './tsconfig.json' },
        { name: 'next-config', type: 'ts', path: './next.config.ts' },
        { name: 'tailwind-config', type: 'ts', path: './tailwind.config.ts' },
        // Server:
        { name: 'alert', type: 'tsx', path: './doxium/components/alert.tsx' },
        { name: 'breadcrumb', type: 'tsx', path: './doxium/components/breadcrumb.tsx' },
        { name: 'button', type: 'tsx', path: './doxium/components/button.tsx' },
        { name: 'card', type: 'tsx', path: './doxium/components/card.tsx' },
        { name: 'code-wrapper', type: 'tsx', path: './doxium/components/code-wrapper.tsx' },
        { name: 'column', type: 'tsx', path: './doxium/components/column.tsx' },
        { name: 'command', type: 'tsx', path: './doxium/components/command.tsx' },
        { name: 'dialog', type: 'tsx', path: './doxium/components/dialog.tsx' },
        { name: 'footer', type: 'tsx', path: './doxium/components/footer.tsx' },
        { name: 'mdx-components', type: 'tsx', path: './doxium/components/mdx-components.tsx' },
        { name: 'outline', type: 'tsx', path: './doxium/components/outline.tsx' },
        { name: 'secondary-sidebar', type: 'tsx', path: './doxium/components/secondary-sidebar.tsx' },
        { name: 'sidebar-filetree', type: 'tsx', path: './doxium/components/sidebar-filetree.tsx' },
        { name: 'timeline', type: 'tsx', path: './doxium/components/timeline.tsx' },
        { name: 'video', type: 'tsx', path: './doxium/components/video.tsx' },
        { name: 'utils', type: 'ts', path: './doxium/utils.ts' },
        { name: 'types', type: 'ts', path: './doxium/types.ts' },
        { name: 'lib', type: 'ts', path: './doxium/lib.ts' },
        // Client:
        { name: 'accordion', type: 'tsx', path: './doxium/components/accordion.tsx' },
        { name: 'breadcrumbs', type: 'tsx', path: './doxium/components/breadcrumbs.tsx' },
        { name: 'cmdk', type: 'tsx', path: './doxium/components/cmdk.tsx' },
        { name: 'code-wrapper-icon', type: 'tsx', path: './doxium/components/code-wrapper-icon.tsx' },
        { name: 'copy-button', type: 'tsx', path: './doxium/components/copy-button.tsx' },
        { name: 'edit-button', type: 'tsx', path: './doxium/components/edit-button.tsx' },
        { name: 'filetree-navigation', type: 'tsx', path: './doxium/components/filetree-navigation.tsx' },
        { name: 'filetree', type: 'tsx', path: './doxium/components/filetree.tsx' },
        { name: 'hashtag-button', type: 'tsx', path: './doxium/components/hashtag-button.tsx' },
        { name: 'nav-buttons', type: 'tsx', path: './doxium/components/nav-buttons.tsx' },
        { name: 'navbar', type: 'tsx', path: './doxium/components/navbar.tsx' },
        { name: 'scroll-back-button', type: 'tsx', path: './doxium/components/scroll-back-button.tsx' },
        { name: 'tabs', type: 'tsx', path: './doxium/components/tabs.tsx' },
        { name: 'toaster', type: 'tsx', path: './doxium/components/toaster.tsx' },
        { name: 'toc', type: 'tsx', path: './doxium/components/toc.tsx' },
        { name: 'useMediaQuery', type: 'ts', path: './doxium/useMediaQuery.ts' },
        { name: 'gitignore', type: 'txt', path: './.gitignore' },
        !update && { name: 'doxium-config', type: 'ts', path: './doxium.config.ts' },
        !update && { name: 'favicon', type: 'ico', path: './public/favicon.ico' },
        !update && { name: 'Doxium-slim-dark', type: 'svg', path: './public/doxium/DoxiumDark.svg' },
        !update && { name: 'Doxium-slim-light', type: 'svg', path: './public/doxium/DoxiumLight.svg' },
        !update && { name: 'DX-slim-dark', type: 'svg', path: './public/doxium/DXDark.svg' },
        !update && { name: 'DX-slim-light', type: 'svg', path: './public/doxium/DXLight.svg' },
    ].filter((v) => v !== false);

    if (!mute_output) console.log();
    if (!mute_output) infoText('Configuring Components...');

    try {
        if (update) {
            console.log(1);
            if (fs.existsSync('./app')) await fs.rm('./app', { recursive: true });
            if (fs.existsSync('./doxium')) await fs.rm('./doxium', { recursive: true });
            await fs.mkdir('./app');
            await fs.mkdir('./doxium');
            await fs.mkdir('./doxium/components', { recursive: true });
        } else {
            spawn.sync(pm, ['run', 'prettier', './', '-w', '--ignore-path=.prettierignore'], { stdio: 'ignore' });

            if (fs.existsSync('./app/fonts')) await fs.rm('./app/fonts', { recursive: true });
            if (fs.existsSync('./app/favicon.ico')) await fs.rm('./app/favicon.ico', { recursive: true });

            const files = await fs.readdir('./public');
            await Promise.all(files.map((file) => fs.rm(`./public/${file}`, { recursive: true, force: true })));
            await fs.mkdir('./public/doxium');
            await fs.mkdir('./doxium');
            await fs.mkdir('./doxium/components');
        }
        await Promise.all(
            alwaysInstall.map(async (file) => {
                try {
                    console.log('configure-comp.ts', templatesDir, file.type, `${file.name}.${file.type}`);
                    const templatePath = path.join(templatesDir, file.type, `${file.name}.${file.type}`);
                    const content = replacePlaceholders(await fs.readFile(templatePath, 'utf8'), response);

                    await fs.writeFile(file.path, content);
                } catch (error) {
                    console.error('Error configuring Components:', error);
                    process.exit(1);
                }
            }),
        );

        spawn.sync(pm, ['run', 'prettier', './', '-w', '--ignore-path=.prettierignore'], { stdio: 'ignore' });
        if (response['use-docs'] === (typeof response['use-docs'] === 'boolean' ? true : 'true')) {
            installDocsFolder(response, pm, empty, update);
        } else {
            installNoDocsFolder(response, pm, empty, update);
        }
    } catch (error) {
        console.error('Error creating custom components:', error);
        process.exit(1);
    }

    if (!mute_output) successText('Components configured successfully!');
};
