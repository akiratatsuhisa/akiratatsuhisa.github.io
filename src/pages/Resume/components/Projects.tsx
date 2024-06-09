import {
  Box,
  Button,
  Card,
  CardFooter,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Translation, useTranslation } from 'react-i18next';
import { MdLink, MdVisibility } from 'react-icons/md';
import { Link as ReactRouterLink } from 'react-router-dom';

import { NO_IMAGE_SRC } from '@/constants';
import { useAxios, useBackgroundNavigate } from '@/hooks';
import { IProjectResponse } from '@/interfaces';
import { services } from '@/services';

const cardTransition = 'all 0.1s linear';

const Project: FC<IProjectResponse> = (props) => {
  const { navigateModal } = useBackgroundNavigate();

  const project = props;
  const projectLocalization = props.projectLocalization;

  return (
    <Card transition={cardTransition} rounded="lg" _hover={{ shadow: 'lg' }}>
      <Box
        rounded="lg"
        aspectRatio=" 16 / 9"
        overflow="hidden"
        position="relative"
        role="group"
        cursor="pointer"
        onClick={() =>
          navigateModal({ pathname: `/projects/${projectLocalization.slug}` })
        }
      >
        <Image objectFit="cover" src={project.thumbSrc ?? NO_IMAGE_SRC} />
        <Flex
          position="absolute"
          inset="0"
          flexDirection="column"
          justifyContent="end"
        >
          <Box
            transition={cardTransition}
            padding="3"
            color="white"
            bgColor="blackAlpha.300"
            _groupHover={{
              bgColor: 'blackAlpha.500',
            }}
          >
            <Heading
              transition={cardTransition}
              as="h3"
              fontWeight="600"
              fontSize="1.125rem"
              _groupHover={{
                fontSize: '1.25rem',
                color: 'brand.200',
              }}
            >
              {projectLocalization.title}
            </Heading>
          </Box>
        </Flex>
      </Box>

      <Translation keyPrefix="common">
        {(t) => (
          <CardFooter padding="3" gap="3" justifyContent="flex-end">
            <Button
              leftIcon={<Icon as={MdVisibility} />}
              size="sm"
              variant="ghost"
            >
              {t('plurals.views', { count: project.views })}
            </Button>
            <Button
              as={ReactRouterLink}
              to={{ pathname: `/projects/${projectLocalization.slug}` }}
              rightIcon={<Icon as={MdLink} />}
              size="sm"
              variant="solid"
            >
              {t('labels.explore')}
            </Button>
          </CardFooter>
        )}
      </Translation>
    </Card>
  );
};

const View: FC<{ languageCode: string }> = ({ languageCode }) => {
  const { data } = useAxios(services.projects, 'searchPublish', {
    unauth: true,
    paramsOrData: [languageCode],
  });

  return (
    <Grid
      templateColumns={{
        base: 'repeat(1, minmax(0, 1fr))',
        md: 'repeat(2, minmax(0, 1fr))',
        lg: 'repeat(3, minmax(0, 1fr))',
      }}
      gap={{
        base: '4',
        md: '6',
        xl: '8',
      }}
    >
      {data?.map((project) => <Project key={project.id} {...project} />)}
    </Grid>
  );
};

export const Projects: FC = () => {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'pages.resume.sections.projects',
  });

  return (
    <Container maxWidth="container.xl" paddingY="4">
      <Box textAlign="center">
        <Heading as="h2" fontWeight="600" marginBottom="4">
          {t('title')}
        </Heading>

        <Text fontSize="lg" opacity=".7" marginBottom="6">
          {t('description')}
        </Text>
      </Box>

      <View key={i18n.language} languageCode={i18n.language} />
    </Container>
  );
};
