import * as yup from 'yup';
import i18next from 'utils/i18n';

// TODO: Add i18n
export const addScheduleSchema = yup.object({
  name: yup.string()
    .required(i18next.t('add_schedule.form.errors.email_required')),
  fromDate: yup.date()
    .required(),
  toDate: yup.date()
    .required()
    .min(yup.ref('fromDate')),
  daysOff: yup.array()
    .of(yup.date()),
});
