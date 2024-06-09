import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  Center,
  Container,
  FlexboxProps,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Link,
  SpaceProps,
  Stack,
  Tag,
  Text,
  ThemingProps,
  Tooltip,
  TypographyProps,
  Wrap,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as ReactRouterLink } from 'react-router-dom';

import { ImageHeader } from '@/components/Headers';
import { PageLoading } from '@/components/Loading';
import { NO_IMAGE_SRC } from '@/constants';
import {
  Enumerable,
  mapDatabases,
  mapFrameworks,
  mapProgramingLanguages,
  mapTechnologies,
} from '@/enums';
import { useDetail } from '@/pages/Project/useDetail';
import { formatDate } from '@/utils';

import { ProjectStatus } from './Components';

const headingH2Props: {
  flex: FlexboxProps['flex'];
  fontWeight: TypographyProps['fontWeight'];
  textAlign: TypographyProps['textAlign'];
} = { flex: '1', fontWeight: 'semibold', textAlign: 'left' };

const headingH3Props: {
  size: ThemingProps['size'];
  fontWeight: TypographyProps['fontWeight'];
  marginBottom: SpaceProps['marginBottom'];
} = {
  size: { base: 'sm', md: 'md' },
  fontWeight: 'semibold',
  marginBottom: '3',
};

const textPProps: {
  fontSize: TypographyProps['fontSize'];
} = { fontSize: { base: '1rem', md: '1.125rem' } };

const Items: FC<{
  translationField: string;
  values: Array<string>;
  translationEnum: string;
  mapEnum: Record<string, Enumerable>;
}> = ({ translationField, values, translationEnum, mapEnum }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common',
  });

  return (
    <>
      {values.length > 0 && (
        <Box>
          <Heading as="h2" {...headingH3Props}>
            {t(`fields.${translationField}`)}
          </Heading>

          <Wrap spacing="3">
            {values.map((value) => (
              <Tooltip
                key={value}
                label={t(`${translationEnum}.${mapEnum[value].translation}`)}
              >
                <Box
                  padding="2"
                  rounded="xl"
                  shadow="md"
                  backgroundColor="gray.100"
                >
                  <Image
                    height={{ base: '16', md: '20' }}
                    src={mapEnum[value].icon}
                  />
                </Box>
              </Tooltip>
            ))}
          </Wrap>
        </Box>
      )}
    </>
  );
};

