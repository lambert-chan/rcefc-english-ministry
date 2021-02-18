export function remove_linebreaks(str) {
    return str ? str.replace(/[\r\n]+/gm, "") : '';
} 