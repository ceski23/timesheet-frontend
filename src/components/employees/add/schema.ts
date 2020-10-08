import * as yup from 'yup';
import i18next from 'utils/i18n';

export const addEmployeeSchema = yup.object({
  name: yup.string()
    .min(3, i18next.t('form:validation.name.min', { min: 3 }))
    .max(50, i18next.t('form:validation.name.max', { max: 50 }))
    .required(i18next.t('form:validation.name.required')),
  email: yup.string()
    .email(i18next.t('form:validation.email.format'))
    .required(i18next.t('form:validation.email.required')),
});
