import {
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useMultiStyleConfig,
  useTab,
  UseTabProps,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import _ from 'lodash';
import { createContext, FC, forwardRef, useContext, useEffect } from 'react';
import { Translation } from 'react-i18next';
import { MdAddCircle, MdRemoveCircle, MdSave } from 'react-icons/md';
import { LanguageCode, upsertProjectLocalizationSchema } from 'shared';
import * as Yup from 'yup';

import { CommonAlertDialog } from '@/components/AlertDialog';
import {
  FormControlInput,
  FormControlTagsGroup,
  FormControlTextarea,
} from '@/components/FormControls';
import { commonAlertProps } from '@/constants';
import { languages, mapLanguages } from '@/enums';
import { useAxios } from '@/hooks';
import {
  ICreateProjectLocalizationRequest,
  IProjectDetailResponse,
  IProjectLocalizationDetailResponse,
  IUpdateProjectLocalizationRequest,
} from '@/interfaces';
import { services } from '@/services';

// eslint-disable-next-line react-refresh/only-export-components
export const PageContext = createContext<{
  projectId: string;
  isLoading: boolean;
  onSubmit: () => void;
}>({
  projectId: '',
  isLoading: false,
  onSubmit: () => undefined,
});

const AddProjectLocalization: FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (language: string, form: ICreateProjectLocalizationRequest) => void;
  excludeLanguageCodes: Array<string>;
}> = ({ isOpen, onClose, onSubmit, excludeLanguageCodes }) => {
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    resetForm,
  } = useFormik<{ language: string } & ICreateProjectLocalizationRequest>({
    initialValues: {
      language: '',
      title: '',
      slug: '',
    },
    validationSchema: upsertProjectLocalizationSchema
      .pick(['title', 'slug'])
      .concat(
        Yup.object({
          language: Yup.string().required().oneOf(_.values(LanguageCode)),
        }),
      ),
    onSubmit: ({ language, ...form }, helper) => {
      onSubmit(language, form);
      helper.resetForm();
      onClose();
    },
  });

  return (
    <Modal
      scrollBehavior="inside"
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
      size={{ base: 'full', md: 'xl' }}
    >
      <ModalOverlay />

      <ModalContent
        as="form"
        onSubmit={(event) => handleSubmit(event as never)}
      >
        <Translation keyPrefix="common.fields">
          {(t) => <ModalHeader>{t('language')}</ModalHeader>}
        </Translation>
        <ModalCloseButton />
        <ModalCloseButton />

        <Box>
          <Divider />
        </Box>

        <ModalBody padding="4">
          <VStack spacing="4">
            <FormControlTagsGroup
              translation="languages"
              error={errors.language}
              touched={touched.language}
              value={values.language}
              onChange={async (value) => {
                await setFieldValue('language', value);
                setFieldTouched('language', true);
              }}
              translationOptionKeyPrefix="languages"
              options={_.filter(
                languages,
                (language) => !_.includes(excludeLanguageCodes, language.value),
              )}
            />

            <FormControlInput
              translation="title"
              name="title"
              type="text"
              value={values.title}
              error={errors.title}
              touched={touched.title}
              onBlur={handleBlur}
              onChange={handleChange}
              payload={{ max: 255 }}
            />

            <FormControlInput
              translation="slug"
              name="slug"
              type="text"
              value={values.slug}
              error={errors.slug}
              touched={touched.slug}
              onBlur={handleBlur}
              onChange={handleChange}
              payload={{ max: 255 }}
            />
          </VStack>
        </ModalBody>

        <Box>
          <Divider />
        </Box>

        <Translation keyPrefix="common.labels">
          {(t) => (
            <ModalFooter padding="3" gap="3">
              <Button
                colorScheme="gray"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
              >
                {t('cancel')}
              </Button>

              <Button colorScheme="green" type="submit">
                {t('add')}
              </Button>
            </ModalFooter>
          )}
        </Translation>
      </ModalContent>
    </Modal>
  );
};

