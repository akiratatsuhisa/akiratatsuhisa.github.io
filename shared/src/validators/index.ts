import * as Yup from 'yup';

export const paginationSchema = Yup.object({
  take: Yup.number().required().oneOf([10, 25, 50, 100]),
  skip: Yup.number()
    .required()
    .test((value, { parent }) => {
      return value >= 0 && value % Number(parent.take) === 0;
    }),
});

export type PaginationSchema = Yup.InferType<typeof paginationSchema>;

export * from './projects';
export * from './resume';
