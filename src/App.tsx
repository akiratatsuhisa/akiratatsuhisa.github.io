import { useAuth0 } from '@auth0/auth0-react';
import {
  ChakraProvider,
  extendTheme,
  Modal,
  ModalOverlay,
  withDefaultColorScheme,
  withDefaultProps,
} from '@chakra-ui/react';
import { FC, ReactElement } from 'react';
import {
  BrowserRouter,
  Location,
  Navigate,
  Route,
  Routes,
  useLocation,
  useRoutes,
} from 'react-router-dom';

import { useBackgroundNavigate } from '@/hooks';
import { Layout } from '@/Layout.tsx';
import { AboutUs } from '@/pages/AboutUs';
import { Blogs } from '@/pages/Blogs';
import {
  AccessDenied,
  Callback,
  InternalServerError,
  Logout,
  NotFound,
} from '@/pages/Common.tsx';
import { ContactUs } from '@/pages/ContactUs';
import { Home } from '@/pages/Home';
import { Legal } from '@/pages/Legal';
import { Post } from '@/pages/Post';
import { Resume } from '@/pages/Resume';
import { Shop } from '@/pages/Shop';
import { Support } from '@/pages/Support';
import { User } from '@/pages/User';

const theme = extendTheme(
  {
    colors: {
      brand: {
        50: '#f4e7ff',
        100: '#e4c4ff',
        200: '#d09efb',
        300: '#ba79f3',
        400: '#a95eeb',
        500: '#9a47e3',
        600: '#8943dc',
        700: '#713ed2',
        800: '#5b3ac9',
        900: '#2932b9',
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'brand',
  }),
  withDefaultProps({
    defaultProps: {
      colorScheme: 'brand',
    },
  }),
);

const AppRoutes: FC = () => {
  const { isAuthenticated } = useAuth0();

  const location = useLocation();

  const background =
    location.state && (location.state.background satisfies Location<unknown>);

  const authGuard = (element: ReactElement) => {
    return isAuthenticated ? element : <Navigate to="/" />;
  };

  const routes = useRoutes(
    [
      {
        path: '',
        element: <Layout />,
        children: [
          {
            index: true,
            path: '/',
            element: <Home.Page />,
          },

          //
          { path: '/post', element: authGuard(<Post.Page />) },

          // main
          { path: 'resume', element: <Resume.Page /> },
          { path: 'blogs', element: <Blogs.Page /> },
          { path: 'shop', element: <Shop.Page /> },
          { path: 'users/:nickname', element: <User.Page /> },

          // footer
          { path: 'about-us', element: <AboutUs.Page /> },
          { path: 'contact-us', element: <ContactUs.Page /> },
          { path: 'support', element: <Support.Page /> },
          { path: 'legal', element: <Legal.Page /> },

          // auth
          { path: '/callback', element: <Callback /> },
          { path: '/logout', element: <Logout /> },

          // common
          { path: '/*', element: <NotFound /> },
          { path: '/access-denied', element: <AccessDenied /> },
          { path: '/internal-server-error', element: <InternalServerError /> },
        ],
      },
    ],
    background ?? location,
  );

  const { modalSize, onCloseModal } = useBackgroundNavigate();

  const modalRoute = (
    <Modal
      size={modalSize}
      onClose={onCloseModal}
      isOpen={!!background}
      scrollBehavior="inside"
    >
      <ModalOverlay />

      <Routes>
        <Route path="/post" element={authGuard(<Post.Modal />)} />
        <Route path="/users/:nickname" element={authGuard(<User.Modal />)} />
      </Routes>
    </Modal>
  );

  return (
    <>
      {routes}
      {background && modalRoute}
    </>
  );
};

export const App: FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <></>;
  }

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ChakraProvider>
  );
};
