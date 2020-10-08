import * as yup from 'yup';
import i18next from 'utils/i18n';

export const resetPasswordFormSchema = yup.object().shape({
  token: yup.string()
    .matches(/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/, i18next.t('form:validation.reset_token.format'))
    .required(i18next.t('form:validation.reset_token.required')),
  password: yup.string()
    .matches(/.{8,}/, '\0')
    .matches(/[0-9]+/, '\0')
    .matches(/[a-zA-Z]+/, '\0')
    .matches(/[#?!@$%^&*-]+/, '\0')
    .required(i18next.t('form:validation.password.required')),
  repeatPassword: yup.string()
    .oneOf([yup.ref('password')], i18next.t('form:validation.password.repeat'))
    .required(i18next.t('form:validation.password.required')),
});
