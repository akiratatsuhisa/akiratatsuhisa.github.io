import {
  BackgroundProps,
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Divider,
  Flex,
  Heading,
  Icon,
  LayoutProps,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { ElementType, FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MdArrowOutward,
  MdHome,
  MdLocationCity,
  MdMenuBook,
  MdSchool,
  MdToday,
} from 'react-icons/md';

import { ITimelineItem, Timeline } from '@/components/Timeline';

const items: Array<{
  isLeft?: boolean;
  icon: ElementType;
}> = [
  {
    icon: MdSchool,
  },
  {
    isLeft: true,
    icon: MdHome,
  },
  {
    icon: MdMenuBook,
  },
  {
    isLeft: true,
    icon: MdLocationCity,
  },
  {
    icon: MdArrowOutward,
  },
  {
    isLeft: true,
    icon: MdToday,
  },
];

const TimelineDivider: FC<{
  width?: LayoutProps['width'];
  height?: LayoutProps['height'];
  responsiveBreakpoint?: Partial<Record<string, boolean>>;
}> = ({ width = '2rem', height = '1rem', responsiveBreakpoint }) => {
  const isMobileScreen = useBreakpointValue(
    responsiveBreakpoint ?? { base: true, md: false },
  );

  return (
    <Flex>
      {!isMobileScreen && <Box flex="1 0" />}

      <Flex
        flexDirection="column"
        alignItems="center"
        width={width}
        position="relative"
      >
        <Box
          flex="1 0 auto"
          width="2px"
          height={height}
          backgroundColor="gray.300"
        />
      </Flex>
      <Box flex="1 0" />
    </Flex>
  );
};

const TimelineCard: FC<{
  sectionName: string;
  index: number;
  backgroundColor: BackgroundProps['backgroundColor'];
}> = ({ sectionName, index, backgroundColor }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: `pages.resume.sections.experience.timeline.${sectionName}.${index}`,
  });

  return (
    <Card backgroundColor={backgroundColor}>
      <CardHeader paddingY="3">{t('period')}</CardHeader>

      <Box>
        <Divider />
      </Box>

      <CardBody paddingY="3">
        <Heading as="h3" size="sm" marginBottom="2">
          {t('title')}
        </Heading>

        <Text>{t('description')}</Text>
      </CardBody>
    </Card>
  );
};

const sectionAItems = items.slice(0, 3);

const SectionA: FC = () => {
  const backgroundColor = useColorModeValue('white', 'gray.800');

  const items: Array<ITimelineItem> = sectionAItems.map(
    ({ isLeft, icon }, index) => ({
      isLeft,
      thumb: <Icon as={icon} />,
      content: (
        <TimelineCard
          sectionName="a"
          index={index}
          backgroundColor={backgroundColor}
        />
      ),
    }),
  );

  return (
    <>
      <Timeline items={items} />

      <TimelineDivider />
    </>
  );
};

const sectionBItems = items.slice(3, 6);

const SectionB: FC = () => {
  const backgroundColor = useColorModeValue('gray.50', 'gray.700');

  const items: Array<ITimelineItem> = sectionBItems.map(
    ({ isLeft, icon }, index) => ({
      isLeft,
      thumb: <Icon as={icon} />,
      content: (
        <TimelineCard
          sectionName="b"
          index={index}
          backgroundColor={backgroundColor}
        />
      ),
    }),
  );

  return (
    <>
      <TimelineDivider />

      <Timeline items={items} />
    </>
  );
};

export const Experience: FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.resume.sections.experience',
  });

  const grayBgColor = useColorModeValue('gray.50', 'gray.700');

  return (
    <>
      <Box backgroundColor={grayBgColor}>
        <Container maxWidth="container.xl" paddingTop={{ base: '4', lg: '8' }}>
          <Box textAlign="center">
            <Heading as="h2" fontWeight="600" marginBottom="4">
              {t('title')}
            </Heading>
          </Box>

          <SectionA />
        </Container>
      </Box>

      <Box>
        <Container
          maxWidth="container.xl"
          paddingBottom={{ base: '6', lg: '12' }}
        >
          <SectionB />
        </Container>
      </Box>
    </>
  );
};
