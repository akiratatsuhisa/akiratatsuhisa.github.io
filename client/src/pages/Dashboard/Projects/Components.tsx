import {
  Box,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Wrap,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { FC, useEffect } from 'react';
import { Translation } from 'react-i18next';
import { upsertProjectSchema } from 'shared';

import {
  FormControlInput,
  FormControlInputTagsGroup,
  FormControlRadioGroup,
  FormControlSwitch,
  FormControlTagsGroup,
} from '@/components/FormControls';
import {
  databases,
  frameworks,
  programingLanguages,
  projectStatus,
  technologies,
} from '@/enums';
import { IProjectDetailResponse, IUpsertProjectRequest } from '@/interfaces';

export const ProjectModal: FC<{
  translationTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: IUpsertProjectRequest) => void;
  value?: IProjectDetailResponse;
}> = ({ translationTitle, isOpen, onClose, onSubmit, value }) => {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    resetForm,
  } = useFormik<IUpsertProjectRequest>({
    initialValues: {
      isPublished: false,
      startDate: '',
      endDate: '',
      status: 'initialize',
      languages: [],
      frameworks: [],
      databases: [],
      technologies: [],
      others: [],
    },
    validationSchema: upsertProjectSchema,
    onSubmit: (form, helper) => {
      helper.resetForm();
      onSubmit(form);
      onClose();
    },
  });

  useEffect(() => {
    if (!value) {
      return;
    }

    resetForm({
      values: {
        isPublished: value.isPublished,
        startDate: value.startDate
          ? dayjs(value.startDate).format('YYYY-MM-DD')
          : '',
        endDate: value.endDate ? dayjs(value.endDate).format('YYYY-MM-DD') : '',
        status: value.status,
        languages: [...value.languages],
        frameworks: [...value.frameworks],
        databases: [...value.databases],
        technologies: [...value.technologies],
        others: [...value.others],
      },
    });
  }, [value]);

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
        <Translation keyPrefix="common.labels">
          {(t) => <ModalHeader>{t(translationTitle)}</ModalHeader>}
        </Translation>
        <ModalCloseButton />

        <Box>
          <Divider />
        </Box>

        <ModalBody as={Stack} padding="4" spacing="4">
          <FormControlSwitch
            translation="publish"
            name="isPublished"
            isChecked={values.isPublished}
            error={errors.isPublished}
            touched={touched.isPublished}
            onBlur={handleBlur}
            onChange={handleChange}
          />

          <FormControlInput
            translation="startDate"
            name="startDate"
            type="date"
            value={values.startDate}
            error={errors.startDate}
            touched={touched.startDate}
            onBlur={handleBlur}
            onChange={handleChange}
          />

          <FormControlInput
            translation="endDate"
            name="endDate"
            type="date"
            value={values.endDate}
            error={errors.endDate}
            touched={touched.endDate}
            onBlur={handleBlur}
            onChange={handleChange}
          />

          <FormControlRadioGroup
            translation="status"
            name="status"
            value={values.status}
            error={errors.status}
            touched={touched.startDate}
            onChange={handleChange('status')}
            stack={Wrap}
            translationOptionKeyPrefix="projectStatus"
            options={projectStatus}
          />

          <FormControlTagsGroup
            translation="languages"
            error={errors.languages}
            touched={touched.languages}
            multiple
            value={values.languages}
            onChange={async (value) => {
              await setFieldValue('languages', value);
              setFieldTouched('languages', true);
            }}
            translationOptionKeyPrefix="programingLanguages"
            options={programingLanguages}
          />

          <FormControlTagsGroup
            translation="frameworks"
            error={errors.frameworks}
            touched={touched.frameworks}
            multiple
            value={values.frameworks}
            onChange={async (value) => {
              await setFieldValue('frameworks', value);
              setFieldTouched('frameworks', true);
            }}
            translationOptionKeyPrefix="frameworks"
            options={frameworks}
          />

          <FormControlTagsGroup
            translation="databases"
            error={errors.databases}
            touched={touched.databases}
            multiple
            value={values.databases}
            onChange={async (value) => {
              await setFieldValue('databases', value);
              setFieldTouched('databases', true);
            }}
            translationOptionKeyPrefix="databases"
            options={databases}
          />

          <FormControlTagsGroup
            translation="technologies"
            error={errors.technologies}
            touched={touched.technologies}
            multiple
            value={values.technologies}
            onChange={async (value) => {
              await setFieldValue('technologies', value);
              setFieldTouched('technologies', true);
            }}
            translationOptionKeyPrefix="technologies"
            options={technologies}
          />

          <FormControlInputTagsGroup
            translation="others"
            error={errors.others}
            touched={touched.others}
            value={values.others}
            onChange={async (value) => {
              await setFieldValue('others', value);
              setFieldTouched('others', true);
            }}
          />
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
                {t('save')}
              </Button>
            </ModalFooter>
          )}
        </Translation>
      </ModalContent>
    </Modal>
  );
};
