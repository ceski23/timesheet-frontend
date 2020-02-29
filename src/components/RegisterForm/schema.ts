import * as yup from 'yup';
import i18next from 'i18n';
import { loginFormSchema } from 'components/LoginForm/schema';

export const registerFormSchema = loginFormSchema.shape({
  name: yup.string()
    .min(3, i18next.t('register.form.errors.name_min'))
    .max(50, i18next.t('register.form.errors.name_max'))
    .required(i18next.t('register.form.errors.name_required')),
  password: yup.string()
    .matches(/.{8,}/, '\0')
    .matches(/[0-9]+/, '\0')
    .matches(/[a-zA-Z]+/, '\0')
    .matches(/[#?!@$%^&*-]+/, '\0')
    .required(i18next.t('login.form.errors.password_required')),
  repeatPassword: yup.string()
    .oneOf([yup.ref('password')], i18next.t('register.form.errors.password_repeat'))
    .required(i18next.t('register.form.errors.password_required')),
});
