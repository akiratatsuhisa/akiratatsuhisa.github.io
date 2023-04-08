import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  HeadingProps,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  UseDisclosureProps,
} from '@chakra-ui/react';
import { ElementType, FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { FaAddressCard, FaLayerGroup, FaShoppingCart } from 'react-icons/fa';
import {
  MdDarkMode,
  MdDashboard,
  MdLightMode,
  MdLogin,
  MdLogout,
  MdMenu,
} from 'react-icons/md';
import {
  NavLink as ReactRouterNavLink,
  To,
  useNavigate,
} from 'react-router-dom';

import Logo from '@/assets/react.svg';
import { Role, useHasRole } from '@/hooks';

export const Wrapper: FC<{ children?: ReactNode }> = ({ children }) => {
  const bgGradient = useColorModeValue(
    'linear(to-b, whiteAlpha.800, whiteAlpha.600)',
    'linear(to-b, blackAlpha.800, blackAlpha.600)',
  );

  return (
    <Box position="sticky" top="0" zIndex="sticky">
      <Container maxWidth="container.xl" paddingY="3">
        <Box
          height="14"
          paddingX="3"
          paddingY="2"
          rounded="2xl"
          bgGradient={bgGradient}
          backdropFilter="auto"
          backdropBlur="2px"
          shadow="base"
        >
          <Flex
            alignItems="center"
            flexWrap="nowrap"
            gap="2"
            height="full"
            width="full"
          >
            {children}
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export const LogoIcon: FC = () => {
  const navigate = useNavigate();

  return <Image cursor="pointer" onClick={() => navigate('/')} src={Logo} />;
};

export const Title: FC<{ children?: ReactNode } & HeadingProps> = ({
  children,
  ...props
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: `layouts.default.header`,
  });

  const navigate = useNavigate();

  return (
    <Heading
      as="span"
      cursor="pointer"
      flexShrink="0"
      fontWeight="semibold"
      onClick={() => navigate('/')}
      size="md"
      {...props}
    >
      {children ?? t('title')}
    </Heading>
  );
};

export const ColorModeButton: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="color mode"
      icon={<Icon as={colorMode === 'light' ? MdDarkMode : MdLightMode} />}
      onClick={toggleColorMode}
      rounded="3xl"
      variant="ghost"
    />
  );
};

export const AppBarMenu: FC<
  {
    children?: ReactNode;
    isMenuOnTopBar?: boolean;
  } & UseDisclosureProps
> = ({
  children,
  isMenuOnTopBar,
  isOpen,
  defaultIsOpen,
  onClose,
  onOpen,
  id,
}) => {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: `layouts.default.header.profile`,
  });

  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const hasRole = useHasRole();

  return (
    <Menu
      autoSelect={false}
      placement="bottom-end"
      isOpen={isOpen}
      defaultIsOpen={defaultIsOpen}
      onClose={onClose}
      onOpen={onOpen}
      id={id}
    >
      <MenuButton
        as={IconButton}
        aria-label="menu"
        icon={<Icon as={MdMenu} />}
        rounded="3xl"
        variant="ghost"
      />

      <MenuList marginTop="1" paddingY="3" rounded="2xl">
        {!isMenuOnTopBar && (
          <>
            {children}

            {children && <MenuDivider />}
          </>
        )}

        <MenuGroup title={t('title')}>
          {isAuthenticated && (
            <>
              <ReactRouterNavLink to={`/users/${user!.nickname}`} end>
                {({ isActive }) => (
                  <MenuItem color={isActive ? 'brand.500' : undefined}>
                    <Avatar
                      marginLeft="-1.5"
                      marginRight="1.5"
                      shadow="base"
                      size="xs"
                      src={user?.picture ?? ''}
                    />
                    {user!.nickname}
                  </MenuItem>
                )}
              </ReactRouterNavLink>
              {hasRole([Role.Administrator]) && (
                <ReactRouterNavLink to={`/dashboard`} end>
                  {({ isActive }) => (
                    <MenuItem
                      icon={<MdDashboard />}
                      color={isActive ? 'brand.500' : undefined}
                    >
                      {t('dashboard')}
                    </MenuItem>
                  )}
                </ReactRouterNavLink>
              )}
            </>
          )}

          {isAuthenticated ? (
            <MenuItem
              icon={<MdLogout />}
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: `${window.location.origin}/logout?returnTo=${window.location.pathname}`,
                  },
                })
              }
            >
              {t('logout')}
            </MenuItem>
          ) : (
            <MenuItem
              icon={<MdLogin />}
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
              {t('login')}
            </MenuItem>
          )}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

const menus: Array<{
  translation: string;
  icon: ElementType;
  to: To;
  end?: boolean;
}> = [
  {
    translation: 'resume',
    icon: FaAddressCard,
    to: { pathname: '/resume' },
  },
  {
    translation: 'blogs',
    icon: FaLayerGroup,
    to: { pathname: '/blogs' },
  },
  {
    translation: 'shop',
    icon: FaShoppingCart,
    to: { pathname: '/shop' },
  },
];

export const Header: FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: `layouts.default.header.menu`,
  });

  const navigate = useNavigate();

  const isMenuOnTopBar = useBreakpointValue({ base: false, md: true });

  return (
    <Wrapper>
      <LogoIcon />

      <Box flex="2" />

      <Title />

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

      <ColorModeButton />

      <AppBarMenu isMenuOnTopBar={isMenuOnTopBar}>
        <MenuGroup>
          {menus.map(({ translation, icon, to, end }) => (
            <ReactRouterNavLink key={translation} to={to} end={end}>
              {({ isActive }) => (
                <MenuItem
                  icon={<Icon as={icon} />}
                  color={isActive ? 'brand.500' : undefined}
                  onClick={() => navigate(to)}
                >
                  {t(translation)}
                </MenuItem>
              )}
            </ReactRouterNavLink>
          ))}
        </MenuGroup>
      </AppBarMenu>
    </Wrapper>
  );
};
