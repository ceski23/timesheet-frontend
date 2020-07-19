import { ApiError } from 'utils/api';
import Notificator from 'utils/Notificator';

function formErrorHandler<T>(
  error: ApiError<T>,
  setFieldsErrors: (errors: { [K in keyof T]: string }) => void,
) {
  if (typeof error.data === 'string') Notificator.error(error.data);
  else setFieldsErrors(error.data);
}

export default formErrorHandler;
