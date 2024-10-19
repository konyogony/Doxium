import { execa } from 'execa';
import fs from 'fs-extra';
import { responseT } from '../utils/types.js';
import { errorText, successText } from '../utils/utils.js';

export const configurePrettier = async (response: responseT, pmi: string[], pm: string) => {
    try {
        await execa(
            pmi[0],
            [
                pmi[1],
                '--save-dev',
                'prettier',
                '@ianvs/prettier-plugin-sort-imports',
                'prettier-plugin-css-order',
                'prettier-plugin-organize-attributes',
                'prettier-plugin-tailwindcss',
            ].filter((str) => str !== ''),
            { stdio: 'ignore' },
        );

        const prettierConfigContent = `{
        "printWidth": 120,
        "tabWidth": 4,
        "useTabs": false,
        "semi": true,
        "singleQuote": true,
        "jsxSingleQuote": true,
        "endOfLine": "lf",
        "plugins": [
            "@ianvs/prettier-plugin-sort-imports",
            "prettier-plugin-css-order",
            "prettier-plugin-organize-attributes",
            "prettier-plugin-tailwindcss"
        ]
    }
    `;

        try {
            await fs.writeFile('./.prettierrc.json', prettierConfigContent);
        } catch (error) {
            console.error(errorText(`Error creating ${'.prettierrc.json'} file:`), error);
            process.exit(1);
        }

        await execa(pm, ['run', 'prettier', '.', '-w'], { stdio: 'ignore' });

        if (!response['prettier']) {
            await execa(
                pm,
                [
                    'remove',
                    'prettier',
                    '@ianvs/prettier-plugin-sort-imports',
                    'prettier-plugin-css-order',
                    'prettier-plugin-organize-attributes',
                    'prettier-plugin-tailwindcss',
                ],
                { stdio: 'ignore' },
            );
            try {
                await fs.remove('./.prettierrc.json');
            } catch (error) {
                console.error(errorText(`Error removing ${'.prettierrc.json'} file:`), error);
                process.exit(1);
            }
        } else {
            console.log(successText('Prettier installed successfully!'));
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
