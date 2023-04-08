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
import _ from 'lodash';
import { FC, useEffect } from 'react';
import { Translation } from 'react-i18next';
import * as Yup from 'yup';

import {
  FormControlInput,
  FormControlRadioGroup,
  FormControlSwitch,
  FormControlTagGroup,
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
      status: 'INITIALIZE',
      languages: [],
      frameworks: [],
      databases: [],
      technologies: [],
      others: [],
    },
    validationSchema: Yup.object({
      isPublished: Yup.boolean().required(),
      startDate: Yup.date().nullable().optional(),
      endDate: Yup.date().nullable().optional(),
      status: Yup.string().required().oneOf(_.map(projectStatus, 'value')),
      languages: Yup.array(
        Yup.string().required().oneOf(_.map(programingLanguages, 'value')),
      )
        .required()
        .unique(),
      frameworks: Yup.array(
        Yup.string().required().oneOf(_.map(frameworks, 'value')),
      )
        .required()
        .unique(),
      databases: Yup.array(
        Yup.string().required().oneOf(_.map(databases, 'value')),
      )
        .required()
        .unique(),
      technologies: Yup.array(
        Yup.string().required().oneOf(_.map(technologies, 'value')),
      )
        .required()
        .unique(),
      others: Yup.array(Yup.string().required()).required().unique(),
    }),
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

          <FormControlTagGroup
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

          <FormControlTagGroup
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

          <FormControlTagGroup
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

          <FormControlTagGroup
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
