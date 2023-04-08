import { ICommonAlertDialogProps } from '@/components/AlertDialog';

export const NO_IMAGE_SRC = '/images/no-image.jpg';

export const commonAlertProps: Record<
  'delete' | 'cancellation',
  Required<
    Pick<
      ICommonAlertDialogProps,
      | 'translationTitle'
      | 'translationMessage'
      | 'translationNo'
      | 'translationYes'
      | 'colorScheme'
    >
  >
> = {
  delete: {
    translationTitle: 'common.titles.alertDelete',
    translationMessage: 'common.messages.alertDelete',
    translationNo: 'common.labels.cancel',
    translationYes: 'common.labels.delete',
    colorScheme: 'red',
  },
  cancellation: {
    translationTitle: 'common.titles.alertCancellation',
    translationMessage: 'common.messages.alertCancellation',
    translationNo: 'common.labels.no',
    translationYes: 'common.labels.yes',
    colorScheme: 'red',
  },
};

export interface ILevel {
  translation: string;
  value: number;
  color: string;
}

export const levels: Array<ILevel> = [
  {
    translation: 'beginner',
    value: 1,
    color: 'cyan.300',
  },
  {
    translation: 'average',
    value: 2,
    color: 'teal.300',
  },
  {
    translation: 'skilled',
    value: 3,
    color: 'yellow.300',
  },
  {
    translation: 'specialist',
    value: 4,
    color: 'orange.300',
  },
  {
    translation: 'expert',
    value: 5,
    color: 'red.300',
  },
];
