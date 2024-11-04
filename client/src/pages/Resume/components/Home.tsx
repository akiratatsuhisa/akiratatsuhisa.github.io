import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MdExplore } from 'react-icons/md';

import { useHash } from '@/hooks';

export const Home: FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.resume.sections.home',
  });

  const { onClickHash } = useHash({
    defaultHash: 'home',
    hashQuery: 'section.section',
  });

  return (
    <Container maxWidth="container.xl" paddingBottom="4">
      <Flex
        columnGap={{ base: '0', sm: '4', md: '8', lg: '24' }}
        flexDirection={{ base: 'column-reverse', sm: 'row' }}
        rowGap={{ base: '4', sm: '0' }}
      >
        <Flex
          flexDirection="column"
          flex="1 1 auto"
          justifyContent="center"
          rowGap={{ base: '3', lg: '6' }}
        >
          <Heading as="h1" fontWeight="600">
            {t('title')}
          </Heading>

          <Text fontSize="xl">{t('description')}</Text>

          <Box>
            <Button
              as={motion.button}
              rightIcon={<MdExplore />}
              variant="outline"
              width={{ base: 'full', sm: 'auto' }}
              onClick={() => onClickHash('about')}
            >
              {t('action')}
            </Button>
          </Box>
        </Flex>

        <Box flexShrink="0">
          <Box
            aspectRatio="3 / 4"
            overflow="hidden"
            rounded="2xl"
            shadow="sm"
            width={{ base: 'auto', sm: '12rem', md: '20rem', lg: '24rem' }}
          >
            <Image
              height="full"
              objectFit="cover"
              objectPosition="bottom"
              src="/images/resume/header.jpg"
              width="full"
            />
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};
