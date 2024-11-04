import { FC } from 'react';

import { ImageHeader } from '@/components/Headers';
import { PageLoading } from '@/components/Loading';
import { useDetail } from '@/pages/User/useDetail';

export const Page: FC = () => {
  const { isLoading, data, error } = useDetail();

  if (isLoading) {
    return <PageLoading />;
  }

  if (error || !data) {
    return <div>Error...</div>;
  }

  return (
    <>
      <ImageHeader src="/images/nature-3.jpg" />
    </>
  );
};
