import path from 'path';
import spawn from 'cross-spawn';
import fs from 'fs-extra';
import { responseT } from '../utils/types.js';
import { infoText, replacePlaceholders, successText, templatesDir } from '../utils/utils.js';
import { installDocsFolder } from './install-docs-folder.js';
import { installNoDocsFolder } from './install-no-docs-folder.js';

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
        !update && { name: 'doxium-config', type: 'ts', path: './doxium.config.ts' },
        !update && { name: 'favicon', type: 'ico', path: './public/favicon.ico' },
        !update && { name: 'Doxium-slim-dark', type: 'svg', path: './public/doxium/DoxiumDark.svg' },
        !update && { name: 'Doxium-slim-light', type: 'svg', path: './public/doxium/DoxiumLight.svg' },
        !update && { name: 'DX-slim-dark', type: 'svg', path: './public/doxium/DXDark.svg' },
        !update && { name: 'DX-slim-light', type: 'svg', path: './public/doxium/DXLight.svg' },
    ].filter((v) => v !== false);

    !mute_output && console.log('\n' + infoText('Configuring Components...'));

    try {
        if (update) {
            await fs.rm('./app', { recursive: true });
            await fs.mkdir('./app');
        } else {
            spawn.sync(pm, ['run', 'prettier', './', '-w'], { stdio: 'ignore' });

            await fs.rm('./app/fonts', { recursive: true });
            await fs.rm('./app/favicon.ico', { recursive: true });

            const files = await fs.readdir('./public');
            await Promise.all(files.map((file) => fs.rm(`./public/${file}`, { recursive: true, force: true })));
            await fs.mkdir('./public/doxium');
        }
        await Promise.all(
            alwaysInstall.map(async (file) => {
                try {
                    const templatePath = path.join(templatesDir, file.type, `${file.name}.${file.type}`);
                    const content = replacePlaceholders(await fs.readFile(templatePath, 'utf8'), response);

                    await fs.writeFile(file.path, content);
                } catch (error) {
                    console.error('Error configuring Components:', error);
                    process.exit(1);
                }
            }),
        );

        spawn.sync(pm, ['run', 'prettier', './', '-w'], { stdio: 'ignore' });
        if (response['use-docs'] === (typeof response['use-docs'] === 'boolean' ? true : 'true')) {
            installDocsFolder(response, pm, empty, update);
        } else {
            installNoDocsFolder(response, pm, empty, update);
        }
    } catch (error) {
        console.error('Error creating custom components:', error);
        process.exit(1);
    }

    !mute_output && console.log(successText('Components configured successfully!'));
};
