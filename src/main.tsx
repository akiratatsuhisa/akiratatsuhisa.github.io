import '@/index.css';
import '@/i18n';
import '@/utils/yup';

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
    cacheLocation="localstorage"
    clientId={import.meta.env.VITE_APP_AUTH0_CLIENT_ID}
    domain={import.meta.env.VITE_APP_AUTH0_DOMAIN}
    onRedirectCallback={onRedirectCallback}
    authorizationParams={{
      audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE,
      redirect_uri: window.location.origin + '/callback',
      scope: 'profile email',
    }}
    useRefreshTokens={true}
  >
    <App />
  </Auth0Provider>,
);
