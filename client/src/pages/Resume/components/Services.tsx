import {
  Box,
  ColorProps,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react';
import { ElementType, FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MdOutlineCode,
  MdOutlineDomain,
  MdOutlineGroup,
  MdOutlinePalette,
} from 'react-icons/md';

interface IServiceProps {
  translation: string;
  icon: ElementType;
  fill: ColorProps['fill'];
}

const services: Array<IServiceProps> = [
  {
    translation: 'websiteDesign',
    icon: MdOutlinePalette,
    fill: 'purple.500',
  },
  {
    translation: 'webDevelopment',
    icon: MdOutlineCode,
    fill: 'orange.500',
  },
  {
    translation: 'management',
    icon: MdOutlineGroup,
    fill: 'blue.500',
  },
  {
    translation: 'devOps',
    icon: MdOutlineDomain,
    fill: 'green.500',
  },
];

const Service: FC<IServiceProps> = ({ translation, icon, fill }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.resume.sections.services.items',
  });

  return (
    <Flex flexDirection="column" gap="4" padding="4">
      <Box>
        <Icon as={icon} boxSize="20" fill={fill} justifySelf="center" />
      </Box>

      <Heading as="h3" fontSize="xl" fontWeight="500">
        {t(`${translation}.title`)}
      </Heading>

      <Text opacity="0.85">{t(`${translation}.description`)}</Text>
    </Flex>
  );
};

export const Services: FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.resume.sections.services',
  });

  return (
    <Container maxWidth="container.xl" paddingY={{ base: '4', lg: '8' }}>
      <Box textAlign="center">
        <Heading as="h2" fontWeight="600" marginBottom="4">
          {t('title')}
        </Heading>

        <Text fontSize="lg" opacity=".9" marginBottom="6">
          {t('description')}
        </Text>
      </Box>

      <Grid
        gap={{ base: '3', sm: '4', lg: '6' }}
        templateColumns={{
          base: 'repeat(1, minmax(0, 1fr))',
          sm: 'repeat(2, minmax(0, 1fr))',
          lg: 'repeat(4, minmax(0, 1fr))',
        }}
        textAlign="center"
      >
        {services.map((service) => (
          <Service key={service.translation} {...service} />
        ))}
      </Grid>
    </Container>
  );
};
