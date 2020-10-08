import * as yup from 'yup';
import i18next from 'utils/i18n';
import { RECORD_TYPES } from 'api/records';

export const addRecordSchema = yup.object({
  details: yup.string(),
  dateFrom: yup.date()
    .required(i18next.t('form:validation.date_from.required')),
  dateTo: yup.date()
    .required(i18next.t('form:validation.date_to.required'))
    .min(yup.ref('dateFrom'), i18next.t('form:validation.date_to.min')),
  type: yup.string()
    .oneOf(RECORD_TYPES, i18next.t('form:validation.record_type.match')),
});
