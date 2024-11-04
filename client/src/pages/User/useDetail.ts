import { useParams } from 'react-router-dom';

import { useAxios } from '@/hooks';
import { services } from '@/services';

export const useDetail = () => {
  const params = useParams();

  const { isLoading, data, error } = useAxios(services.users, 'getByNickname', {
    unauth: true,
    paramsOrData: [params.nickname as string],
  });

  return {
    isLoading,
    data,
    error,
  };
};
