import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Image,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { FC, ReactElement } from 'react';
import {
  FaAddressCard,
  FaGithub,
  FaLayerGroup,
  FaLinkedin,
  FaShoppingCart,
  FaTwitter,
} from 'react-icons/fa';
import {
  MdDarkMode,
  MdEmail,
  MdLightMode,
  MdLogin,
  MdLogout,
  MdMenu,
} from 'react-icons/md';
import {
  Link as ReactRouterLink,
  NavLink as ReactRouterNavLink,
  To,
  useNavigate,
  useOutlet,
} from 'react-router-dom';

import Logo from '@/assets/react.svg';

const menus: Array<{
  title: string;
  icon: ReactElement;
  to: To;
}> = [
  {
    title: 'Resume',
    icon: <FaAddressCard />,
    to: { pathname: '/resume' },
  },
  {
    title: 'Blogs',
    icon: <FaLayerGroup />,
    to: { pathname: '/blogs' },
  },
  {
    title: 'Shop',
    icon: <FaShoppingCart />,
    to: { pathname: '/shop' },
  },
];

const Header: FC = () => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  const navigate = useNavigate();

  const isMenuOnTopBar = useBreakpointValue({ base: false, md: true });

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box position="sticky" zIndex="sticky" top="0">
      <Container maxWidth="container.lg" py="3">
        <Box
          height="14"
          bgGradient={
            colorMode === 'light'
              ? 'linear(to-b, whiteAlpha.800, whiteAlpha.600)'
              : 'linear(to-b, blackAlpha.800, blackAlpha.600)'
          }
          backdropFilter="auto"
          backdropBlur="2px"
          shadow="base"
          paddingX="3"
          paddingY="2"
          rounded="2xl"
        >
          <Flex
            alignItems="center"
            flexWrap="nowrap"
            width="full"
            height="full"
            gap="2"
          >
            <Image src={Logo} cursor="pointer" onClick={() => navigate('/')} />

            <Heading
              as="p"
              size="md"
              fontWeight="semibold"
              flexShrink="0"
              cursor="pointer"
              onClick={() => navigate('/')}
            >
              Akira Tatsuhisa
            </Heading>

            <Box flex="1"></Box>

            <Flex
              display={isMenuOnTopBar ? 'flex' : 'none'}
              alignItems="center"
              justifyContent="center"
              flexWrap="nowrap"
              width="full"
              height="full"
              gap="2"
              overflow="auto"
            >
              {menus.map((menu) => (
                <ReactRouterNavLink key={menu.title} to={menu.to}>
                  {({ isActive }) => (
                    <Flex
                      color={isActive ? 'brand.500' : 'ButtonText'}
                      paddingX="2"
                      paddingY="1"
                      alignItems="center"
                      gap="2"
                      fontWeight="medium"
                      opacity="0.7"
                    >
                      {menu.icon}
                      {menu.title}
                    </Flex>
                  )}
                </ReactRouterNavLink>
              ))}
            </Flex>

            <Box flex="1"></Box>

            <IconButton
              icon={
                <Icon as={colorMode === 'light' ? MdDarkMode : MdLightMode} />
              }
              aria-label="color mode"
              variant="ghost"
              rounded="3xl"
              onClick={toggleColorMode}
            />

            <Menu autoSelect={false}>
              <MenuButton>
                <IconButton
                  as="span"
                  icon={<Icon as={MdMenu} />}
                  aria-label="menu"
                  variant="ghost"
                />
              </MenuButton>

              <MenuList paddingY="3" marginTop="1" rounded="2xl">
                {!isMenuOnTopBar && (
                  <>
                    <MenuGroup title="Menu">
                      {menus.map((menu) => (
                        <ReactRouterNavLink key={menu.title} to={menu.to}>
                          {({ isActive }) => (
                            <MenuItem
                              icon={menu.icon}
                              onClick={() => navigate(menu.to)}
                            >
                              <Text
                                color={isActive ? 'brand.500' : 'ButtonText'}
                              >
                                {menu.title}
                              </Text>
                            </MenuItem>
                          )}
                        </ReactRouterNavLink>
                      ))}
                    </MenuGroup>

                    <MenuDivider />
                  </>
                )}

                <MenuGroup title="Profile">
                  {isAuthenticated && (
                    <ReactRouterNavLink to={`/users/${user!.nickname}`}>
                      {({ isActive }) => (
                        <MenuItem>
                          <Avatar
                            src={user?.picture ?? ''}
                            shadow="base"
                            size="xs"
                            marginLeft="-1.5"
                            marginRight="1.5"
                          />
                          <Text color={isActive ? 'brand.500' : 'ButtonText'}>
                            {user!.nickname}
                          </Text>
                        </MenuItem>
                      )}
                    </ReactRouterNavLink>
                  )}

                  {isAuthenticated ? (
                    <MenuItem
                      icon={<MdLogout />}
                      onClick={() =>
                        logout({
                          logoutParams: {
                            returnTo: `${window.location.origin}/logout?redirectUrl=${window.location.pathname}`,
                          },
                        })
                      }
                    >
                      Logout
                    </MenuItem>
                  ) : (
                    <MenuItem
                      icon={<MdLogin />}
                      onClick={() =>
                        loginWithRedirect({
                          appState: { returnTo: window.location.href },
                        })
                      }
                    >
                      Login
                    </MenuItem>
                  )}
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

