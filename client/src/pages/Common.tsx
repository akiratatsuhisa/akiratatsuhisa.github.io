import { useAuth0 } from '@auth0/auth0-react';
import {
  Center,
  ColorProps,
  Container,
  Heading,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ElementType, FC, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MdDoNotDisturbOn, MdError, MdHelp } from 'react-icons/md';
import { Navigate, useSearchParams } from 'react-router-dom';

import { PageLoading } from '@/components/Loading';

export const NotLogged: FC = () => {
  const { i18n } = useTranslation();
  const { loginWithRedirect } = useAuth0();

  const [searchParams] = useSearchParams();

  useLayoutEffect(() => {
    loginWithRedirect({
      authorizationParams: {
        ui_locales: i18n.language,
        audience: import.meta.env.VITE_APP_AUTH0_AUDIENCE,
        redirect_uri: window.location.origin + '/callback',
        scope: 'profile email',
      },
      appState: { returnTo: searchParams.get('returnTo') ?? '/' },
    });
  }, []);

  return <PageLoading />;
};

export const Callback: FC = () => {
  return <PageLoading />;
};

export const Logout: FC = () => {
  const [searchParams] = useSearchParams();

  return <Navigate to={searchParams.get('returnTo') ?? '/'} />;
};

const CommonContent: FC<{
  translation: string;
  status: { icon: ElementType; code: number; color: ColorProps['color'] };
}> = ({ translation, status }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: `pages.common.${translation}`,
  });

  return (
    <Container as={Center} maxW="container.xl" padding="4" height="full">
      <Stack spacing="4" alignItems="center" textAlign="center">
        <Icon as={status.icon} color={status.color} boxSize="40" />

        <Heading as="h1" size="2xl">
          <Text as="span" color={status.color}>
            {status.code}
          </Text>{' '}
          {t('title')}
        </Heading>

        <Text fontSize="xl">{t('description')}</Text>
      </Stack>
    </Container>
  );
};

export const NotFound: FC = () => (
  <CommonContent
    translation="notFound"
    status={{ code: 404, color: 'blue.500', icon: MdHelp }}
  />
);

export const AccessDenied: FC = () => (
  <CommonContent
    translation="accessDenied"
    status={{ code: 403, color: 'yellow.500', icon: MdDoNotDisturbOn }}
  />
);

export const InternalServerError: FC = () => (
  <CommonContent
    translation="internalServerError"
    status={{ code: 500, color: 'red.500', icon: MdError }}
  />
);
