import * as yup from 'yup';
import i18next from 'utils/i18n';

export const forgotPasswordFormSchema = yup.object({
  email: yup.string()
    .email(i18next.t('form:validation.email.format'))
    .required(i18next.t('form:validation.email.required')),
});
