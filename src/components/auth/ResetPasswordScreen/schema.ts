import * as yup from 'yup';
import i18next from 'i18n';

export const resetPasswordFormSchema = yup.object().shape({
  token: yup.string()
    .matches(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/, i18next.t('reset_password.form.errors.token'))
    .required(i18next.t('reset_password.form.errors.token_required')),
  password: yup.string()
    .matches(/.{8,}/, '\0')
    .matches(/[0-9]+/, '\0')
    .matches(/[a-zA-Z]+/, '\0')
    .matches(/[#?!@$%^&*-]+/, '\0')
    .required(i18next.t('reset_password.form.errors.password_required')),
  repeatPassword: yup.string()
    .oneOf([yup.ref('password')], i18next.t('reset_password.form.errors.password_repeat'))
    .required(i18next.t('reset_password.form.errors.password_required')),
});