const View: FC = () => {
  const { t: tAccordions, i18n } = useTranslation('translation', {
    keyPrefix: 'pages.project.accordions',
  });

  const { t } = useTranslation('translation', {
    keyPrefix: 'common.fields',
  });

  const { isLoading, data, error } = useDetail();

  if (isLoading || !data || error) {
    return <PageLoading />;
  }

  const project = data;
  const projectLocalization = data.projectLocalization;

  return (
    <>
      <ImageHeader src={project.thumbSrc ?? NO_IMAGE_SRC}>
        <Center
          flexDirection="column"
          width="full"
          height="full"
          color="white"
          textAlign="center"
        >
          <Heading as="h1" fontWeight="medium" size="3xl" marginBottom="3">
            {projectLocalization.title}
          </Heading>

          {projectLocalization.client && (
            <Heading as="h2" fontWeight="light" size="lg" opacity="0.8">
              {projectLocalization.client}
            </Heading>
          )}
        </Center>
      </ImageHeader>

      <Container maxWidth="container.xl" paddingY="4" marginBottom="4">
        <Stack gap="4">
          {project.imageSrcs.length && (
            <Box>
              <Heading as="h2" {...headingH3Props}>
                {t('images')}
              </Heading>

              <HStack gap="3" overflowX="auto">
                {project.imageSrcs.map((src) => (
                  <Box
                    key={src}
                    flex="0 0 auto"
                    height="40"
                    aspectRatio="16 / 9"
                    overflow="hidden"
                    rounded="lg"
                    shadow="md"
                  >
                    <Image
                      height="full"
                      width="full"
                      objectFit="cover"
                      src={src}
                    />
                  </Box>
                ))}
              </HStack>
            </Box>
          )}

          <Card rounded="3xl">
            <CardBody paddingX="0">
              <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
                <AccordionItem>
                  <Box>
                    <AccordionButton>
                      <Box as="span" {...headingH2Props}>
                        {tAccordions('information')}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </Box>

                  <AccordionPanel>
                    <Grid
                      gap="4"
                      templateColumns={{
                        base: 'repeat(1, minmax(0, 1fr))',
                        sm: 'repeat(2, minmax(0, 1fr))',
                        md: 'repeat(3, minmax(0, 1fr))',
                      }}
                    >
                      <GridItem colSpan={{ base: 1, sm: 2, md: 1 }}>
                        <Heading as="h2" {...headingH3Props}>
                          {t('status')}
                        </Heading>

                        <ProjectStatus
                          value={project.status}
                          size="lg"
                          rounded="lg"
                        />
                      </GridItem>

                      <GridItem>
                        <Heading as="h2" {...headingH3Props}>
                          {t('startDate')}
                        </Heading>

                        <Tag colorScheme="cyan" size="lg">
                          {project.startDate
                            ? formatDate(project.startDate, {
                                locales: i18n.language,
                              })
                            : '-'}
                        </Tag>
                      </GridItem>

                      <GridItem>
                        <Heading as="h2" {...headingH3Props}>
                          {t('endDate')}
                        </Heading>

                        <Tag colorScheme="teal" size="lg">
                          {project.endDate
                            ? formatDate(project.endDate, {
                                locales: i18n.language,
                              })
                            : '-'}
                        </Tag>
                      </GridItem>
                    </Grid>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <Box>
                    <AccordionButton>
                      <Box as="span" {...headingH2Props}>
                        {tAccordions('detail')}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </Box>

                  <AccordionPanel>
                    <Grid
                      gap="4"
                      templateColumns={{
                        base: 'repeat(1, minmax(0, 1fr))',
                        md: 'repeat(2, minmax(0, 1fr))',
                      }}
                    >
                      {projectLocalization.description && (
                        <GridItem colSpan={{ base: 1, md: 2 }}>
                          <Heading as="h2" {...headingH3Props}>
                            {t('description')}
                          </Heading>

                          <Text {...textPProps}>
                            {projectLocalization.description}
                          </Text>
                        </GridItem>
                      )}

                      {projectLocalization.website && (
                        <GridItem>
                          <Heading as="h2" {...headingH3Props}>
                            {t('website')}
                          </Heading>

                          <Link
                            as={ReactRouterLink}
                            to={projectLocalization.website}
                            target="_blank"
                            color="brand.500"
                            {...textPProps}
                          >
                            {projectLocalization.website}
                          </Link>
                        </GridItem>
                      )}

                      {projectLocalization.source && (
                        <GridItem>
                          <Heading as="h2" {...headingH3Props}>
                            {t('source')}
                          </Heading>

                          <Link
                            as={ReactRouterLink}
                            to={projectLocalization.source}
                            target="_blank"
                            color="brand.500"
                            {...textPProps}
                          >
                            {projectLocalization.source}
                          </Link>
                        </GridItem>
                      )}
                    </Grid>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <Box>
                    <AccordionButton>
                      <Box as="span" {...headingH2Props}>
                        {tAccordions('technicalStack')}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </Box>

                  <AccordionPanel>
                    <Grid
                      gap="4"
                      templateColumns={{
                        base: 'repeat(1, minmax(0, 1fr))',
                        md: 'repeat(2, minmax(0, 1fr))',
                      }}
                    >
                      <Items
                        translationField="languages"
                        values={project.languages}
                        translationEnum="programingLanguages"
                        mapEnum={mapProgramingLanguages}
                      />

                      <Items
                        translationField="frameworks"
                        values={project.frameworks}
                        translationEnum="frameworks"
                        mapEnum={mapFrameworks}
                      />

                      <Items
                        translationField="databases"
                        values={project.databases}
                        translationEnum="databases"
                        mapEnum={mapDatabases}
                      />

                      <Items
                        translationField="technologies"
                        values={project.technologies}
                        translationEnum="technologies"
                        mapEnum={mapTechnologies}
                      />

                      {project.others.length > 0 && (
                        <Box>
                          <Heading as="h2" {...headingH3Props}>
                            {t('others')}
                          </Heading>

                          <Wrap spacing="3">
                            {project.others.map((value) => (
                              <Tooltip key={value} label={value}>
                                <Box
                                  padding="2"
                                  rounded="xl"
                                  shadow="md"
                                  backgroundColor="gray.100"
                                >
                                  <Center
                                    width={{ base: '16', md: '20' }}
                                    height={{ base: '16', md: '20' }}
                                    overflow="hidden"
                                    textOverflow="ellipsis"
                                    wordBreak="break-word"
                                    whiteSpace="pre-wrap"
                                    textColor="black"
                                  >
                                    {value}
                                  </Center>
                                </Box>
                              </Tooltip>
                            ))}
                          </Wrap>
                        </Box>
                      )}
                    </Grid>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card>
        </Stack>
      </Container>
    </>
  );
};

export const Page: FC = () => {
  const { i18n } = useTranslation();

  return <View key={i18n.language} />;
};
