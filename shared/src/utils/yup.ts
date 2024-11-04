import * as Yup from 'yup';

Yup.addMethod(Yup.array, 'unique', function (msg?: Yup.Message) {
  return this.test('unique', msg ?? 'unique', function (value: unknown) {
    if (!Array.isArray(value)) {
      return true;
    }

    return value.length === new Set(value).size;
  });
});

Yup.setLocale({
  mixed: { required: 'required', oneOf: 'oneOf' },
  string: { min: 'min', max: 'max' },
});
