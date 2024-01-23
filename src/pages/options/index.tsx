import React from 'react';
import { createRoot } from 'react-dom/client';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { attachTwindStyle } from '@src/shared/style/twind';
import App from './src/App';

refreshOnUpdate('pages/options');

function init() {
  const appContainer = document.querySelector('#app-container');
  attachTwindStyle(appContainer, document);

  
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(<App />);
}

init();
