import { useAuth0 } from '@auth0/auth0-react';
import { Modal, ModalOverlay, useColorModeValue } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';
import {
  Location,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useRoutes,
} from 'react-router-dom';

import { Role, useBackgroundNavigate, useHasRole } from '@/hooks';
import { Default } from '@/layouts';
import { AboutUs } from '@/pages/AboutUs';
import { Blogs } from '@/pages/Blogs';
import {
  AccessDenied,
  Callback,
  InternalServerError,
  Logout,
  NotFound,
  NotLogged,
} from '@/pages/Common.tsx';
import { ContactUs } from '@/pages/ContactUs';
import { Dashboard } from '@/pages/Dashboard';
import { Home } from '@/pages/Home';
import { Legal } from '@/pages/Legal';
import { Post } from '@/pages/Post';
import { Project } from '@/pages/Project';
import { Resume } from '@/pages/Resume';
import { Support } from '@/pages/Support';
import { User } from '@/pages/User';

const AppRoutes: FC = () => {
  const { isAuthenticated } = useAuth0();
  const hasRole = useHasRole();

  const location = useLocation();

  const background =
    location.state && (location.state.background satisfies Location<unknown>);

  const authGuard = (element: ReactElement, requiredRoles?: Array<Role>) => {
    if (!isAuthenticated) {
      return <Navigate to={`/not-logged?returnTo=${window.location.href}`} />;
    }

    if (requiredRoles?.length && !hasRole(requiredRoles)) {
      return <Navigate to="/access-denied" />;
    }

    return element;
  };

  const dashboardBgColor = useColorModeValue('gray.50', 'gray.900');

  const routes = useRoutes(
    [
      {
        path: '',
        element: (
          <Default.Layout
            footer={<Default.Footer />}
            header={<Default.Header />}
          />
        ),
        children: [
          {
            index: true,
            path: '/',
            element: <Home.Page />,
          },

          //
          {
            path: '/post',
            element: authGuard(<Post.Page />),
          },

          // main
          { path: '/blogs', element: <Blogs.Page /> },
          { path: '/users/:nickname', element: <User.Page /> },
          { path: '/projects/:slug', element: <Project.Page /> },

          // footer
          { path: '/about-us', element: <AboutUs.Page /> },
          { path: '/contact-us', element: <ContactUs.Page /> },
          { path: '/support', element: <Support.Page /> },
          {
            path: '/legal',
            element: <Outlet />,
            children: [
              {
                index: true,
                path: '',
                element: <Navigate to="/legal/terms-conditions" />,
              },
              {
                path: ':tab',
                element: <Legal.Page />,
              },
            ],
          },

          // auth
          { path: '/callback', element: <Callback /> },
          { path: '/logout', element: <Logout /> },

          // common
          { path: '/*', element: <NotFound /> },
          { path: '/not-logged', element: <NotLogged /> },
          { path: '/access-denied', element: <AccessDenied /> },
          { path: '/internal-server-error', element: <InternalServerError /> },
        ],
      },
      {
        path: '/resume',
        element: (
          <Default.Layout
            footer={<Default.Footer />}
            header={<Resume.Layout.Header />}
          />
        ),
        children: [
          {
            index: true,
            path: '',
            element: <Resume.Page />,
          },
        ],
      },
      {
        path: 'dashboard',
        element: authGuard(
          <Default.Layout
            backgroundColor={dashboardBgColor}
            footer={<Default.Footer />}
            header={<Dashboard.Layout.Header />}
          />,
          [Role.Administrator],
        ),
        children: [
          {
            index: true,
            path: '',
            element: <Dashboard.Page />,
          },
          {
            path: 'projects',
            element: <Dashboard.Projects.Page />,
          },
          {
            path: 'projects/:id',
            element: <Dashboard.Projects.ProjectDetail.Page />,
          },
        ],
      },
    ],
    background ?? location,
  );

  const { modalSize, onCloseModal } = useBackgroundNavigate();

  const modalRoute = (
    <Modal
      isOpen={!!background}
      onClose={onCloseModal}
      scrollBehavior="inside"
      size={modalSize}
    >
      <ModalOverlay />

      <Routes>
        <Route element={authGuard(<Post.Modal />)} path="/post" />
        <Route element={<User.Modal />} path="/users/:nickname" />
        <Route element={<Project.Modal />} path="/projects/:slug" />
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

  return <AppRoutes />;
};
