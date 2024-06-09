import '@/index.css';
import '@/i18n';
import '@/utils/yup';

import { AppState, Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@/App.tsx';
import { theme } from '@/theme';

const onRedirectCallback = (appState?: AppState) => {
  window.location.replace(
    appState?.returnTo && appState.returnTo
      ? appState.returnTo
      : window.location.origin,
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
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
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Auth0Provider>
  </BrowserRouter>,
);
