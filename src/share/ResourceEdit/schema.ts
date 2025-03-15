/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup';

const validationSchema = (
  t: (key: string, params?: Record<string, any>) => string,
  resourceName: string,
  action: 'update' | 'create',
) => {
  switch (resourceName) {
    case 'users':
      return action === 'create'
        ? Yup.object({
            fullname: Yup.string().required(t('errors.err05')).min(3, t('errors.err06')).max(50, t('errors.err06')),
            email: Yup.string().required(t('errors.err01')).email(t('errors.err02')),
            password: Yup.string()
              .required(t('errors.err03'))
              .matches(/^(?=.*[@-_]).{8,}$/, t('errors.err04')),
            gender: Yup.string().required(t('errors.gender')),
            role: Yup.string().required(t('errors.role')),
          })
        : Yup.object({
            fullname: Yup.string().required(t('errors.err05')).min(3, t('errors.err06')).max(50, t('errors.err06')),
            email: Yup.string().required(t('errors.err01')).email(t('errors.err02')),

            gender: Yup.string().required(t('errors.gender')),
            role: Yup.string().required(t('errors.role')),
          });
    case 'categories':
      return Yup.object({
        name: Yup.string().required(t('errors.category')),
      });
    case 'products':
      return Yup.object({
        name: Yup.string().required(t('errors.product')),
        description: Yup.string().required(t('errors.productDesc')),
        price: Yup.string().required(t('errors.productPrice')),
        category: Yup.string().required(t('errors.productCate')),
      });
    default:
      return Yup.object({});
  }
};

export default validationSchema;
