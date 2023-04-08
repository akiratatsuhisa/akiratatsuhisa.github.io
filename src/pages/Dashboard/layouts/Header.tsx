import { useAuth0 } from '@auth0/auth0-react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { ElementType, FC } from 'react';
import { Translation, useTranslation } from 'react-i18next';
import { MdBook, MdDashboard, MdLogout } from 'react-icons/md';
import { NavLink as ReactRouterNavLink, To } from 'react-router-dom';

import { Header } from '@/layouts';

const menus: Array<{
  translation: string;
  icon: ElementType;
  to: To;
  end?: boolean;
}> = [
  {
    translation: 'overview',
    icon: MdDashboard,
    to: { pathname: '/dashboard' },
    end: true,
  },
  {
    translation: 'projects',
    icon: MdBook,
    to: { pathname: '/dashboard/projects' },
  },
];

const AppDrawer: FC<{
  isMenuOnTopBar?: boolean;
  isOpen: boolean;
  onClose: () => void;
}> = ({ isMenuOnTopBar, isOpen, onClose }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'layouts.dashboard.header.menu',
  });
  const { user, logout } = useAuth0();

  return (
    <Drawer
      isOpen={!isMenuOnTopBar && isOpen}
      onClose={onClose}
      placement="left"
    >
      <DrawerOverlay />

      <DrawerContent roundedEnd="3xl">
        <DrawerCloseButton rounded="full">
          <ArrowBackIcon />
        </DrawerCloseButton>
        <Translation keyPrefix="layouts.default.header">
          {(t) => <DrawerHeader>{t('title')}</DrawerHeader>}
        </Translation>
        <DrawerBody padding="3">
          <Stack spacing="1">
            {menus.map(({ translation, icon, to, end }) => (
              <ReactRouterNavLink key={translation} to={to} end={end}>
                {({ isActive }) => (
                  <Button
                    width="full"
                    alignItems="center"
                    gap="2"
                    variant={isActive ? 'solid' : 'ghost'}
                    onClick={onClose}
                  >
                    <Icon as={icon} />

                    {t(translation)}
                  </Button>
                )}
              </ReactRouterNavLink>
            ))}
          </Stack>
        </DrawerBody>

        <DrawerFooter padding="3" display="block">
          <Translation keyPrefix="layouts.default.header.profile">
            {(t) => (
              <Stack spacing="1">
                <ReactRouterNavLink to={`/users/${user!.nickname}`} end>
                  {({ isActive }) => (
                    <Button
                      width="full"
                      alignItems="center"
                      gap="2"
                      variant={isActive ? 'solid' : 'ghost'}
                    >
                      <Avatar
                        shadow="base"
                        size="sm"
                        src={user?.picture ?? ''}
                      />

                      {user!.nickname}
                    </Button>
                  )}
                </ReactRouterNavLink>

                <Button
                  width="full"
                  alignItems="center"
                  gap="2"
                  variant="ghost"
                  onClick={() =>
                    logout({
                      logoutParams: {
                        returnTo: `${window.location.origin}/logout?returnTo=${window.location.pathname}`,
                      },
                    })
                  }
                >
                  <Icon as={MdLogout} />

                  {t('logout')}
                </Button>
              </Stack>
            )}
          </Translation>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const DefaultHeader: FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'layouts.dashboard.header.menu',
  });

  const isMenuOnTopBar = useBreakpointValue({ base: false, lg: true });

  const { isOpen, onClose, onOpen } = useDisclosure();

  const appBarMenu = (
    <Header.AppBarMenu
      isOpen={isMenuOnTopBar && isOpen}
      onClose={onClose}
      onOpen={onOpen}
    />
  );

  return (
    <>
      <Header.Wrapper>
        {!isMenuOnTopBar && appBarMenu}

        {isMenuOnTopBar && <Header.LogoIcon />}

        <Box flex="1" />

        <Header.Title />

        <Flex
          display={isMenuOnTopBar ? 'flex' : 'none'}
          flexWrap="nowrap"
          gap="2"
          alignItems="center"
          justifyContent="center"
          overflow="auto"
          height="full"
          width="full"
        >
          {menus.map(({ translation, icon, to, end }) => (
            <ReactRouterNavLink key={translation} to={to} end={end}>
              {({ isActive }) => (
                <Flex
                  alignItems="center"
                  color={isActive ? 'brand.500' : 'ButtonText'}
                  fontWeight="medium"
                  gap="2"
                  opacity="0.7"
                  paddingX="2"
                  paddingY="1"
                >
                  <Icon as={icon} />

                  {t(translation)}
                </Flex>
              )}
            </ReactRouterNavLink>
          ))}
        </Flex>

        <Box flex="1" />

        <Header.ColorModeButton />

        {isMenuOnTopBar && appBarMenu}
      </Header.Wrapper>

      {!isMenuOnTopBar && (
        <AppDrawer
          isMenuOnTopBar={isMenuOnTopBar}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
};
