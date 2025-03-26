import path from 'path';
import { errorText, templatesDir } from '@/lib/utils';
import fs from 'fs-extra';

const files = [
    { name: 'prettierrc', type: 'json', path: './.prettierrc.json' },
    { name: 'prettierignore', type: 'json', path: './.prettierignore' },
];

export const installPrettier = async () => {
    await Promise.all(
        files.map(async (file) => {
            try {
                console.log('install-prettier.ts', templatesDir, file.type, file.name, file.path);
                const templatePath = path.join(templatesDir, `${file.type}`, `${file.name}.${file.type}`);
                const content = await fs.readFile(templatePath, 'utf8');

                await fs.writeFile(file.path, content);
            } catch (error) {
                errorText(`Error configuring prettier: ${file.name}, error: ${error}`);
                process.exit(1);
            }
        }),
    );
};
