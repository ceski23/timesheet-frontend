import { ErrorOption } from 'react-hook-form';
import { ApiError } from 'utils/api';
import Notificator from 'utils/Notificator';

export function errorHandler<T>(
  error: ApiError<T>,
  setFieldsErrors?: (errors: { [K in keyof T]: string }) => void,
) {
  if (error instanceof Error) Notificator.error(error.message);
  else if (typeof error.data === 'string') Notificator.error(error.data);
  else if (setFieldsErrors) setFieldsErrors(error.data);
}

export function errorHandler2<T>(
  error: ApiError<T>,
  setError: (field: any, error: ErrorOption) => void,
) {
  if (error instanceof Error) Notificator.error(error.message);
  else if (typeof error.data === 'string') Notificator.error(error.data);
  else {
    Object.entries<string>(error.data).forEach(
      ([field, message]) => setError(field, { message }),
    );
  }
}
