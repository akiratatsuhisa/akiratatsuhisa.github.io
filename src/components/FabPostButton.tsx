import { useAuth0 } from '@auth0/auth0-react';
import { AddIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';
import { To } from 'react-router-dom';

import { useBackgroundNavigate } from '@/hooks';

interface IProps {
  icon?: ReactElement;
  to: To;
}

export const FabPostButton: FC<IProps> = ({ icon = <AddIcon />, to }) => {
  const { isAuthenticated } = useAuth0();
  const { navigateModal } = useBackgroundNavigate();

  if (!isAuthenticated) {
    return <></>;
  }

  return (
    <IconButton
      icon={icon}
      position="fixed"
      size="lg"
      bottom="6"
      right="6"
      rounded="xl"
      aria-label="fab"
      onClick={() => navigateModal(to)}
    />
  );
};
