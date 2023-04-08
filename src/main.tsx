import './index.css';

import { AppState, Auth0Provider } from '@auth0/auth0-react';
import ReactDOM from 'react-dom/client';

import { App } from '@/App.tsx';

const onRedirectCallback = (appState?: AppState) => {
  window.location.replace(
    appState?.returnTo && appState.returnTo
      ? appState.returnTo
      : window.location.origin,
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain={import.meta.env.VITE_APP_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_APP_AUTH0_CLIENT_ID}
    cacheLocation="localstorage"
    useRefreshTokens={true}
    onRedirectCallback={onRedirectCallback}
    authorizationParams={{
      audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE,
      redirect_uri: window.location.origin + '/callback',
      scope: 'profile email',
    }}
  >
    <App />
  </Auth0Provider>,
);
