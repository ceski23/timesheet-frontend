import * as yup from 'yup';
import i18next from 'utils/i18n';

export const addEmployeeSchema = yup.object({
  name: yup.string()
    .min(3, i18next.t('add_employee.form.errors.name_min'))
    .max(50, i18next.t('add_employee.form.errors.name_min'))
    .required(i18next.t('add_employee.form.errors.email_required')),
  email: yup.string()
    .email(i18next.t('add_employee.form.errors.email'))
    .required(i18next.t('add_employee.form.errors.email_required')),
});
