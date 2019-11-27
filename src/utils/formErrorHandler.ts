import { mapValues } from 'lodash-es';
import { ApiError } from 'api';
import Snackbar from 'utils/snackbar';

function formErrorHandler<T>(
  error: ApiError<T>,
  setFieldsErrors: (errors: { [K in keyof T]: string }) => void,
) {
  if (typeof error.data === 'string') Snackbar.error(error.data);
  else setFieldsErrors(mapValues(error.data, o => o.message));
}

export default formErrorHandler;
