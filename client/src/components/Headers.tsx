import {
  Box,
  BoxProps,
  Container,
  Image,
  LayoutProps,
  useColorModeValue,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface IImageHeaderProps {
  containerMaxWidth?: LayoutProps['maxWidth'];
  children?: ReactNode;
  src: string;
  filter?: boolean;
}

export const ImageHeader: FC<IImageHeaderProps & BoxProps> = ({
  containerMaxWidth = 'container.xl',
  filter = true,
  src,
  children,
  ...props
}) => {
  const backgroundColor = useColorModeValue('blackAlpha.500', 'blackAlpha.700');

  return (
    <Container maxWidth={containerMaxWidth}>
      <Box
        position="relative"
        width="full"
        aspectRatio="16 / 9"
        overflow="hidden"
        rounded={{ base: '2xl', md: '3xl' }}
        {...props}
      >
        <Image
          position="absolute"
          inset="0"
          height="full"
          width="full"
          objectPosition="bottom"
          objectFit="cover"
          src={src}
        />

        <Box
          position="absolute"
          inset="0"
          paddingX="6"
          paddingY="3"
          backgroundColor={filter ? backgroundColor : undefined}
        >
          {children}
        </Box>
      </Box>
    </Container>
  );
};
