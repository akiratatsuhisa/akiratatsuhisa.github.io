import { Button, Container, Flex, Heading } from '@chakra-ui/react';
import { FC } from 'react';

import { ImageHeader } from '@/components/Headers';
import { useBackgroundNavigate } from '@/hooks';

export const Page: FC = () => {
  const { navigateModal } = useBackgroundNavigate();

  return (
    <>
      <ImageHeader src="/images/nature-1.jpg">
        <Flex
          width="full"
          height="full"
          justifyContent="center"
          alignItems="center"
          direction="column"
          textColor="white"
        >
          <Heading as="h1" size="3xl" fontWeight="medium" marginBottom="3">
            Welcome
          </Heading>

          <Heading as="h2" size="lg" fontWeight="light" opacity="0.8">
            text
          </Heading>
        </Flex>
      </ImageHeader>

      <Container paddingY="4" maxWidth="container.xl">
        <Button onClick={() => navigateModal('/users/akiratatsuhisa')}>
          Open Modal
        </Button>
      </Container>
    </>
  );
};
