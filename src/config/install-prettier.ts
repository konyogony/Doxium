import fs from 'fs-extra';
import { errorText } from '../utils/utils.js';

export const installPrettier = async () => {
    try {
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
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
