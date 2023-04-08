import {
  Avatar,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const CardPerson: FC<{ index: number }> = ({ index }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: `pages.resume.sections.testimonial.people.${index}`,
  });

  return (
    <Card rounded="sm" borderLeft="4px solid" borderColor="cyan.500">
      <CardBody paddingX="4" paddingY="3">
        <Flex alignItems="center" flexWrap="nowrap" gap="3" marginBottom="2">
          <Avatar flex="0 0 auto" src={`/images/resume/people/${index}.jpg`} />

          <Heading flex=" 1 1 auto" as="h3" size="md">
            <Text as="span">{t(`name`)}</Text>
            {' | '}
            <Text as="span" color="cyan.500">
              {t(`title`)}
            </Text>
          </Heading>
        </Flex>

        <Text fontSize="lg" fontStyle="italic">
          {t(`comment`)}
        </Text>
      </CardBody>
    </Card>
  );
};

export const Testimonial: FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.resume.sections.testimonial',
  });

  return (
    <Container maxWidth="container.xl" paddingY={{ base: '6', lg: '12' }}>
      <Flex flexDirection={{ base: 'column', md: 'row' }} gap="4">
        <Flex
          flexDirection="column"
          flex="0 0 auto"
          justifyContent="center"
          rowGap={{ base: '3', lg: '6' }}
          width={{ base: 'auto', md: '20rem', lg: '26rem', xl: '32rem' }}
        >
          <Heading as="h2" fontWeight="600">
            {t('title')}
          </Heading>

          <Text fontSize="lg" opacity=".9">
            {t('description')}
          </Text>
        </Flex>

        <Flex flex="1 1 auto" flexDirection="column" gap="4">
          {Array.from({ length: 3 }, (_value, index) => (
            <CardPerson key={index} index={index} />
          ))}
        </Flex>
      </Flex>
    </Container>
  );
};
