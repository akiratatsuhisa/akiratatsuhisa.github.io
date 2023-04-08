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
          icon={<CloseIcon />}
          variant="unstyled"
          aria-label={''}
          position="absolute"
          size="sm"
          top="2"
          right="3.5"
          onClick={() => onCloseModal()}
        />

        <ModalBody></ModalBody>

        <ModalFooter>
          <Button>Post</Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
};
