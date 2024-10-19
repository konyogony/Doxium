import prompts from 'prompts';
import { blueText, errorText } from './utils.js';

export const getResponse = async () => {
    const response = await prompts(
        [
            {
                type: 'text',
                name: 'app-name',
                message: `Name of your ${blueText('app')}:`,
                initial: 'my-app',
                // validate: (value) => (value.match(/^[$A-Z_][0-9A-Z_$]*$/i) ? true : errorText('Invalid app name.')),
            },
            {
                type: 'toggle',
                name: 'eslint',
                message: `Would you like to use ${blueText('ESLint')}?`,
                active: 'yes',
                inactive: 'no',
                initial: true,
            },
            {
                type: 'toggle',
                name: 'turbopack',
                message: `Would you like to use ${blueText('Turbopack')} for next dev?`,
                active: 'yes',
                inactive: 'no',
                initial: false,
            },
            {
                type: 'toggle',
                name: 'prettier',
                message: `Would you like to use ${blueText('Prettier')}?`,
                active: 'yes',
                inactive: 'no',
                initial: true,
            },
            {
                type: 'select',
                name: 'shadcn-style',
                message: `Choose your shadcn ${blueText('style')}:`,
                choices: [
                    { title: 'New York', value: 'new-york' },
                    { title: 'Default', value: 'default' },
                ],
                initial: 0,
            },
            {
                type: 'select',
                name: 'base-color',
                message: `Choose your ${blueText('base color')}:`,
                choices: [
                    { title: 'Neutral', value: 'neutral' },
                    { title: 'Gray', value: 'gray' },
                    { title: 'Zinc', value: 'zinc' },
                    { title: 'Stone', value: 'stone' },
                    { title: 'Slate', value: 'slate' },
                ],
                initial: 0,
            },
            {
                type: 'confirm',
                name: 'proceed',
                message: `Do you wish to ${blueText('proceed?')}`,
                initial: true,
            },
        ],
        {
            onCancel: () => {
                console.error(errorText('Setup cancelled.'));
                process.exit(1);
            },
        },
    ).catch((err) => {
        console.error(errorText('Error during prompts:'), err);
        process.exit(1);
    });

    if (response.proceed === false) {
        console.log(errorText('Setup cancelled by user.'));
        process.exit(1);
    }

    return response;
};
