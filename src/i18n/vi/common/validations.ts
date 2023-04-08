import { LocaleCommonValidations } from '@/i18n/type/common/validations';

export const validations: LocaleCommonValidations = {
  required: 'Trường "{{field}}" là bắt buộc',
  email: 'Định dạng địa chỉ email không hợp lệ',
  phone: 'Số điện thoại không hợp lệ',
  min: '"{{field}}" phải có ít nhất {{min}} ký tự',
  max: '"{{field}}" không được vượt quá {{max}} ký tự',
};