const InsertTab: FC<{
  currentLanguageCodes: Array<string>;
}> = ({ currentLanguageCodes }) => {
  const { projectId, isLoading, onSubmit } = useContext(PageContext);

  const { request: requestUpsert, isLoading: isLoadingUpsert } = useAxios(
    services.projects,
    'upsertLocale',
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const styles = useMultiStyleConfig('Tabs');

  if (languages.length === currentLanguageCodes.length) {
    return <></>;
  }

  return (
    <>
      <Translation keyPrefix="common.labels">
        {(t) => (
          <Button
            __css={styles.tab}
            flex="0 0 auto"
            display="flex"
            alignItems="center"
            fontWeight="semibold"
            color="green"
            isLoading={isLoading || isLoadingUpsert}
            rightIcon={<Icon as={MdAddCircle} boxSize="5" />}
            onClick={onOpen}
          >
            {t('add')}
          </Button>
        )}
      </Translation>

      <AddProjectLocalization
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={(language, form) =>
          requestUpsert(projectId, language, form).then(() => onSubmit?.())
        }
        excludeLanguageCodes={currentLanguageCodes}
      />
    </>
  );
};

const LocalizationTab =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forwardRef<any, { languageValue: string } & UseTabProps>(
    ({ languageValue, ...props }, ref) => {
      const tabProps = useTab({ ...props, ref });
      const styles = useMultiStyleConfig('Tabs', tabProps);

      const { value, icon } = mapLanguages[languageValue];

      return (
        <Translation keyPrefix="common.languages">
          {(t) => (
            <Button
              __css={styles.tab}
              {...tabProps}
              flex="0 0 auto"
              display="flex"
              alignItems="center"
              leftIcon={
                <Image src={icon} height="5" rounded="sm" shadow="md" />
              }
            >
              <Text as="span" flex="0 0 auto">
                {t(value)}
              </Text>
            </Button>
          )}
        </Translation>
      );
    },
  );

const LocalizationTabPanel: FC<{
  languageCode: string;
  initialValues: IProjectLocalizationDetailResponse;
}> = ({ languageCode, initialValues }) => {
  const { projectId, isLoading, onSubmit } = useContext(PageContext);

  const { request: requestUpsert, isLoading: isLoadingUpsert } = useAxios(
    services.projects,
    'upsertLocale',
  );

  const { request: requestDelete, isLoading: isLoadingDelete } = useAxios(
    services.projects,
    'deleteLocale',
  );

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    dirty,
  } = useFormik<IUpdateProjectLocalizationRequest>({
    initialValues: {
      title: '',
      slug: '',
      description: '',
      client: '',
      website: '',
      source: '',
    },
    validationSchema: upsertProjectLocalizationSchema,
    onSubmit: async (form) => {
      await requestUpsert(projectId, languageCode, form);
      resetForm({
        values: { ...form },
      });
      onSubmit?.();
    },
  });

  useEffect(() => {
    resetForm({
      values: {
        title: initialValues.title,
        slug: initialValues.slug,
        description: initialValues.description ?? '',
        client: initialValues.client ?? '',
        website: initialValues.website ?? '',
        source: initialValues.source ?? '',
      },
    });
  }, []);

  const {
    isOpen: isOpenAlertDeleteDialog,
    onOpen: onOpenAlertDeleteDialog,
    onClose: onCloseAlertDeleteDialog,
  } = useDisclosure();

  return (
    <TabPanel
      as="form"
      padding="0"
      onSubmit={(event) => handleSubmit(event as never)}
    >
      <Grid
        padding="4"
        gap="4"
        templateColumns={{
          base: 'repeat(1, minmax(0, 1fr))',
          md: 'repeat(2, minmax(0, 1fr))',
        }}
      >
        <FormControlInput
          translation="title"
          name="title"
          type="text"
          value={values.title}
          error={errors.title}
          touched={touched.title}
          onBlur={handleBlur}
          onChange={handleChange}
          payload={{ max: 255 }}
        />

        <FormControlInput
          translation="slug"
          name="slug"
          type="text"
          value={values.slug}
          error={errors.slug}
          touched={touched.slug}
          onBlur={handleBlur}
          onChange={handleChange}
          payload={{ max: 255 }}
        />

        <FormControlInput
          translation="website"
          name="website"
          type="text"
          value={values.website}
          error={errors.website}
          touched={touched.website}
          onBlur={handleBlur}
          onChange={handleChange}
          payload={{ max: 255 }}
        />

        <FormControlInput
          translation="source"
          name="source"
          type="text"
          value={values.source}
          error={errors.source}
          touched={touched.source}
          onBlur={handleBlur}
          onChange={handleChange}
          payload={{ max: 255 }}
        />

        <FormControlInput
          translation="client"
          name="client"
          type="text"
          value={values.client}
          error={errors.client}
          touched={touched.client}
          onBlur={handleBlur}
          onChange={handleChange}
          payload={{ max: 255 }}
        />

        <GridItem colSpan={{ base: 1, md: 2 }}>
          <FormControlTextarea
            translation="description"
            name="description"
            value={values.description}
            error={errors.description}
            touched={touched.description}
            onBlur={handleBlur}
            onChange={handleChange}
            payload={{ max: 1024 }}
          />
        </GridItem>
      </Grid>

      <Box>
        <Divider />
      </Box>

      <Translation keyPrefix="common.labels">
        {(t) => (
          <Flex justifyContent="flex-end" padding="3" gap="3">
            <Button
              colorScheme="green"
              type="submit"
              isLoading={isLoading || isLoadingUpsert || isLoadingDelete}
              isDisabled={!dirty}
              leftIcon={<Icon as={MdSave} />}
            >
              {t('save')}
            </Button>

            <Button
              colorScheme="red"
              onClick={onOpenAlertDeleteDialog}
              isLoading={isLoading || isLoadingDelete}
              leftIcon={<Icon as={MdRemoveCircle} />}
            >
              {t('remove')}
            </Button>
          </Flex>
        )}
      </Translation>

      <CommonAlertDialog
        {...commonAlertProps.delete}
        isOpen={isOpenAlertDeleteDialog}
        onClose={onCloseAlertDeleteDialog}
        onSubmit={() =>
          requestDelete(projectId, languageCode).then(() => onSubmit?.())
        }
      />
    </TabPanel>
  );
};

export const LocalizationTabs: FC<{
  data: IProjectDetailResponse['projectLocalizations'];
}> = ({ data }) => {
  return (
    <Card flex="1 1 auto">
      <Box as={Tabs}>
        <Box overflowY="auto">
          <TabList>
            {data.map(({ languageCode }) => (
              <LocalizationTab
                key={languageCode}
                languageValue={languageCode}
              />
            ))}
            <InsertTab currentLanguageCodes={_.map(data, 'languageCode')} />
          </TabList>
        </Box>

        <TabPanels>
          {data.map((localization) => (
            <LocalizationTabPanel
              key={localization.languageCode}
              languageCode={localization.languageCode}
              initialValues={localization}
            />
          ))}
        </TabPanels>
      </Box>
    </Card>
  );
};
