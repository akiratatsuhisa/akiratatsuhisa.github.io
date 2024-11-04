import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ThemeTypings,
  useDisclosure,
  UseDisclosureProps,
} from '@chakra-ui/react';
import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export interface ICommonAlertDialogProps
  extends Omit<UseDisclosureProps, 'onOpen'> {
  translationTitle?: string;
  translationMessage?: string;
  translationNo?: string;
  translationYes?: string;
  colorScheme?: ThemeTypings['colorSchemes'];
  onSubmit: () => void;
}

export const CommonAlertDialog: FC<ICommonAlertDialogProps> = ({
  translationTitle = 'common.titles.alertCommon',
  translationMessage = 'common.messages.alertCommon',
  translationNo = 'common.labels.no',
  translationYes = 'common.labels.ok',
  colorScheme,
  onSubmit,
  ...props
}) => {
  const { isOpen, onClose } = useDisclosure(props);

  const { t } = useTranslation();

  const cancelRef = useRef<HTMLButtonElement | null>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontWeight="bold">
            {t(translationTitle)}
          </AlertDialogHeader>

          <AlertDialogBody>{t(translationMessage)}</AlertDialogBody>

          <AlertDialogFooter padding="3" gap="3">
            <Button colorScheme="gray" ref={cancelRef} onClick={onClose}>
              {t(translationNo)}
            </Button>

            <Button
              colorScheme={colorScheme}
              onClick={() => {
                onClose();
                onSubmit();
              }}
            >
              {t(translationYes)}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
