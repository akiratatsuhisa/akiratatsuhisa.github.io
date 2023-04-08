import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { useAxios } from '@/hooks';
import { services } from '@/services';

export const useDetail = () => {
  const params = useParams();

  const { i18n } = useTranslation();

  const { isLoading, data, error } = useAxios(
    services.projects,
    'searchBySlug',
    {
      unauth: true,
      paramsOrData: [params.slug!, i18n.language],
    },
  );

  return {
    isLoading,
    data,
    error,
  };
};
