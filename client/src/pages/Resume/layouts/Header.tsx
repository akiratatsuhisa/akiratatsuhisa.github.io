import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import _ from 'lodash';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink as ReactRouterNavLink } from 'react-router-dom';

import { Role, useHash, useHasRole } from '@/hooks';
import { Header } from '@/layouts';
import { resumePageHashs } from '@/pages/Resume/constants';

const navLinkStyle = (isActive?: boolean) => ({
  paddingX: '4',
  paddingY: '3',
  rounded: 'full',
  border: '2px solid',
  borderColor: isActive ? 'brand.500' : 'white',
  justifyContent: 'center',
  alignItems: 'center',
  color: isActive ? 'brand.500' : 'white',
  fontWeight: 'medium',
  cursor: 'pointer',
  _hover: { borderColor: 'brand.400', color: 'brand.400' },
});

const AppDrawer: FC<{
  currentHash: string;
  onClickHash: (id: string) => void;
  isMenuOnTopBar?: boolean;
  isOpen: boolean;
  onClose: () => void;
}> = ({ currentHash, onClickHash, isMenuOnTopBar, isOpen, onClose }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.resume.header.menu',
  });

  const menu = (
    <Flex flexDirection="column" gap="4">
      {_.values(resumePageHashs).map((hash) => (
        <Flex
          key={hash}
          onClick={() => onClickHash(hash)}
          {...navLinkStyle(currentHash === hash)}
        >
          {t(hash)}
        </Flex>
      ))}
    </Flex>
  );

  const { t: tProfile, i18n } = useTranslation('translation', {
    keyPrefix: `layouts.default.header.profile`,
  });

  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const hasRole = useHasRole();

  const profile = (
    <Flex flexDirection="column" gap="4">
      {isAuthenticated && (
        <>
          <ReactRouterNavLink to={`/users/${user!.nickname}`}>
            {({ isActive }) => (
              <Flex {...navLinkStyle(isActive)}>{user!.nickname}</Flex>
            )}
          </ReactRouterNavLink>
          {hasRole([Role.Administrator]) && (
            <ReactRouterNavLink to={`/dashboard`}>
              {({ isActive }) => (
                <Flex {...navLinkStyle(isActive)}>{tProfile('dashboard')}</Flex>
              )}
            </ReactRouterNavLink>
          )}
        </>
      )}

      {isAuthenticated ? (
        <Flex
          {...navLinkStyle()}
          onClick={() =>
            logout({
              logoutParams: {
                returnTo: `${window.location.origin}/logout?returnTo=${window.location.pathname}`,
              },
            })
          }
        >
          {tProfile('logout')}
        </Flex>
      ) : (
        <Flex
          {...navLinkStyle()}
          onClick={() =>
            loginWithRedirect({
              authorizationParams: {
                ui_locales: i18n.language,
                audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE,
                redirect_uri: window.location.origin + '/callback',
                scope: 'profile email',
              },
              appState: { returnTo: window.location.href },
            })
          }
        >
          {tProfile('login')}
        </Flex>
      )}
    </Flex>
  );

  return (
    <Drawer
      isOpen={!isMenuOnTopBar && isOpen}
      onClose={onClose}
      placement="top"
      size="full"
    >
      <DrawerOverlay backdropFilter="auto" backdropBlur="3px" />

      <DrawerContent
        backgroundColor="transparent"
        height="100dvh"
        max-height="100dvh"
      >
        <DrawerCloseButton color="white" rounded="full" />

        <DrawerHeader color="white">{t('title')}</DrawerHeader>

        <DrawerBody paddingY="6" paddingX="4">
          <Flex
            flexDirection="column"
            gap="12"
            minHeight="full"
            justifyContent="space-between"
          >
            {menu}
            {profile}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export const DefaultHeader: FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.resume.header.menu',
  });

  const isMenuOnTopBar = useBreakpointValue({ base: false, lg: true });

  const { currentHash, onClickHash } = useHash({
    defaultHash: 'home',
    hashQuery: 'section.section',
  });

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Header.Wrapper>
        <Header.LogoIcon />

        <Box flex="2" />

        <Header.Title display={{ lg: 'none', xl: 'inline' }} />

        <Flex
          display={isMenuOnTopBar ? 'flex' : 'none'}
          flexWrap="nowrap"
          whiteSpace="nowrap"
          gap="1"
          alignItems="center"
          justifyContent="end"
          overflow="auto"
          height="full"
          width="full"
        >
          {_.values(resumePageHashs).map((hash) => (
            <Flex
              key={hash}
              paddingX="2"
              paddingY="1"
              alignItems="center"
              color={currentHash === hash ? 'brand.500' : 'ButtonText'}
              opacity="0.7"
              fontWeight="medium"
              cursor="pointer"
              onClick={() => onClickHash(hash)}
              _hover={{ color: 'brand.400' }}
            >
              {t(hash)}
            </Flex>
          ))}
        </Flex>

        <Box flex="1" />

        <Header.ColorModeButton />

        <Header.AppBarMenu
          isOpen={isMenuOnTopBar && isOpen}
          onClose={onClose}
          onOpen={onOpen}
        />
      </Header.Wrapper>

      {!isMenuOnTopBar && (
        <AppDrawer
          currentHash={currentHash}
          onClickHash={onClickHash}
          isMenuOnTopBar={isMenuOnTopBar}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};
