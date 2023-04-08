import { Center, Container, Heading } from '@chakra-ui/react';
import { FC } from 'react';

import { ImageHeader } from '@/components/Headers';
// import { useBackgroundNavigate } from '@/hooks';

export const Page: FC = () => {
  // const { navigateModal } = useBackgroundNavigate();

  return (
    <>
      <ImageHeader src="/images/nature-1.jpg">
        <Center
          flexDirection="column"
          width="full"
          height="full"
          color="white"
          textAlign="center"
        >
          <Heading as="h1" fontWeight="medium" size="3xl" marginBottom="3">
            Welcome
          </Heading>

          <Heading as="h2" fontWeight="light" size="lg" opacity="0.8">
            Note
          </Heading>
        </Center>
      </ImageHeader>

      <Container maxWidth="container.xl" paddingY="4">
        {/* <Button onClick={() => navigateModal('/users/akiratatsuhisa')}>
          Open Modal
        </Button> */}
      </Container>
    </>
  );
};
