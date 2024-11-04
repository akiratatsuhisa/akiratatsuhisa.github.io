import { ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Center,
  CircularProgress,
  IconButton,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Translation } from 'react-i18next';

import { useBackgroundNavigate } from '@/hooks';

export const PageLoading: FC = () => {
  return (
    <Center height="full">
      <CircularProgress isIndeterminate size="6rem" color="brand.500" />
    </Center>
  );
};

export const ModalCloseIcon: FC = () => {
  const { isFullSizeModal, onCloseModal } = useBackgroundNavigate();

  return (
    <IconButton
      icon={isFullSizeModal ? <ArrowForwardIcon /> : <CloseIcon />}
      variant="unstyled"
      aria-label={''}
      position="absolute"
      size="sm"
      top="2"
      right="3.5"
      onClick={() => onCloseModal()}
    />
  );
};

export const ModalLoading: FC = () => {
  const { isFullSizeModal } = useBackgroundNavigate();

  return (
    <ModalContent>
      <Translation keyPrefix="common.labels">
        {(t) => <ModalHeader>{t('loading')}</ModalHeader>}
      </Translation>
      <ModalCloseIcon />

      <ModalBody padding="0">
        <Center height={isFullSizeModal ? 'calc(100dvh - 3.875rem)' : '40'}>
          <CircularProgress isIndeterminate color="brand.500" />
        </Center>
      </ModalBody>
    </ModalContent>
  );
};
