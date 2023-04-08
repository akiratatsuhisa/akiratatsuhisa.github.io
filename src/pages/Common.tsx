import { Container, Heading } from '@chakra-ui/react';
import { FC } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

export const NotFound: FC = () => {
  return (
    <Container paddingY="3" maxW="container.xl">
      <Heading as="h1" size="md" fontWeight="medium">
        Not Found
      </Heading>
    </Container>
  );
};

export const AccessDenied: FC = () => {
  return (
    <Container paddingY="3" maxW="container.xl">
      <Heading as="h1" size="md" fontWeight="medium">
        Access Denied
      </Heading>
    </Container>
  );
};

export const InternalServerError: FC = () => {
  return (
    <Container paddingY="3" maxW="container.xl">
      <Heading as="h1" size="md" fontWeight="medium">
        Internal Server Error
      </Heading>
    </Container>
  );
};

export const Callback: FC = () => {
  return <></>;
};

export const Logout: FC = () => {
  const [searchParams] = useSearchParams();

  return <Navigate to={searchParams.get('redirectTo') ?? '/'} />;
};
