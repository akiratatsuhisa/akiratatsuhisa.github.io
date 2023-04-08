import 'react-mobile-cropper/dist/style.css';
import './CropperImageModal.css';

import {
  Box,
  Button,
  Center,
  CircularProgress,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';
import { Translation } from 'react-i18next';
import { Cropper, CropperRef } from 'react-mobile-cropper';

export interface ICropperImageModalProps {
  image?: Blob;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (blob: Blob) => void;
}

export const CropperImageModal: FC<ICropperImageModalProps> = ({
  image,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [src, setSrc] = useState<string>();

  const cropperRef = useRef<CropperRef | null>(null);

  useEffect(() => {
    if (!image) {
      return;
    }

    const url = URL.createObjectURL(image);
    setSrc(url);
  }, [image]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (isLoading || !cropperRef.current) {
        return;
      }

      const blob = await new Promise<Blob>(
        (resolve) =>
          cropperRef.current
            ?.getCanvas()
            ?.toBlob((blob) => resolve(blob!), 'image.png') ?? image,
      );

      onSubmit?.(blob);
      onClose?.();
    } finally {
      setIsLoading(false);
    }
  };

  if (!image || !src) {
    return (
      <Modal size="full" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Translation keyPrefix="common.labels">
            {(t) => <ModalHeader>{t('loading')}</ModalHeader>}
          </Translation>
          <ModalCloseButton />

          <ModalBody padding="0">
            <Center height="calc(100dvh - 3.875rem)">
              <CircularProgress isIndeterminate color="brand.500" />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <Translation keyPrefix="common.labels">
          {(t) => <ModalHeader>{t('edit')}</ModalHeader>}
        </Translation>
        <ModalCloseButton />

        <Box height="calc(100dvh - 7.875rem)">
          <Cropper
            ref={cropperRef}
            src={src}
            className={'cropper'}
            stencilProps={{
              aspectRatio: 16 / 9,
            }}
          />
        </Box>

        <Translation keyPrefix="common.labels">
          {(t) => (
            <ModalFooter padding="3" gap="3">
              <Button
                isLoading={isLoading}
                colorScheme="gray"
                onClick={onClose}
              >
                {t('cancel')}
              </Button>

              <Button
                isLoading={isLoading}
                colorScheme="green"
                onClick={handleSubmit}
              >
                {t('save')}
              </Button>
            </ModalFooter>
          )}
        </Translation>
      </ModalContent>
    </Modal>
  );
};
