import { Flags, Message, Schema } from 'yup';

declare module 'yup' {
  interface ArraySchema<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TIn extends any[] | null | undefined,
    TContext,
    TDefault = undefined,
    TFlags extends Flags = '',
  > extends Schema<TIn, TContext, TDefault, TFlags> {
    unique(msg?: Message): ArraySchema<TIn, TContext, TDefault, TFlags>;
  }
}
