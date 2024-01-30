import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';

reloadOnUpdate('pages/background');


chrome.runtime.onInstalled.addListener(function() { 
    chrome.storage.local.set({chatHistory: []})

    
    chrome.runtime.openOptionsPage()
})


/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');
