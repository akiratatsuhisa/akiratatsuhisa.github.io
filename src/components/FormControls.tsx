import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupProps,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  InputProps,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Stack,
  Switch,
  SwitchProps,
  Tag,
  TagLabel,
  Textarea,
  TextareaProps,
  Wrap,
} from '@chakra-ui/react';
import { ElementType, FC, ReactNode, useId } from 'react';
import { useTranslation } from 'react-i18next';

import { Enumerable } from '@/enums';

interface ICustomFormErrorMessageProps {
  field?: string;
  error?: string | string[];
  payload?: Record<string, unknown>;
}

const CustomFormErrorMessage: FC<ICustomFormErrorMessageProps> = ({
  error,
  field,
  payload = {},
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common.validations',
  });

  const errors = typeof error === 'string' ? [error] : error ?? [];

  return (
    <>
      {errors.map((error, index) => (
        <FormErrorMessage key={index}>
          {t(error!, { field, ...payload })}
        </FormErrorMessage>
      ))}
    </>
  );
};

export interface IFormControlProps
  extends Omit<ICustomFormErrorMessageProps, 'field'> {
  touched?: boolean;
  translation: string;
}

export interface IOptionsProps {
  translationOptionKeyPrefix?: string;
  options?: Array<Enumerable | Omit<Enumerable, 'icon'>>;
  stack?: ElementType;
  children?: ReactNode;
}

export interface IFormControlSwitchProps
  extends IFormControlProps,
    SwitchProps {}

export const FormControlSwitch: FC<IFormControlSwitchProps> = ({
  translation,
  error,
  payload,
  touched,
  ...props
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });

  const id = useId();

  const fieldTranslation = t(`fields.${translation}`);

  return (
    <FormControl
      isInvalid={touched && !!error}
      as={Flex}
      alignItems="center"
      gap="3"
    >
      <FormLabel htmlFor={props.id ?? id} flex="1 1 auto" margin="0">
        {fieldTranslation}
      </FormLabel>

      <Switch flex="0 0 auto" size="lg" {...props} id={props.id ?? id} />

      <CustomFormErrorMessage
        error={error}
        field={fieldTranslation}
        payload={payload}
      />
    </FormControl>
  );
};

export interface IFormControlInputProps extends IFormControlProps, InputProps {}

export const FormControlInput: FC<IFormControlInputProps> = ({
  translation,
  error,
  payload,
  touched,
  ...props
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });

  const id = useId();

  const fieldTranslation = t(`fields.${translation}`);

  return (
    <FormControl isInvalid={touched && !!error}>
      <FormLabel htmlFor={props.id ?? id}> {fieldTranslation}</FormLabel>

      <Input {...props} id={props.id ?? id} />

      <CustomFormErrorMessage
        error={error}
        field={fieldTranslation}
        payload={payload}
      />
    </FormControl>
  );
};

export interface IFormControlTextareaProps
  extends IFormControlProps,
    TextareaProps {}

export const FormControlTextarea: FC<IFormControlTextareaProps> = ({
  translation,
  error,
  payload,
  touched,
  ...props
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });

  const id = useId();

  const fieldTranslation = t(`fields.${translation}`);

  return (
    <FormControl isInvalid={touched && !!error}>
      <FormLabel htmlFor={props.id ?? id}> {fieldTranslation}</FormLabel>

      <Textarea {...props} id={props.id ?? id} />

      <CustomFormErrorMessage
        error={error}
        field={fieldTranslation}
        payload={payload}
      />
    </FormControl>
  );
};

export interface IFormControlRadioGroupProps
  extends IFormControlProps,
    IOptionsProps,
    Omit<RadioGroupProps, 'children'> {}

export const FormControlRadioGroup: FC<IFormControlRadioGroupProps> = ({
  translation,
  error,
  payload,
  touched,
  translationOptionKeyPrefix,
  options,
  stack,
  children,
  ...props
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });

  const id = useId();

  const fieldTranslation = t(`fields.${translation}`);

  return (
    <FormControl isInvalid={touched && !!error}>
      <FormLabel htmlFor={props.id ?? id}> {fieldTranslation}</FormLabel>

      <RadioGroup {...props} id={props.id ?? id}>
        {children ?? (
          <Stack as={stack}>
            {options?.map((option) => (
              <Radio key={option.value} value={option.value}>
                {t(`${translationOptionKeyPrefix}.${option.translation}`)}
              </Radio>
            ))}
          </Stack>
        )}
      </RadioGroup>

      <CustomFormErrorMessage
        error={error}
        field={fieldTranslation}
        payload={payload}
      />
    </FormControl>
  );
};

export interface IFormControlCheckboxGroupProps
  extends IFormControlProps,
    IOptionsProps,
    Omit<CheckboxGroupProps, 'children'> {}

export const FormControlCheckboxGroup: FC<IFormControlCheckboxGroupProps> = ({
  translation,
  error,
  payload,
  touched,
  translationOptionKeyPrefix,
  options,
  stack,
  children,
  ...props
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });

  const fieldTranslation = t(`fields.${translation}`);

  return (
    <FormControl isInvalid={touched && !!error}>
      <FormLabel> {fieldTranslation}</FormLabel>

      <CheckboxGroup {...props}>
        {children ?? (
          <Stack as={stack}>
            {options?.map((option) => (
              <Checkbox key={option.value} value={option.value}>
                {t(`${translationOptionKeyPrefix}.${option.translation}`)}
              </Checkbox>
            ))}
          </Stack>
        )}
      </CheckboxGroup>

      <CustomFormErrorMessage
        error={error}
        field={fieldTranslation}
        payload={payload}
      />
    </FormControl>
  );
};

export interface IFormControlTagGroupProps
  extends IFormControlProps,
    IOptionsProps {
  isReadOnly?: boolean;
  multiple?: boolean;
  value?: Array<string | number> | string | number;
  onChange?: (value?: Array<string | number> | string | number) => void;
}

export const FormControlTagGroup: FC<IFormControlTagGroupProps> = ({
  translation,
  error,
  payload,
  touched,
  translationOptionKeyPrefix,
  options,
  stack,
  children,
  isReadOnly,
  multiple,
  value,
  onChange,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });

  const fieldTranslation = t(`fields.${translation}`);

  const isActive = (data: string | number) => {
    if (multiple && Array.isArray(value)) {
      return value?.some((value) => value === data);
    }
    return value === data;
  };

  const handleChange = (data: string | number) => {
    if (!multiple) {
      return onChange?.(value === data ? undefined : data);
    }
    const temp = Array.isArray(value) ? [...value] : [];

    if (!isActive(data)) {
      temp.push(data);
    } else {
      temp.splice(
        temp.findIndex((obj) => obj === data),
        1,
      );
    }

    onChange?.(temp);
  };

  return (
    <FormControl isInvalid={touched && !!error}>
      <FormLabel> {fieldTranslation}</FormLabel>

      {children ?? (
        <Wrap as={stack}>
          {options?.map((option) => (
            <Tag
              key={option.value}
              size="lg"
              variant={isActive(option.value) ? 'solid' : 'subtle'}
              cursor="pointer"
              onClick={
                !isReadOnly ? () => handleChange(option.value) : undefined
              }
            >
              {'icon' in option && (
                <Image src={option.icon} height="1.5rem" ml="-1" mr="2" />
              )}
              <TagLabel>
                {t(`${translationOptionKeyPrefix}.${option.translation}`)}
              </TagLabel>
            </Tag>
          ))}
        </Wrap>
      )}

      <CustomFormErrorMessage
        error={error}
        field={fieldTranslation}
        payload={payload}
      />
    </FormControl>
  );
};
