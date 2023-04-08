import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import _ from 'lodash';
import { ElementType, FC, HTMLAttributeAnchorTarget } from 'react';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link as ReactRouterLink, To } from 'react-router-dom';

import { languages } from '@/enums';

interface IFooterMenuProps {
  translation: string;
  items: Array<{
    translation: string;
    to: To;
    target?: HTMLAttributeAnchorTarget;
  }>;
}

const footerMenus: Array<IFooterMenuProps> = [
  {
    translation: 'personal',
    items: [
      {
        translation: 'aboutUs',
        to: { pathname: '/about-us' },
      },
      {
        translation: 'blogs',
        to: { pathname: '/blogs' },
      },
      {
        translation: 'tools',
        to: 'https://github.com/akiratatsuhisa?tab=repositories',
        target: '_blank',
      },
    ],
  },
  {
    translation: 'helpAndSupport',
    items: [
      {
        translation: 'contactUs',
        to: { pathname: '/contact-us' },
      },
      {
        translation: 'support',
        to: { pathname: '/support' },
      },
    ],
  },
  {
    translation: 'legal',
    items: [
      {
        translation: 'termsAndConditions',
        to: { pathname: '/legal/terms-conditions' },
      },
      {
        translation: 'privacyPolicy',
        to: { pathname: '/legal/privacy-policy' },
      },
      {
        translation: 'liecenses',
        to: { pathname: '/legal/liecenses' },
      },
    ],
  },
  {
    translation: 'resources',
    items: [
      {
        translation: 'githubPages',
        to: 'https://pages.github.com/',
        target: '_blank',
      },
      {
        translation: 'cloudflareWorkers',
        to: 'https://workers.cloudflare.com/',
        target: '_blank',
      },
      {
        translation: 'mongoDBAtlas',
        to: 'https://www.mongodb.com/ja-jp/atlas/database',
        target: '_blank',
      },
    ],
  },
];

const FooterMenu: FC<IFooterMenuProps> = ({ translation, items }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: `layouts.default.footer.menus.${translation}`,
  });

  return (
    <>
      <Heading as="h6" fontSize="sm" marginBottom="3" opacity="0.9">
        {t('title')}
      </Heading>

      <Flex flexDirection="column" gap="1">
        {items.map(({ translation, to, target }) => (
          <ChakraLink
            key={translation}
            as={ReactRouterLink}
            fontSize="sm"
            to={to}
            target={target}
          >
            {t(`items.${translation}`)}
          </ChakraLink>
        ))}
      </Flex>
    </>
  );
};

interface ISocialItemProps {
  translation: string;
  icon: ElementType;
  to: To;
}

const socialContent: { translation: string; items: Array<ISocialItemProps> } = {
  translation: 'socials',
  items: [
    {
      translation: 'github',
      icon: FaGithub,
      to: 'https://github.com/akiratatsuhisa',
    },
    {
      translation: 'twitter',
      icon: FaTwitter,
      to: 'https://twitter.com/Haru180898',
    },
    {
      translation: 'linkedin',
      icon: FaLinkedin,
      to: 'https://www.linkedin.com/in/dat-dang-minh-897345268/',
    },
    {
      translation: 'gmail',
      icon: MdEmail,
      to: 'mailto:dangminhdat.180898@gmail.com',
    },
  ],
};

const SocialItem: FC<ISocialItemProps> = ({ translation, icon, to }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common.socials',
  });

  return (
    <Tooltip label={t(translation)}>
      <ChakraLink as={ReactRouterLink} fontSize="sm" target="_blank" to={to}>
        <Icon as={icon} boxSize={6} color="gray.500" />
      </ChakraLink>
    </Tooltip>
  );
};

const languageContent: {
  translation: string;
  items: typeof languages;
} = {
  translation: 'language',
  items: languages,
};

export const Footer: FC = () => {
  const { i18n, t } = useTranslation();

  return (
    <Container as="footer" maxW="container.xl" paddingY="4">
      <Grid
        gap="4"
        templateColumns={{
          base: 'repeat(1, minmax(0, 1fr))',
          sm: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(4, minmax(0, 1fr))',
          lg: 'repeat(6, minmax(0, 1fr))',
        }}
      >
        <GridItem
          colSpan={{ base: 1, sm: 2 }}
          rowSpan={{ base: 1, md: 2, lg: 1 }}
        >
          <Heading as="h6" fontSize="sm" opacity="0.9" marginBottom="3">
            {t(`layouts.default.footer.${socialContent.translation}`)}
          </Heading>

          <Flex gap="3">
            {socialContent.items.map((social) => (
              <SocialItem key={social.translation} {...social} />
            ))}
          </Flex>

          <Box height="3" />

          <Heading as="h6" fontSize="sm" opacity="0.9" marginBottom="3">
            {t(`layouts.default.footer.${languageContent.translation}`)}
          </Heading>

          <Menu>
            <MenuButton>
              <Flex gap="2" alignItems="center">
                <Image
                  src={
                    _.find(
                      languageContent.items,
                      ({ translation }) => translation === i18n.language,
                    )?.icon
                  }
                  height="6"
                  rounded="sm"
                  shadow="md"
                />

                <Text
                  fontWeight="500"
                  flex="1 0 auto"
                  opacity="0.8"
                  _hover={{ opacity: '1' }}
                >
                  {t(`common.languages.${i18n.language}`)}
                </Text>
              </Flex>
            </MenuButton>

            <MenuList>
              <MenuOptionGroup
                value={i18n.language}
                onChange={(value) => i18n.changeLanguage(value as string)}
                type="radio"
              >
                {languageContent.items.map(({ translation, icon }) => (
                  <MenuItemOption key={translation} value={translation}>
                    <Flex gap="2" alignItems="center" cursor="pointer">
                      <Text
                        flex="1 0 auto"
                        fontWeight="500"
                        opacity="0.8"
                        _hover={{ opacity: 1 }}
                      >
                        {t(`common.languages.${translation}`, {
                          lng: translation,
                        })}
                      </Text>
                      <Image src={icon} height="6" rounded="sm" shadow="md" />
                    </Flex>
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </GridItem>

        {footerMenus.map((menu) => (
          <GridItem key={menu.translation}>
            <FooterMenu {...menu} />
          </GridItem>
        ))}

        <GridItem colSpan={{ base: 1, sm: 2, md: 4, lg: 6 }}>
          <Divider marginBottom={{ base: '2', md: '4' }} />

          <Text opacity="0.85" textAlign="center">
            Copyright ©{' '}
            <Text as="span" display="inline" fontWeight="medium">
              {dayjs().year()}
            </Text>
          </Text>
          <Text opacity="0.9" textAlign="center">
            Made with Love by{' '}
            <Text as="span" color="brand.600" display="inline" fontWeight="600">
              Akira Tatsuhisa
            </Text>
          </Text>
        </GridItem>
      </Grid>
    </Container>
  );
};
