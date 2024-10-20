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
                type: 'text',
                name: 'github-repo',
                message: `GitHub ${blueText('repository')} URL:`,
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
                name: 'prettier',
                message: `Would you like to use ${blueText('Prettier')}?`,
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
                name: 'home-page',
                message: `Would you like to have a ${blueText('Home Page')}?`,
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
                type: 'autocomplete',
                name: 'shiki-theme',
                message: `Choose your code-block (shiki) ${blueText('theme')}:`,
                choices: [
                    { title: 'Andromeeda', value: 'andromeeda' },
                    { title: 'Aurora X', value: 'aurora-x' },
                    { title: 'Ayu Dark', value: 'ayu-dark' },
                    { title: 'Catppuccin Frappé', value: 'catppuccin-frappe' },
                    { title: 'Catppuccin Latte', value: 'catppuccin-latte' },
                    { title: 'Catppuccin Macchiato', value: 'catppuccin-macchiato' },
                    { title: 'Catppuccin Mocha', value: 'catppuccin-mocha' },
                    { title: 'Dark Plus', value: 'dark-plus' },
                    { title: 'Dracula Theme', value: 'dracula' },
                    { title: 'Dracula Theme Soft', value: 'dracula-soft' },
                    { title: 'Everforest Dark', value: 'everforest-dark' },
                    { title: 'Everforest Light', value: 'everforest-light' },
                    { title: 'GitHub Dark', value: 'github-dark' },
                    { title: 'GitHub Dark Default', value: 'github-dark-default' },
                    { title: 'GitHub Dark Dimmed', value: 'github-dark-dimmed' },
                    { title: 'GitHub Dark High Contrast', value: 'github-dark-high-contrast' },
                    { title: 'GitHub Light', value: 'github-light' },
                    { title: 'GitHub Light Default', value: 'github-light-default' },
                    { title: 'GitHub Light High Contrast', value: 'github-light-high-contrast' },
                    { title: 'Houston', value: 'houston' },
                    { title: 'LaserWave', value: 'laserwave' },
                    { title: 'Light Plus', value: 'light-plus' },
                    { title: 'Material Theme', value: 'material-theme' },
                    { title: 'Material Theme Darker', value: 'material-theme-darker' },
                    { title: 'Material Theme Lighter', value: 'material-theme-lighter' },
                    { title: 'Material Theme Ocean', value: 'material-theme-ocean' },
                    { title: 'Material Theme Palenight', value: 'material-theme-palenight' },
                    { title: 'Min Dark', value: 'min-dark' },
                    { title: 'Min Light', value: 'min-light' },
                    { title: 'Monokai', value: 'monokai' },
                    { title: 'Night Owl', value: 'night-owl' },
                    { title: 'Nord', value: 'nord' },
                    { title: 'One Dark Pro', value: 'one-dark-pro' },
                    { title: 'One Light', value: 'one-light' },
                    { title: 'Plastic', value: 'plastic' },
                    { title: 'Poimandres', value: 'poimandres' },
                    { title: 'Red', value: 'red' },
                    { title: 'Rosé Pine', value: 'rose-pine' },
                    { title: 'Rosé Pine Dawn', value: 'rose-pine-dawn' },
                    { title: 'Rosé Pine Moon', value: 'rose-pine-moon' },
                    { title: 'Slack Dark', value: 'slack-dark' },
                    { title: 'Slack Ochin', value: 'slack-ochin' },
                    { title: 'Snazzy Light', value: 'snazzy-light' },
                    { title: 'Solarized Dark', value: 'solarized-dark' },
                    { title: 'Solarized Light', value: 'solarized-light' },
                    { title: "Synthwave '84", value: 'synthwave-84' },
                    { title: 'Tokyo Night', value: 'tokyo-night' },
                    { title: 'Vesper', value: 'vesper' },
                    { title: 'Vitesse Black', value: 'vitesse-black' },
                    { title: 'Vitesse Dark', value: 'vitesse-dark' },
                    { title: 'Vitesse Light', value: 'vitesse-light' },
                ],
                initial: 14,
                hint: 'Reffer to https://textmate-grammars-themes.netlify.app, Recommended: GitHub Dark Dimmed',
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
