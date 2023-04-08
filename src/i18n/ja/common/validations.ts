import { LocaleCommonValidations } from '@/i18n/type/common/validations';

export const validations: LocaleCommonValidations = {
  required: '「{{field}}」フィールドは必須です',
  email: '無効なメールアドレス形式です',
  phone: '無効な電話番号です',
  min: '「{{field}}」は{{min}}文字以上で入力してください',
  max: '「{{field}}」は{{max}}文字以内で入力してください',
};