const Footer: FC = () => {
  return (
    <Container marginTop="4" paddingY="4" maxW="container.xl">
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(6, 1fr)',
        }}
        gap="4"
      >
        <GridItem
          colSpan={{ base: 1, sm: 2 }}
          rowSpan={{ base: 1, md: 2, lg: 1 }}
        >
          <Heading as="h6" fontSize="sm" opacity="0.9" marginBottom="4">
            Socials
          </Heading>

          <Flex gap="3">
            <ChakraLink
              fontSize="sm"
              as={ReactRouterLink}
              target="_blank"
              to="https://github.com/akiratatsuhisa"
            >
              <Icon as={FaGithub} boxSize={6} color="gray.500" />
            </ChakraLink>

            <ChakraLink
              fontSize="sm"
              as={ReactRouterLink}
              target="_blank"
              to="https://twitter.com/Haru180898"
            >
              <Icon as={FaTwitter} boxSize={6} color="gray.500" />
            </ChakraLink>

            <ChakraLink
              fontSize="sm"
              as={ReactRouterLink}
              target="_blank"
              to="https://www.linkedin.com/in/dat-dang-minh-897345268/"
            >
              <Icon as={FaLinkedin} boxSize={6} color="gray.500" />
            </ChakraLink>

            <ChakraLink
              fontSize="sm"
              as={ReactRouterLink}
              to="mailto:dangminhdat.180898@gmail.com"
            >
              <Icon as={MdEmail} boxSize={6} color="gray.500" />
            </ChakraLink>
          </Flex>
        </GridItem>

        <GridItem>
          <Heading as="h6" fontSize="sm" opacity="0.9" marginBottom="2">
            Personal
          </Heading>

          <Flex direction="column" gap="1">
            <ChakraLink
              fontSize="sm"
              as={ReactRouterLink}
              to={{ pathname: '/about-us' }}
            >
              About Us
            </ChakraLink>

            <ChakraLink
              fontSize="sm"
              as={ReactRouterLink}
              to={{ pathname: '/blogs' }}
            >
              Blogs
            </ChakraLink>

            <ChakraLink
              fontSize="sm"
              as={ReactRouterLink}
              to="https://github.com/akiratatsuhisa?tab=repositories"
            >
              Tools
            </ChakraLink>
          </Flex>
        </GridItem>

        <GridItem>
          <Heading as="h6" fontSize="sm" opacity="0.9" marginBottom="2">
            Help & Support
          </Heading>

          <Flex direction="column" gap="1">
            <ChakraLink
              fontSize="sm"
              as={ReactRouterLink}
              to={{ pathname: '/contact-us' }}
            >
              Contact Us
            </ChakraLink>

            <ChakraLink
              fontSize="sm"
              as={ReactRouterLink}
              to={{ pathname: '/support' }}
            >
              Support
            </ChakraLink>
          </Flex>
        </GridItem>

        <GridItem>
          <Heading as="h6" fontSize="sm" opacity="0.9" marginBottom="2">
            Legal
          </Heading>

          <Flex direction="column" gap="1">
            <ChakraLink
              fontSize="sm"
              as={ReactRouterLink}
              to={{ pathname: '/legal', hash: 'terms-conditions' }}
            >
              Terms & Conditions
            </ChakraLink>

            <ChakraLink
              fontSize="sm"
              as={ReactRouterLink}
              to={{ pathname: '/legal', hash: 'privacy-policy' }}
            >
              Privacy Policy
            </ChakraLink>

            <ChakraLink
              fontSize="sm"
              as={ReactRouterLink}
              to={{ pathname: '/legal', hash: 'liecenses' }}
            >
              Liecenses
            </ChakraLink>
          </Flex>
        </GridItem>

        <GridItem>
          <Heading as="h6" fontSize="sm" opacity="0.9" marginBottom="2">
            Resources
          </Heading>

          <Flex direction="column" gap="1">
            <ChakraLink
              fontSize="sm"
              as={ReactRouterLink}
              to="https://pages.github.com/"
            >
              Github Pages
            </ChakraLink>

            <ChakraLink
              fontSize="sm"
              as={ReactRouterLink}
              to="https://workers.cloudflare.com/"
            >
              Cloudflare Workers
            </ChakraLink>

            <ChakraLink
              fontSize="sm"
              as={ReactRouterLink}
              to="https://www.mongodb.com/ja-jp/atlas/database"
            >
              MongoDB Atlas
            </ChakraLink>
          </Flex>
        </GridItem>

        <GridItem colSpan={{ base: 1, sm: 2, md: 4, lg: 6 }}>
          <Divider marginBottom={{ base: '2', md: '4' }} />

          <Text textAlign="center" opacity="0.75">
            Copyright ©{' '}
            <Text as="span" display="inline" fontWeight="medium">
              {dayjs().year()}
            </Text>
          </Text>
          <Text textAlign="center" opacity="0.85">
            Made with Love by{' '}
            <Text
              as="span"
              display="inline"
              color="brand.500"
              fontWeight="medium"
            >
              Akira Tatsuhisa
            </Text>
          </Text>
        </GridItem>
      </Grid>
    </Container>
  );
};

export const Layout: FC = () => {
  const outlet = useOutlet();

  return (
    <Flex minHeight="100dvh" direction="column">
      <Header />

      <Box flex="1 1 0">{outlet}</Box>

      <Footer />
    </Flex>
  );
};
