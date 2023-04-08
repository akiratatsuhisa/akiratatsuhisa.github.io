import { CloseIcon } from '@chakra-ui/icons';
import {
  Button,
  IconButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import { FC } from 'react';

import { useBackgroundNavigate } from '@/hooks';

export const Modal: FC = () => {
  const { onCloseModal } = useBackgroundNavigate();

  return (
    <>
      <ModalContent>
        <ModalHeader>Create a Post</ModalHeader>
        <IconButton
          aria-label={''}
          icon={<CloseIcon />}
          onClick={() => onCloseModal()}
          position="absolute"
          right="3.5"
          size="sm"
          top="2"
          variant="unstyled"
        />

        <ModalBody></ModalBody>

        <ModalFooter>
          <Button>Post</Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};
