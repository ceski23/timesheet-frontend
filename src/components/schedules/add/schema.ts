import * as yup from 'yup';
import i18next from 'utils/i18n';

export const addScheduleSchema = yup.object({
  name: yup.string()
    .required(i18next.t('form:validation.schedule_name.required')),
  fromDate: yup.date()
    .required(i18next.t('form:validation.date_from.required')),
  toDate: yup.date()
    .required(i18next.t('form:validation.date_to.required'))
    .min(yup.ref('fromDate'), i18next.t('form:validation.date_to.min')),
  daysOff: yup.array()
    .of(yup.date()),
});
