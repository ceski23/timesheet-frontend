import * as yup from 'yup';
import i18next from 'utils/i18n';

export const loginFormSchema = yup.object().shape({
  email: yup.string()
    .email(i18next.t('login.form.errors.email'))
    .required(i18next.t('login.form.errors.email_required')),
  password: yup.string()
    .matches(/^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, i18next.t('login.form.errors.password_match'))
    .required(i18next.t('login.form.errors.password_required')),
});
