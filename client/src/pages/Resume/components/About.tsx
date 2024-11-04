import {
  Box,
  Button,
  CircularProgress,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ElementType, FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MdCake,
  MdCheckCircleOutline,
  MdDownload,
  MdDownloadDone,
  MdLocationCity,
  MdOutlineEmail,
  MdPhoneCallback,
} from 'react-icons/md';

import { useAxios } from '@/hooks';
import { services } from '@/services';

const mainItems: Array<{
  key: string;
  items: Array<{
    translation: string;
    value?: string;
    icon: ElementType;
    link?: string;
  }>;
}> = [
  {
    key: 'key-1',
    items: [
      {
        translation: 'age',
        value: dayjs().diff(dayjs('1998-01-01'), 'year').toString(),
        icon: MdCake,
      },
      {
        translation: 'location',
        icon: MdLocationCity,
        link: 'https://www.google.com/maps/place/G%C3%B2+V%E1%BA%A5p,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh/@10.8297379,106.6440274,13.83z',
      },
    ],
  },
  {
    key: 'key-2',
    items: [
      {
        translation: 'phone',
        icon: MdPhoneCallback,
        link: 'tel:+840798059927',
      },
      {
        translation: 'email',
        value: 'dangminhdat.180898@gmail.com',
        icon: MdOutlineEmail,
        link: 'mailTo:dangminhdat.180898@gmail.com',
      },
    ],
  },
];

const MainContent: FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.resume.sections.about.mainItems',
  });

  return (
    <Grid
      rowGap="2"
      columnGap="4"
      templateColumns={{
        base: 'repeat(1, minmax(0, 1fr))',
        lg: 'repeat(2, minmax(0, 1fr))',
      }}
    >
      {mainItems.map(({ key, items }) => (
        <Flex key={key} flexDirection="column" flexWrap="nowrap" rowGap="2">
          {items.map(({ translation, value, icon, link }) => (
            <Flex key={translation}>
              <Box
                flexBasis="6rem"
                flexShrink="0"
                paddingY="1"
                paddingRight="2"
              >
                <Flex alignItems="center" gap="1">
                  <Icon as={icon} boxSize="20px" />
                  <Text as="h3" fontWeight="500">
                    {t(`${translation}.label`)}
                  </Text>
                </Flex>
              </Box>

              <Box
                borderLeft="solid 1px"
                borderColor="gray.200"
                flex="1 1 auto"
                paddingLeft="2"
                paddingY="1"
                wordBreak="break-word"
              >
                {!link ? (
                  <Text>{t(`${translation}.content`, { value })}</Text>
                ) : (
                  <Text
                    as="a"
                    href={link}
                    target="_blank"
                    _hover={{
                      textColor: 'brand.500',
                      textDecoration: 'underline',
                    }}
                  >
                    {t(`${translation}.content`, { value })}
                  </Text>
                )}
              </Box>
            </Flex>
          ))}
        </Flex>
      ))}
    </Grid>
  );
};

const subItems: Array<{
  translation: string;
  color: string;
}> = [
  {
    translation: 'line1',
    color: 'red.400',
  },
  {
    translation: 'line2',
    color: 'yellow.400',
  },
  {
    translation: 'line3',
    color: 'green.400',
  },
];

const SubContent: FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.resume.sections.about.subItems',
  });

  return (
    <Flex flexDirection="column" fontSize="lg" gap="3">
      {subItems.map(({ translation, color }) => (
        <Text key={translation}>
          <Icon
            as={MdCheckCircleOutline}
            display="inline-block"
            verticalAlign="text-bottom"
            boxSize="6"
            color={color}
            marginRight="2"
          />
          {t(`${translation}.content`)}
        </Text>
      ))}
    </Flex>
  );
};

export const About: FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.resume.sections.about',
  });

  const {
    isLoading,
    request: requestDownload,
    percent,
  } = useAxios(services.resume, 'downloadCV', {
    unauth: true,
    delayPercentFinished: 1000,
  });

  const onDownload = async () => {
    if (isLoading || percent === 100) {
      return;
    }

    const data = await requestDownload();

    const objectURL = window.URL.createObjectURL(data);

    const link = document.createElement('a');
    document.body.appendChild(link);

    link.href = objectURL;
    link.download = 'cv.pdf';

    link.click();

    window.URL.revokeObjectURL(objectURL);
    document.body.removeChild(link);
  };

  return (
    <Container maxWidth="container.xl" paddingBottom="4">
      <Flex
        columnGap={{ base: '0', sm: '4', md: '6', lg: '8' }}
        flexDirection={{ base: 'column', sm: 'row' }}
        rowGap={{ base: '4', sm: '0' }}
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
              sm: '16rem',
              md: '20rem',
              lg: '24rem',
              xl: '32rem',
            }}
          >
            <Image
              height="full"
              objectFit="cover"
              objectPosition="bottom"
              position="absolute"
              src="/images/resume/about-me-1.jpg"
              width="full"
            />
            <Image
              _hover={{ opacity: '1' }}
              height="full"
              objectFit="cover"
              objectPosition="bottom"
              opacity="0"
              position="absolute"
              src="/images/resume/about-me-2.jpg"
              transition="all 0.25s ease-in-out"
              width="full"
            />
          </Box>
        </Box>

        <Flex
          flexDirection="column"
          flex="1 1 auto"
          justifyContent="center"
          rowGap={{ base: '3', lg: '6' }}
        >
          <Heading as="h2" fontWeight="500">
            {t('title')}
          </Heading>

          <Text fontSize="lg">{t('description')}</Text>

          <MainContent />

          <SubContent />

          <Box textAlign="right">
            <Button
              colorScheme="blue"
              rightIcon={
                percent === undefined ? (
                  <MdDownload />
                ) : percent === 100 ? (
                  <MdDownloadDone />
                ) : (
                  <CircularProgress
                    size="16px"
                    value={percent}
                    color="gray.400"
                  />
                )
              }
              variant="solid"
              width={{ base: 'full', sm: 'auto' }}
              onClick={onDownload}
            >
              {t('action')}
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
};
