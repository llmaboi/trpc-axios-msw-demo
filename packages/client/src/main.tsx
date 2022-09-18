import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// function prepare() {
//   if (process.env.NODE_ENV === 'development') {
//     return import('api-server').then(async (apiServer) => {
//       console.log(apiServer);
//       await apiServer.default.setupMocks();
//     });
//   }
//   return Promise.resolve();
// }

// prepare().then(() => {
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// });
