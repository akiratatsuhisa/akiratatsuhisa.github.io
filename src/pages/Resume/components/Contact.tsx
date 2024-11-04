import {
  Box,
  Button,
  Center,
  CircularProgress,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { Translation, useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { useAxios } from '@/hooks';
import { services } from '@/services';

const RequiredMark = () => (
  <Text as="span" color="red.500">
    *
  </Text>
);

const ContactForm: FC = () => {
  const [formState, setFormState] = useState<
    'initial' | 'loading' | 'completed'
  >('initial');

  const { t: tFields } = useTranslation('translation', {
    keyPrefix: 'common.fields',
  });
  const { t: tValidations } = useTranslation('translation', {
    keyPrefix: 'common.validations',
  });

  const inputBgColor = useColorModeValue('white', 'gray.600');

  const { request: requestSendContact } = useAxios(
    services.resume,
    'sendContact',
    {
      unauth: true,
    },
  );

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required().max(255),
      email: Yup.string().required().max(255).email('email'),
      phone: Yup.string()
        .required()
        .matches(/^\+?\d{1,20}$/, 'phone'),
      message: Yup.string().required().max(1024),
    }),
    onSubmit: async (values) => {
      setFormState('loading');
      try {
        await requestSendContact(values);

        setFormState('completed');
      } catch (error) {
        setFormState('initial');
      }
    },
  });

  const onSendMore = () => {
    resetForm({ values: { ...values, message: '' } });
    setFormState('initial');
  };

  switch (formState) {
    case 'initial':
      return (
        <Flex
          as="form"
          onSubmit={(event) => handleSubmit(event as never)}
          flexDirection="column"
          gap="4"
        >
          <FormControl isInvalid={!!errors.name && touched.name}>
            <FormLabel htmlFor="name">
              {tFields('name')}
              <RequiredMark />
            </FormLabel>
            <Input
              backgroundColor={inputBgColor}
              id="name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <FormErrorMessage>
              {tValidations(errors.name!, { field: tFields('name'), max: 255 })}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email && touched.email}>
            <FormLabel htmlFor="email">
              {tFields('emailAdress')}
              <RequiredMark />
            </FormLabel>
            <Input
              backgroundColor={inputBgColor}
              id="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <FormErrorMessage>
              {tValidations(errors.email!, {
                field: tFields('emailAdress'),
                max: 255,
              })}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.phone && touched.phone}>
            <FormLabel htmlFor="phone">
              {tFields('phoneNumber')}
              <RequiredMark />
            </FormLabel>
            <Input
              backgroundColor={inputBgColor}
              id="phone"
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
            />
            <FormErrorMessage>
              {tValidations(errors.phone!, {
                field: tFields('phoneNumber'),
              })}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.message && touched.message}>
            <FormLabel htmlFor="message">
              {tFields('message')}
              <RequiredMark />
            </FormLabel>
            <Textarea
              backgroundColor={inputBgColor}
              id="message"
              name="message"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
            />
            <FormErrorMessage>
              {tValidations(errors.message!, {
                field: tFields('message'),
                max: 1024,
              })}
            </FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="green" marginTop="4">
            <Translation keyPrefix="pages.resume.sections.contact">
              {(t) => <>{t('action')}</>}
            </Translation>
          </Button>
        </Flex>
      );
    case 'loading':
      return (
        <Center flexGrow="1">
          <CircularProgress isIndeterminate color="brand.500" />
        </Center>
      );
    case 'completed':
      return (
        <Translation keyPrefix="pages.resume.sections.contact">
          {(t) => (
            <Button colorScheme="purple" onClick={onSendMore}>
              {t('sendMore')}
            </Button>
          )}
        </Translation>
      );
  }
};

export const Contact: FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.resume.sections.contact',
  });

  return (
    <Container maxWidth="container.xl" paddingY={{ base: '4', lg: '8' }}>
      <Flex
        columnGap={{ base: '0', md: '4', lg: '12', xl: '16' }}
        flexDirection={{ base: 'column-reverse', md: 'row' }}
        rowGap={{ base: '6', md: '0' }}
      >
        <Box flexShrink="0">
          <Box
            aspectRatio="4 / 5"
            overflow="hidden"
            position="relative"
            rounded="2xl"
            shadow="sm"
            width={{
              base: 'auto',
              md: '16rem',
              lg: '28rem',
              xl: '36rem',
            }}
          >
            <Image
              height="full"
              objectFit="cover"
              objectPosition="bottom"
              position="absolute"
              src="/images/resume/contact.jpg"
              width="full"
            />
          </Box>
        </Box>

        <Flex flexDirection="column" flex="1 1 auto" gap="4">
          <Heading as="h2">{t('title')}</Heading>

          <Text fontSize="lg">{t('description')}</Text>

          <ContactForm />
        </Flex>
      </Flex>
    </Container>
  );
};
