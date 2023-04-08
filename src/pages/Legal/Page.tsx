import {
  Center,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import _ from 'lodash';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { ImageHeader } from '@/components/Headers';

import { LegalTabs } from './tabs';

const tabs: Record<
  string,
  { index: number; translation: string; component: JSX.Element }
> = {
  'terms-conditions': {
    index: 0,
    translation: 'termsAndConditions',
    component: <LegalTabs.TermsConditionsTab key="terms-conditions" />,
  },
  'privacy-policy': {
    index: 1,
    translation: 'privacyPolicy',
    component: <LegalTabs.PrivacyPolicyTab key="privacy-policy" />,
  },
  liecenses: {
    index: 2,
    translation: 'liecenses',
    component: <LegalTabs.LiecensesTab key="liecenses" />,
  },
};

const tabSize = _.size(tabs);

export const Page: FC = () => {
  const { tab } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!/^(terms-conditions|privacy-policy|liecenses)$/.test(tab!)) {
      navigate('/not-found');
    }
  }, [tab]);

  const segmentedButtonsBgColor = useColorModeValue(
    'whiteAlpha.500',
    'whiteAlpha.300',
  );

  const { t } = useTranslation('translation', { keyPrefix: 'pages.legal' });

  return (
    <>
      <ImageHeader
        src="/images/nature-2.jpg"
        aspectRatio={{ base: 'auto', md: '19 / 6' }}
        minHeight="60"
      >
        <VStack height="full" gap="3" alignItems="stretch">
          <Center flexGrow="1" textColor="white">
            <Heading as="h1">{t('title')}</Heading>
          </Center>

          <Stack
            direction={{ base: 'column', md: 'row' }}
            gap="1"
            padding="1"
            flexShrink="0"
            backgroundColor={segmentedButtonsBgColor}
            position="relative"
            marginBottom="3"
            rounded="lg"
          >
            <Flex
              position="absolute"
              backgroundColor="white"
              rounded="lg"
              boxShadow="lg"
              width={{
                base: `calc(100% - var(--chakra-space-1) * 2)`,
                md: `calc((100% - var(--chakra-space-1) * 2 - var(--chakra-space-1) * ${tabSize - 1}) / ${tabSize})`,
              }}
              height={{
                base: `calc((100% - var(--chakra-space-1) * 2 - var(--chakra-space-1) * ${tabSize - 1}) / ${tabSize})`,
                md: `calc(100% - var(--chakra-space-1) * 2)`,
              }}
              left={{
                base: `var(--chakra-space-1)`,
                md: `calc(var(--chakra-space-1) + calc((100% - var(--chakra-space-1) * 2 - var(--chakra-space-1) * ${tabSize - 1}) / ${tabSize}) * ${tabs[tab!].index} + var(--chakra-space-1) * ${tabs[tab!].index})`,
              }}
              top={{
                base: `calc(var(--chakra-space-1) + calc((100% - var(--chakra-space-1) * 2 - var(--chakra-space-1) * ${tabSize - 1}) / ${tabSize}) * ${tabs[tab!].index} + var(--chakra-space-1) * ${tabs[tab!].index})`,
                md: 'var(--chakra-space-1)',
              }}
              transition="all 0.25s ease-out"
            />

            {_.map(tabs, ({ translation }, tabName) => (
              <Flex
                flex="1 1 0"
                key={tabName}
                position="relative"
                justifyContent="center"
                paddingY="1"
                paddingX="3"
                textAlign="center"
                textColor={tabName === tab ? 'black' : 'white'}
                role="button"
                onClick={() => navigate(`/legal/${tabName}`)}
                transition="all 0.25s ease-in-out"
                userSelect="none"
              >
                <Text as="h2" fontWeight="semibold">
                  {t(`tabs.${translation}`)}
                </Text>
              </Flex>
            ))}
          </Stack>
        </VStack>
      </ImageHeader>

      <Container padding="4" maxWidth="container.xl">
        {tabs[tab!].component}
      </Container>
    </>
  );
};
