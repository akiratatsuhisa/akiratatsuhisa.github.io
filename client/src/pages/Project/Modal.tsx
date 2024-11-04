import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Divider,
  FlexboxProps,
  Icon,
  Image,
  Link,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tag,
  Tooltip,
  TypographyProps,
  Wrap,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Translation, useTranslation } from 'react-i18next';
import { MdLink, MdVisibility } from 'react-icons/md';
import { Link as ReactRouterLink } from 'react-router-dom';

import { ModalCloseIcon, ModalLoading } from '@/components/Loading';
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
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" {...headingH2Props}>
                {t(`fields.${translationField}`)}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel>
            <Wrap spacing="3">
              {values.map((value) => (
                <Tooltip
                  key={value}
                  label={t(`${translationEnum}.${mapEnum[value].value}`)}
                >
                  <Box
                    padding="2"
                    rounded="xl"
                    shadow="md"
                    backgroundColor="gray.100"
                  >
                    <Image height="16" src={mapEnum[value].icon} />
                  </Box>
                </Tooltip>
              ))}
            </Wrap>
          </AccordionPanel>
        </AccordionItem>
      )}
    </>
  );
};

export const Modal: FC = () => {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'common.fields',
  });

  const { isLoading, data, error } = useDetail();

  if (isLoading || !data || error) {
    return <ModalLoading />;
  }

  const project = data;
  const projectLocalization = data.projectLocalization;

  return (
    <ModalContent>
      <ModalHeader as="h1">{projectLocalization.title}</ModalHeader>
      <ModalCloseIcon />

      <Box>
        <Divider />
      </Box>

      <ModalBody padding="0">
        {project.thumbSrc && (
          <Box aspectRatio="16 / 9">
            <Image
              height="full"
              width="full"
              objectFit="cover"
              src={project.thumbSrc}
            />
          </Box>
        )}

        <Accordion allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" {...headingH2Props}>
                  {t('status')}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel>
              <ProjectStatus value={project.status} />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" {...headingH2Props}>
                  {t('startDate')}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel>
              <Tag colorScheme="cyan">
                {project.startDate
                  ? formatDate(project.startDate, {
                      locales: i18n.language,
                    })
                  : '-'}
              </Tag>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" {...headingH2Props}>
                  {t('endDate')}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>

            <AccordionPanel>
              <Tag colorScheme="teal">
                {project.endDate
                  ? formatDate(project.endDate, {
                      locales: i18n.language,
                    })
                  : '-'}
              </Tag>
            </AccordionPanel>
          </AccordionItem>

          {projectLocalization.description && (
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" {...headingH2Props}>
                    {t('description')}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>

              <AccordionPanel>{projectLocalization.description}</AccordionPanel>
            </AccordionItem>
          )}

          {projectLocalization.client && (
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" {...headingH2Props}>
                    {t('client')}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>

              <AccordionPanel>{projectLocalization.client}</AccordionPanel>
            </AccordionItem>
          )}

          {projectLocalization.website && (
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" {...headingH2Props}>
                    {t('website')}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>

              <AccordionPanel>
                <Link
                  as={ReactRouterLink}
                  to={projectLocalization.website}
                  target="_blank"
                  color="brand.500"
                >
                  {projectLocalization.website}
                </Link>
              </AccordionPanel>
            </AccordionItem>
          )}

          {projectLocalization.source && (
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" {...headingH2Props}>
                    {t('source')}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>

              <AccordionPanel>
                <Link
                  as={ReactRouterLink}
                  to={projectLocalization.source}
                  target="_blank"
                  color="brand.500"
                >
                  {projectLocalization.source}
                </Link>
              </AccordionPanel>
            </AccordionItem>
          )}

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
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" {...headingH2Props}>
                    {t('others')}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>

              <AccordionPanel>
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
                          width="16"
                          height="16"
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
              </AccordionPanel>
            </AccordionItem>
          )}
        </Accordion>
      </ModalBody>

      <Box>
        <Divider />
      </Box>

      <Translation keyPrefix="common">
        {(t) => (
          <ModalFooter paddingX="3" gap="3" justifyContent="flex-end">
            <Button leftIcon={<Icon as={MdVisibility} />} variant="ghost">
              {t('plurals.views', { count: project.views })}
            </Button>
            <Button
              as={ReactRouterLink}
              to={{ pathname: `/projects/${projectLocalization.slug}` }}
              rightIcon={<Icon as={MdLink} />}
              variant="solid"
            >
              {t('labels.explore')}
            </Button>
          </ModalFooter>
        )}
      </Translation>
    </ModalContent>
  );
};
