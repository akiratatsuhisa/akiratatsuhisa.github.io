import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import _ from 'lodash';
import { FC } from 'react';
import { Translation, useTranslation } from 'react-i18next';
import {
  MdAdd,
  MdLayersClear,
  MdMenu,
  MdSearch,
  MdVisibility,
} from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import {
  FormControlCheckboxGroup,
  FormControlInput,
} from '@/components/FormControls';
import { NO_IMAGE_SRC } from '@/constants';
import {
  languages,
  mapLanguages,
  mapProjectStatus,
  projectStatus,
} from '@/enums';
import { useAxios } from '@/hooks';
import { IProjectResponse, ISearchProjectsRequest } from '@/interfaces';
import { services } from '@/services';

import { ProjectModal } from './Components';

const SearchConditions: FC<{
  isLoading?: boolean;
  onSubmit?: (values: ISearchProjectsRequest) => void;
}> = ({ isLoading, onSubmit }) => {
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, resetForm, setFieldValue } =
    useFormik<ISearchProjectsRequest>({
      initialValues: {
        title: '',
        client: '',
        status: [],
        language: [],
      },
      validationSchema: Yup.object({
        title: Yup.string().optional(),
        client: Yup.string().optional(),
        status: Yup.array().of(Yup.string()).optional(),
        language: Yup.array().of(Yup.string()).optional(),
      }),
      onSubmit: (values) => onSubmit?.(values),
    });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { request: requestCreateProject, isLoading: isLoadingCreateProject } =
    useAxios(services.projects, 'create');

  return (
    <>
      <Card as="form" onSubmit={(event) => handleSubmit(event as never)}>
        <CardHeader
          as={Flex}
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ md: 'center' }}
          padding="3"
          gap="3"
        >
          <Translation keyPrefix="pages.dashboard.breadcrumb">
            {(t) => (
              <Breadcrumb
                spacing="2px"
                separator={<ChevronRightIcon color="gray.500" />}
              >
                <BreadcrumbItem>
                  <BreadcrumbLink as={Link} to={{ pathname: '/dashboard' }}>
                    {t('dashboard')}
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>{t('projects')}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            )}
          </Translation>

          <Translation keyPrefix="common.labels">
            {(t) => (
              <Button
                colorScheme="green"
                leftIcon={<Icon as={MdAdd} />}
                onClick={() => onOpen()}
                isLoading={isLoadingCreateProject}
              >
                {t('create')}
              </Button>
            )}
          </Translation>
        </CardHeader>

        <Box>
          <Divider />
        </Box>

        <CardBody>
          <Grid
            gap="4"
            templateColumns={{
              base: 'repeat(1, minmax(0, 1fr))',
              md: 'repeat(2, minmax(0, 1fr))',
            }}
          >
            <FormControlInput
              translation="title"
              name="title"
              value={values.title}
              onChange={handleChange}
            />

            <FormControlInput
              translation="client"
              name="client"
              value={values.client}
              onChange={handleChange}
            />

            <FormControlCheckboxGroup
              translation="status"
              value={values.status}
              onChange={(e) => setFieldValue('status', e)}
              stack={Wrap}
              translationOptionKeyPrefix="projectStatus"
              options={projectStatus}
            />

            <FormControlCheckboxGroup
              translation="language"
              value={values.language}
              onChange={(e) => setFieldValue('language', e)}
              stack={Wrap}
              translationOptionKeyPrefix="languages"
              options={languages}
            />
          </Grid>
        </CardBody>

        <Box>
          <Divider />
        </Box>

        <Translation keyPrefix="common.labels">
          {(t) => (
            <CardFooter padding="3" justifyContent="end" gap="3">
              <Button
                type="button"
                colorScheme="blue"
                leftIcon={<Icon as={MdLayersClear} />}
                onClick={() => resetForm()}
              >
                {t('clear')}
              </Button>

              <Button
                type="submit"
                colorScheme="brand"
                isLoading={isLoading}
                leftIcon={<Icon as={MdSearch} />}
              >
                {t('search')}
              </Button>
            </CardFooter>
          )}
        </Translation>
      </Card>

      <ProjectModal
        translationTitle="create"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={(form) =>
          requestCreateProject(form).then(({ id }) =>
            navigate(`/dashboard/projects/${id}`),
          )
        }
      />
    </>
  );
};

