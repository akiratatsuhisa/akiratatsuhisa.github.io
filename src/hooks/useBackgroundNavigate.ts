import { useBreakpointValue } from '@chakra-ui/react';
import { useMemo } from 'react';
import {
  NavigateOptions,
  To,
  useLocation,
  useNavigate,
} from 'react-router-dom';

export const useBackgroundNavigate = () => {
  const modalSize = useBreakpointValue({ base: 'full', md: 'md' });
  const isFullSizeModal = useMemo(() => modalSize === 'full', [modalSize]);

  const navigate = useNavigate();
  const location = useLocation();

  const navigateModal = (to: To, options?: NavigateOptions) => {
    return navigate(to, {
      ...(options ?? {}),
      state: {
        ...(options?.state ?? {}),
        background: location.state?.background ?? location,
        backgroundTimes: Number(location.state?.backgroundTimes ?? '') + 1,
      },
    });
  };

  const onBackModal = () => {
    return navigate(-1);
  };

  const onCloseModal = (force: boolean = false) => {
    return modalSize === 'full' && !force
      ? navigate(-1)
      : navigate(-location.state.backgroundTimes);
  };

  return {
    modalSize,
    isFullSizeModal,
    navigateModal,
    onCloseModal,
    onBackModal,
  };
};
