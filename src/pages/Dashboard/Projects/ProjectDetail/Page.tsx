import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  CardHeader,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Image,
  Stack,
  useColorModeValue,
  useDisclosure,
  VStack,
  Wrap,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import _ from 'lodash';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Translation } from 'react-i18next';
import {
  MdChevronLeft,
  MdChevronRight,
  MdClose,
  MdDelete,
  MdDownload,
  MdEdit,
  MdImage,
  MdUpload,
} from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { CommonAlertDialog } from '@/components/AlertDialog';
import { CropperImageModal } from '@/components/CropperImageModal';
import {
  FormControlInput,
  FormControlRadioGroup,
  FormControlSwitch,
  FormControlTagGroup,
} from '@/components/FormControls';
import { PageLoading } from '@/components/Loading';
import { commonAlertProps } from '@/constants';
import {
  databases,
  frameworks,
  programingLanguages,
  projectStatus,
  technologies,
} from '@/enums';
import { useAxios, useFileDialog } from '@/hooks';
import { IProjectDetailResponse } from '@/interfaces';
import { services } from '@/services';

import { ProjectModal } from '../Components';
import { LocalizationTabs, PageContext } from './Components';

export const ProjectImageCropper: FC<{
  isThumb?: boolean;
}> = ({ isThumb }) => {
  const { projectId, isLoading, onSubmit } = useContext(PageContext);

  const hoverBgColor = useColorModeValue('blackAlpha.300', 'whiteAlpha.300');

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { open: onOpenFileDialog, files } = useFileDialog({});

  const [selectedImage, setSelectedImage] = useState<File>();

  useEffect(() => {
    if (!files || !files.length) {
      return;
    }

    setSelectedImage(files.item(0)!);
    onOpen();
  }, [files]);

  const {
    request: requestGetTemporaryUploadLink,
    isLoading: isLoadingGetTemporaryUploadLink,
    percent: percentGetTemporaryUploadLink,
  } = useAxios(services.projects, 'uploadImage');

  const {
    request: requestUploadDropbox,
    isLoading: isLoadingUploadDropbox,
    percent: percentUploadDropbox,
  } = useAxios(services.projects, 'uploadDropbox', {
    unauth: true,
  });

  const handleSubmit = async (blob: Blob) => {
    const file = new File([blob], 'image.png', { type: 'image/png' });
    const { link } = await requestGetTemporaryUploadLink(projectId!, {
      isThumb,
    });
    await requestUploadDropbox(link, file);
    onSubmit?.();
  };

  const isUpload =
    typeof percentGetTemporaryUploadLink === 'undefined' ||
    percentGetTemporaryUploadLink === 100;

  const isAnyLoading =
    isLoading || isLoadingGetTemporaryUploadLink || isLoadingUploadDropbox;

  return (
    <Box flex="0 0 auto" paddingX="2">
      <Flex
        height="40"
        aspectRatio="16 / 9"
        rounded="lg"
        border="dashed 0.25rem gray"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        position="relative"
        cursor={isAnyLoading ? 'progress' : 'pointer'}
        _hover={{ backgroundColor: hoverBgColor }}
        onClick={isAnyLoading ? undefined : () => onOpenFileDialog()}
      >
        {typeof percentGetTemporaryUploadLink === 'undefined' &&
        typeof percentUploadDropbox === 'undefined' ? (
          <Icon as={MdImage} color="gray" boxSize="10" />
        ) : (
          <CircularProgress
            color="gray"
            value={
              isUpload ? percentUploadDropbox : percentGetTemporaryUploadLink
            }
          >
            <CircularProgressLabel>
              <Icon
                as={isUpload ? MdUpload : MdDownload}
                color="gray"
                boxSize="30px"
              />
            </CircularProgressLabel>
          </CircularProgress>
        )}
      </Flex>

      <CropperImageModal
        image={selectedImage}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={(blob) => handleSubmit(blob)}
      />
    </Box>
  );
};

export const ProjectImage: FC<
  {
    isFirst?: boolean;
    isLast?: boolean;
    src: string;
  } & (
    | { isThumb: true; index?: undefined }
    | { isThumb?: false; index: number }
  )