const Record: FC<IProjectResponse & { isSortable?: boolean }> = ({
  id,
  thumbSrc,
  projectLocalizations,
  status,
  isPublished,
  isSortable,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });

  return (
    <Tr>
      <Td paddingY="2" paddingX="3">
        <HStack spacing="2">
          <Button
            as={Link}
            leftIcon={<Icon as={MdVisibility} />}
            to={`/dashboard/projects/${id}`}
          >
            {t('labels.view')}
          </Button>
        </HStack>
      </Td>

      <Td paddingY="2" paddingX="0">
        <Image
          width="24"
          aspectRatio="16 / 9"
          objectFit="cover"
          rounded="md"
          src={thumbSrc ?? NO_IMAGE_SRC}
        />
      </Td>

      <Td paddingY="2" paddingX="3">
        {projectLocalizations?.map(({ languageCode, title, slug }) => (
          <Flex key={languageCode} justifyContent="space-between">
            <Box>{_.truncate(title, { length: 30 })}</Box>{' '}
            <Box opacity="0.85">({_.truncate(slug, { length: 30 })})</Box>
          </Flex>
        ))}
      </Td>

      <Td paddingY="2" paddingX="3">
        {t(`projectStatus.${mapProjectStatus[status].translation}`)}
      </Td>

      <Td paddingY="2" paddingX="3">
        {t(`isPublished.${isPublished}`)}
      </Td>

      <Td paddingY="2" paddingX="3">
        <Wrap spacing="2">
          {projectLocalizations?.map(({ languageCode }) => (
            <Image
              key={languageCode}
              src={mapLanguages[languageCode]?.icon}
              height="6"
              rounded="sm"
              shadow="md"
            />
          ))}
        </Wrap>
      </Td>

      <Td paddingY="2" paddingX="2">
        {isSortable && (
          <IconButton
            variant="ghost"
            icon={<Icon as={MdMenu} />}
            aria-label="sort"
          />
        )}
      </Td>
    </Tr>
  );
};

const SearhResult: FC<{ data?: Array<IProjectResponse> }> = ({ data }) => {
  return (
    <Card flex="1 1 auto">
      <CardHeader>
        <Translation keyPrefix="common.labels">
          {(t) => <Heading size="md">{t('result')}</Heading>}
        </Translation>
      </CardHeader>

      <CardBody paddingTop="0" paddingX="0">
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Translation keyPrefix="common.fields">
                {(t) => (
                  <Tr>
                    <Th width="0"></Th>

                    <Th minWidth="6rem" width="6rem">
                      {t('thumb')}
                    </Th>

                    <Th>{t('title')}</Th>

                    <Th minWidth="8rem" width="8rem">
                      {t('status')}
                    </Th>

                    <Th minWidth="10.5rem" width="10.5rem">
                      {t('publish')}
                    </Th>

                    <Th minWidth="8.5rem" width="8.5rem">
                      {t('language')}
                    </Th>

                    <Th minWidth="3.5rem" width="3.5rem"></Th>
                  </Tr>
                )}
              </Translation>
            </Thead>

            <Tbody>
              {(data?.length ?? 0) > 0 ? (
                data?.map((record) => <Record key={record.id} {...record} />)
              ) : (
                <Translation keyPrefix="common.labels">
                  {(t) => (
                    <Tr>
                      <Td colSpan={7} textAlign="center">
                        {t('noRecord')}
                      </Td>
                    </Tr>
                  )}
                </Translation>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};

export const Page: FC = () => {
  const { isLoading, data, request } = useAxios(services.projects, 'search', {
    paramsOrData: [{}],
  });

  return (
    <Container maxWidth="container.xl" paddingBottom="4" height="full">
      <VStack align="stretch" spacing="4" height="full">
        <SearchConditions
          isLoading={isLoading}
          onSubmit={(values) => request(values)}
        />

        <SearhResult data={data} />
      </VStack>
    </Container>
  );
};
