import { Tag, TagProps } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { mapProjectStatus } from '@/enums';

export const ProjectStatus: FC<{ value: string } & TagProps> = ({
  value,
  ...props
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common.projectStatus',
  });

  const projectStatus = useMemo(() => mapProjectStatus[value], [value]);

  return (
    <Tag colorScheme={projectStatus.colorSchema} {...props}>
      {t(projectStatus.translation)}
    </Tag>
  );
};
