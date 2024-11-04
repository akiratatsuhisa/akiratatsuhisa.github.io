import { useAuth0 } from '@auth0/auth0-react';
import { EditIcon } from '@chakra-ui/icons';
import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { FC } from 'react';
import { To } from 'react-router-dom';

import { useBackgroundNavigate } from '@/hooks';

interface IProps extends IconButtonProps {
  to: To;
}

export const FabPostButton: FC<IProps> = ({
  to,
  position = 'fixed',
  right = '6',
  bottom = '6',
  size = 'lg',
  rounded = 'xl',
  icon = <EditIcon />,
  ...props
}) => {
  const { isAuthenticated } = useAuth0();
  const { navigateModal } = useBackgroundNavigate();

  if (!isAuthenticated) {
    return <></>;
  }

  return (
    <IconButton
      position={position}
      right={right}
      bottom={bottom}
      size={size}
      rounded={rounded}
      icon={icon}
      {...props}
      onClick={() => navigateModal(to)}
    />
  );
};
