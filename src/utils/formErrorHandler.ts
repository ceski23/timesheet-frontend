import { mapValues } from 'lodash-es';
import { ApiError } from 'api';

function formErrorHandler<T>(
  error: ApiError<T>,
  setFormError: (error: string) => void,
  setFieldsErrors: (errors: { [K in keyof T]: string }) => void,
) {
  if (typeof error.data === 'string') setFormError(error.data);
  else setFieldsErrors(mapValues(error.data, o => o.message));
}

export default formErrorHandler;
