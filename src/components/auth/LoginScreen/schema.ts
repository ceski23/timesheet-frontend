import * as yup from 'yup';
import i18next from 'utils/i18n';

export const loginFormSchema = yup.object().shape({
  email: yup.string()
    .email(i18next.t('form:validation.email.format'))
    .required(i18next.t('form:validation.email.required')),
  password: yup.string()
    .matches(/^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, i18next.t('form:validation.password.match'))
    .required(i18next.t('form:validation.password.required')),
});
