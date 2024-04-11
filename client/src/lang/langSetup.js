import appLang from "./lang.json";

/**
 * Deeply merges multiple objects into one.
 * @param {...Object} objects - Objects to merge.
 * Each object's properties override the previous ones. For properties that are objects, it performs a deep merge. Non-object properties are overwritten.
 * @returns {Object} - The merged object.
 */
function deepMergeObjects(...objects) {
    const result = {};
    objects.forEach(obj => {
        Object.keys(obj).forEach(key => {
            if (obj[key] && typeof obj[key] === 'object') {
                if (!result[key]) result[key] = {};
                result[key] = deepMergeObjects(result[key], obj[key]);
            }
            else result[key] = obj[key];
        });
    });
    return result;
}

/**
 * Determines the user's locale, defaulting to 'de' for German-speaking regions or 'en' otherwise.
 * Uses browser's language setting to determine the locale, checking against known German locales.
 * @returns {string} 'de' for German-speaking regions, 'en' otherwise.
 */
export function getLocale() {
    const userLocale = navigator.language || navigator.languages[0];
    const germanSpeakingLocales = ['de-DE', 'de-AT', 'de-CH'];
    if (germanSpeakingLocales.includes(userLocale)) {
        return 'de'; // Return 'de' for German-speaking regions
    } else {
        return 'en'; // Default to 'en' otherwise
    }
}

/**
 * Merges language objects from different modules.
 * @returns {Object} An object with 'en' and 'de' keys containing merged language settings.
 */
export function getMessages(){
    return {
        en: deepMergeObjects(
            appLang.en
        ),
        de: deepMergeObjects(
            appLang.de
        ),
    }
}