

// Get data from local storage
export function getStorageData(keys) {
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (result) => resolve(result));
    });
}