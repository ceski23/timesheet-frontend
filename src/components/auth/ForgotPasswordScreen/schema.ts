import * as yup from 'yup';
import i18next from 'utils/i18n';

export const forgotPasswordFormSchema = yup.object({
  email: yup.string()
    .email(i18next.t('forgot_password.form.errors.email'))
    .required(i18next.t('forgot_password.form.errors.email_required')),
});
