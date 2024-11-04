import { BackgroundProps, Box, Flex } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';
import { useOutlet } from 'react-router-dom';

export interface ILayoutProps {
  header?: ReactElement;
  footer?: ReactElement;
  backgroundColor?: BackgroundProps['backgroundColor'];
}

export const Layout: FC<ILayoutProps> = ({
  header,
  footer,
  backgroundColor,
}) => {
  const outlet = useOutlet();

  return (
    <Flex
      flexDirection="column"
      minHeight="100dvh"
      backgroundColor={backgroundColor}
    >
      {header}

      <Box flex="1 1 0">{outlet}</Box>

      {footer}
    </Flex>
  );
};
