/**
 * Converts an JS ISO date string to a more readable date format.
 * The function expects an JS ISO date string (e.g., "2020-01-01T12:00:00.000Z" or other) and
 * returns the date and time in the format "DD.MM.YY".
 * @param {string} dateStr - The ISO date string to be converted.
 * @returns {string} The date in "DD.MM.YY" format.
 */
export function isodateToDate(dateStr){
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    return `${day}.${month}.${year}`;
}