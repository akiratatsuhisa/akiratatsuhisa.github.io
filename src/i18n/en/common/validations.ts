import { LocaleCommonValidations } from '@/i18n/type/common/validations';

export const validations: LocaleCommonValidations = {
  required: '"{{field}}" field is required',
  email: 'Invalid mail address format',
  phone: 'Invalid mail phone number',
  min: '"{{field}}" must be at least {{min}} characters',
  max: '"{{field}}" must not exceed {{max}} characters',
};
