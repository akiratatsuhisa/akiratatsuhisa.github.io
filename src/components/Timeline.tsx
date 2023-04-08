import {
  BackgroundProps,
  Box,
  ColorProps,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

export interface ITimelineItem {
  isLeft?: boolean;
  size?: string;
  thumb?: ReactNode;
  thumbColor?: ColorProps['color'];
  thumbBackgroundColor?: BackgroundProps['backgroundColor'];
  content: ReactNode;
}

interface IProps {
  dividerColor?: string;
  responsiveBreakpoint?: Partial<Record<string, boolean>>;
  items: Array<ITimelineItem>;
}

const TimelineDivider: FC<
  {
    dividerColor?: BackgroundProps['backgroundColor'];
  } & Omit<ITimelineItem, 'content'>
> = ({
  dividerColor = 'gray.300',
  size = '2rem',
  thumb,
  thumbColor = 'gray.500',
  thumbBackgroundColor = 'white',
}) => {
  return (
    <Flex position="relative" flexDirection="column" alignItems="center">
      <Box
        flex="0 0 auto"
        width="2px"
        height="5"
        backgroundColor={dividerColor}
      />

      <Flex
        flex="0 0 auto"
        rounded="full"
        padding="2"
        width={size}
        height={size}
        color={thumbColor}
        backgroundColor={thumbBackgroundColor}
        shadow="md"
      >
        {thumb}
      </Flex>

      <Box flex="1 0 auto" width="2px" backgroundColor={dividerColor} />
    </Flex>
  );
};

export const Timeline: FC<IProps> = ({
  dividerColor,
  responsiveBreakpoint,
  items,
}) => {
  const isMobileScreen = useBreakpointValue(
    responsiveBreakpoint ?? { base: true, md: false },
  );

  return (
    <>
      {items.map(
        (
          { isLeft, content, size, thumb, thumbColor, thumbBackgroundColor },
          index,
        ) => (
          <Flex
            key={index}
            flexDirection={!isMobileScreen && isLeft ? 'row-reverse' : 'row'}
          >
            {!isMobileScreen && (
              <Box padding="3" flex="1 0" minHeight="4.5rem" />
            )}

            <TimelineDivider
              dividerColor={dividerColor}
              size={size}
              thumb={thumb}
              thumbColor={thumbColor}
              thumbBackgroundColor={thumbBackgroundColor}
            />

            <Box padding="3" flex="1 0">
              {content}
            </Box>
          </Flex>
        ),
      )}
    </>
  );
};
