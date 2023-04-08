import dayjs from 'dayjs';
import _ from 'lodash';

type localesType = undefined | string | string[];

type dateTimeDataType = undefined | null | string | Date | dayjs.Dayjs;

type dateTimeStyle = undefined | 'full' | 'long' | 'medium' | 'short';

export const formatDateTime = (
  data: dateTimeDataType,
  options?: {
    locales?: localesType;
    dateStyle?: dateTimeStyle;
    timeStyle?: dateTimeStyle;
    timeZone?: string;
  },
): string => {
  const { locales, dateStyle, timeStyle, timeZone } = options ?? {};

  if (
    _.isNil(data) ||
    (_.isString(data) && _.trim(data) === '') ||
    !dayjs(data).isValid()
  ) {
    return '';
  }

  data = dayjs(data).toDate();

  return new Intl.DateTimeFormat(locales, {
    dateStyle,
    timeStyle,
    timeZone,
  }).format(data);
};

export const formatDate = (
  data: dateTimeDataType,
  options?: { locales?: localesType; dateStyle?: dateTimeStyle },
): string => {
  return formatDateTime(data, {
    locales: options?.locales,
    dateStyle: options?.dateStyle ?? 'long',
    timeStyle: undefined,
    timeZone: undefined,
  });
};
