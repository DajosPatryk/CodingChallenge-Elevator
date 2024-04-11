/**
 * Saves a JSON object to local storage under the provided key.
 * @param {string} key The key under which to save the object.
 * @param {Object} object The JSON object to be saved.
 */
export function setKey(key, object) {
    try {
        const jsonString = JSON.stringify(object);
        localStorage.setItem(key, jsonString);
    } catch (error) {
        console.error("Error saving to local storage:", error);
    }
}

/**
 * Retrieves a JSON object from local storage by its key.
 * @param {string} key The key of the object to retrieve.
 * @return {Object|null} The JSON object if found, or null if not found or in case of error.
 */
export function getKey(key) {
    try {
        const jsonString = localStorage.getItem(key);
        if (jsonString == null) return null;
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error retrieving from local storage:", error);
        return null;
    }
}