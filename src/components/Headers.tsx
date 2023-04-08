import { Box, Container, Image, useColorMode } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

interface IImageHeaderProps {
  children?: ReactElement;
  src: string;
  minHeight?: string;
  filter?: boolean;
}

export const ImageHeader: FC<IImageHeaderProps> = ({
  children,
  src,
  filter = true,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Container maxWidth="container.xl">
      <Box
        position="relative"
        width="full"
        aspectRatio="16 / 9"
        overflow="hidden"
        rounded="3xl"
      >
        <Image
          width="full"
          height="full"
          objectFit="cover"
          objectPosition="bottom"
          src={src}
        />

        <Box
          position="absolute"
          inset="0"
          backgroundColor={
            filter
              ? colorMode === 'light'
                ? 'blackAlpha.500'
                : 'blackAlpha.700'
              : undefined
          }
          paddingX="6"
          paddingY="3"
        >
          {children}
        </Box>
      </Box>
    </Container>
  );
};
