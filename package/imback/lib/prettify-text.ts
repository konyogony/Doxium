export const prettifyText = (word: string): string => {
    if (!word) return word;
    return word
        .replaceAll('-', ' ')
        .replaceAll('/', ' ')
        .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
};
