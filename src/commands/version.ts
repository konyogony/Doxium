import packageJson from '../../package.json';

export const version = () => {
    console.log(`${packageJson.name} - ${packageJson.version}, by ${packageJson.author}`);
};
