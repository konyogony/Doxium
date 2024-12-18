import path from 'path';
import spawn from 'cross-spawn';
import fs from 'fs-extra';
import { responseT } from '../utils/types.js';
import {
    errorText,
    infoText,
    replaceFilePlaceholders,
    replacePlaceholders,
    successText,
    templatesDir,
} from '../utils/utils.js';

export const configureShadcn = async (
    response: responseT,
    pmx: string[],
    pm: string,
    mute_output: boolean,
    typesAlias: string,
    libAlias: string,
    componentsAlias: string,
) => {
    // Check if the first element of pmx is not present to avoid errors
    if (!pmx[0]) return;

    console.log(77, typesAlias, libAlias, componentsAlias);

    const files = [
        { name: 'tailwind', type: 'ts', path: './tailwind.config.ts' },
        {
            name: 'globals',
            type: 'css',
            path: './app/globals.css',
        },
        { name: 'components', type: 'json', path: './components.json' },
        { name: 'utils', type: 'ts', path: '$LIB-ALIAS/utils.ts' },
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

    try {
        await fs.mkdir(componentsAlias.replaceAll('@/', '') ?? 'components/doxium', { recursive: true });
        await fs.mkdir(libAlias.replaceAll('@/', '') ?? 'lib', { recursive: true });
        typesAlias &&
            (await fs.mkdir(typesAlias.split('/').slice(0, -1).join('/').replaceAll('@/', ''), { recursive: true }));

        await fs.mkdir('components/ui', { recursive: true });

        spawn.sync(pm, ['run', 'prettier', './', '-w'], { stdio: 'ignore' });
        !mute_output && console.log('\n' + infoText('Installing shadcn...'));
        await Promise.all(
            files.map(async (file) => {
                try {
                    const templatePath = path.join(templatesDir, `${file.type}`, `${file.name}.${file.type}`);
                    const content = replacePlaceholders(
                        await fs.readFile(templatePath, 'utf8'),
                        response,
                        typesAlias ?? '@/components/doxium',
                        libAlias ?? '@/lib',
                        componentsAlias ?? '@/types',
                    );
                    await fs.writeFile(file.path, content);
                } catch (error) {
                    console.error(errorText(`Error configuring components: ${file.name}, error: ${error}`));
                    process.exit(1);
                }
            }),
        );

        // Install Shadcn components
        while (true) {
            const result = spawn.sync(
                pmx[0],
                [pmx[1], 'shadcn@latest', 'add', 'breadcrumb'].filter(
                    (str) => str !== '' && str !== undefined,
                ) as string[],
                { stdio: 'ignore' },
            );
            if (!result.error) break;
        }

        while (true) {
            const result = spawn.sync(
                pmx[0],
                [pmx[1], 'shadcn@latest', 'add', 'tabs'].filter((str) => str !== '' && str !== undefined) as string[],
                { stdio: 'ignore' },
            );
            if (!result.error) break;
        }

        while (true) {
            const result = spawn.sync(
                pmx[0],
                [pmx[1], 'shadcn@latest', 'add', 'button'].filter((str) => str !== '' && str !== undefined) as string[],
                { stdio: 'ignore' },
            );
            if (!result.error) break;
        }

        !mute_output && console.log(successText('Shadcn components installed successfully!'));

        spawn.sync(pm, ['run', 'prettier', './', '-w'], { stdio: 'ignore' });

        !mute_output && console.log(successText('Shadcn installed successfully!'));
    } catch (error) {
        console.error(errorText('Error configuring shadcn and installing components: ' + error));
        process.exit(1);
    }
};