> = ({ isThumb, isFirst, isLast, src, index }) => {
  const { projectId, isLoading, onSubmit } = useContext(PageContext);

  const { request: requestDeleteImage, isLoading: isLoadingDeleteImage } =
    useAxios(services.projects, 'deleteImage');

  const { request: requestSortImage, isLoading: isLoadingSortImage } = useAxios(
    services.projects,
    'sortImage',
  );

  const isAnyLoading = isLoading || isLoadingDeleteImage || isLoadingSortImage;

  return (
    <Box
      flex="0 0 auto"
      paddingX="2"
      _first={{ paddingLeft: 4 }}
      _last={{ paddingRight: 4 }}
    >
      <Box
        height="40"
        aspectRatio="16 / 9"
        overflow="hidden"
        rounded="lg"
        shadow="md"
        position="relative"
      >
        <Image height="full" width="full" objectFit="cover" src={src} />

        <IconButton
          top="2"
          right="2"
          position="absolute"
          rounded="full"
          size="sm"
          icon={<Icon as={MdClose} />}
          shadow="md"
          aria-label="delete"
          isLoading={isAnyLoading}
          onClick={() =>
            requestDeleteImage(projectId!, { index }).then(() => onSubmit?.())
          }
        />

        {!isThumb && (
          <>
            {!isFirst && (
              <IconButton
                bottom="2"
                left="2"
                position="absolute"
                rounded="full"
                size="sm"
                icon={<Icon as={MdChevronLeft} />}
                shadow="md"
                aria-label="delete"
                isLoading={isAnyLoading}
                onClick={() =>
                  requestSortImage(projectId!, {
                    index,
                    mode: 'decrement',
                  }).then(() => onSubmit?.())
                }
              />
            )}

            {!isLast && (
              <IconButton
                bottom="2"
                right="2"
                position="absolute"
                rounded="full"
                size="sm"
                icon={<Icon as={MdChevronRight} />}
                shadow="md"
                aria-label="delete"
                isLoading={isAnyLoading}
                onClick={() =>
                  requestSortImage(projectId!, {
                    index,
                    mode: 'increment',
                  }).then(() => onSubmit?.())
                }
              />
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

const Information: FC<{
  values: IProjectDetailResponse;
}> = ({ values }) => {
  const { projectId, isLoading, onSubmit } = useContext(PageContext);

  const navigate = useNavigate();

  const {
    isOpen: isOpenProjectModal,
    onOpen: onOpenProjectModal,
    onClose: onCloseProjectModal,
  } = useDisclosure();

  const { request: requestUpdateProject, isLoading: isLoadingUpdateProject } =
    useAxios(services.projects, 'update');

  const {
    isOpen: isOpenAlertDeleteDialog,
    onOpen: onOpenAlertDeleteDialog,
    onClose: onCloseAlertDeleteDialog,
  } = useDisclosure();

  const { request: requestDeleteProject, isLoading: isLoadingDeleteProject } =
    useAxios(services.projects, 'delete');

  return (
    <>
      <Card as="form">
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

                <BreadcrumbItem>
                  <BreadcrumbLink
                    as={Link}
                    to={{ pathname: '/dashboard/projects' }}
                  >
                    {t('projects')}
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink>{t('detail')}</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            )}
          </Translation>

          <Translation keyPrefix="common.labels">
            {(t) => (
              <Stack direction={{ base: 'column', md: 'row' }} spacing="3">
                <Button
                  colorScheme="yellow"
                  leftIcon={<Icon as={MdEdit} />}
                  onClick={() => onOpenProjectModal()}
                  isLoading={isLoading || isLoadingUpdateProject}
                >
                  {t('update')}
                </Button>

                <Button
                  colorScheme="red"
                  leftIcon={<Icon as={MdDelete} />}
                  onClick={() => onOpenAlertDeleteDialog()}
                  isLoading={isLoading || isLoadingDeleteProject}
                >
                  {t('delete')}
                </Button>
              </Stack>
            )}
          </Translation>
        </CardHeader>

        <CardBody paddingTop="0" paddingX="0">
          <Accordion allowToggle variant="un">
            <AccordionItem>
              <Box>
                <AccordionButton>
                  <Translation keyPrefix="common.labels">
                    {(t) => (
                      <Box as="span" flex="1" textAlign="left">
                        {t('information')}
                      </Box>
                    )}
                  </Translation>
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
                  <GridItem colSpan={{ base: 1, md: 2 }}>
                    <FormControlSwitch
                      translation="publish"
                      name="isPublished"
                      isChecked={values.isPublished}
                    />
                  </GridItem>

                  <FormControlInput
                    translation="startDate"
                    name="startDate"
                    type="date"
                    isReadOnly
                    value={
                      values.startDate
                        ? dayjs(values.startDate).format('YYYY-MM-DD')
                        : ''
                    }
                  />

                  <FormControlInput
                    translation="endDate"
                    name="endDate"
                    type="date"
                    isReadOnly
                    value={
                      values.endDate
                        ? dayjs(values.endDate).format('YYYY-MM-DD')
                        : ''
                    }
                  />

                  <GridItem colSpan={{ base: 1, md: 2 }}>
                    <FormControlRadioGroup
                      translation="status"
                      name="status"
                      value={values.status}
                      stack={Wrap}
                      translationOptionKeyPrefix="projectStatus"
                      options={projectStatus}
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 1, md: 2 }}>
                    <FormControlTagGroup
                      translation="languages"
                      multiple
                      value={values.languages}
                      translationOptionKeyPrefix="programingLanguages"
                      options={programingLanguages}
                      isReadOnly
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 1, md: 2 }}>
                    <FormControlTagGroup
                      translation="frameworks"
                      multiple
                      value={values.frameworks}
                      translationOptionKeyPrefix="frameworks"
                      options={frameworks}
                      isReadOnly
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 1, md: 2 }}>
                    <FormControlTagGroup
                      translation="languages"
                      multiple
                      value={values.languages}
                      translationOptionKeyPrefix="databases"
                      options={databases}
                      isReadOnly
                    />
                  </GridItem>

                  <GridItem colSpan={{ base: 1, md: 2 }}>
                    <FormControlTagGroup
                      translation="technologies"
                      multiple
                      value={values.technologies}
                      translationOptionKeyPrefix="technologies"
                      options={technologies}
                      isReadOnly
                    />
                  </GridItem>
                </Grid>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <Box>
                <AccordionButton>
                  <Translation keyPrefix="common.fields">
                    {(t) => (
                      <Box as="span" flex="1" textAlign="left">
                        {t('thumb')} & {t('images')}
                      </Box>
                    )}
                  </Translation>
                  <AccordionIcon />
                </AccordionButton>
              </Box>

              <AccordionPanel paddingX="0" overflowX="auto">
                <Flex>
                  {values.thumbSrc ? (
                    <ProjectImage isThumb src={values.thumbSrc} />
                  ) : (
                    <ProjectImageCropper isThumb />
                  )}

                  {_.map(values.imageSrcs, (src, index) => (
                    <ProjectImage
                      key={src}
                      src={src}
                      index={index}
                      isFirst={index === 0}
                      isLast={index === values.imageSrcs.length - 1}
                    />
                  ))}

                  <ProjectImageCropper />
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </CardBody>

        <Box>
          <Divider />
        </Box>
      </Card>

      <ProjectModal
        translationTitle="update"
        isOpen={isOpenProjectModal}
        onClose={onCloseProjectModal}
        onSubmit={(form) =>
          requestUpdateProject(projectId!, form).then(() => onSubmit?.())
        }
        value={values}
      />

      <CommonAlertDialog
        {...commonAlertProps.delete}
        isOpen={isOpenAlertDeleteDialog}
        onClose={onCloseAlertDeleteDialog}
        onSubmit={() =>
          requestDeleteProject(projectId!).then(() =>
            navigate('/dashboard/projects'),
          )
        }
      />
    </>
  );
};

export const Page: FC = () => {
  const { id } = useParams();

  const { isLoading, data, request } = useAxios(
    services.projects,
    'searchById',
    {
      paramsOrData: [id!],
    },
  );

  const onSubmit = useCallback(() => request(id!), [id]);

  if (!data) {
    return <PageLoading />;
  }

  return (
    <PageContext.Provider value={{ projectId: id!, isLoading, onSubmit }}>
      <Container maxWidth="container.xl" paddingBottom="4" height="full">
        <VStack align="stretch" spacing="4" height="full">
          <Information values={data} />

          <LocalizationTabs data={data.projectLocalizations} />
        </VStack>
      </Container>
    </PageContext.Provider>
  );
};
