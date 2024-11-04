import { Flags, Message, Schema } from 'yup';

declare module 'yup' {
  interface ArraySchema<
    TIn extends any[] | null | undefined,
    TContext,
    TDefault = undefined,
    TFlags extends Flags = '',
  > extends Schema<TIn, TContext, TDefault, TFlags> {
    unique(msg?: Message): ArraySchema<TIn, TContext, TDefault, TFlags>;
  }
}

export {};
