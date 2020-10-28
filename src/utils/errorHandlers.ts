import { ErrorOption } from 'react-hook-form';
import { ApiError } from 'utils/api';
import Notificator from 'utils/Notificator';

export const formErrorHandler = (
  error: unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setError: (field: any, error: ErrorOption) => void,
  mapError?: (error: string) => string,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err = error as ApiError<any>;
  if (err instanceof Error) {
    Notificator.error(mapError ? mapError(err.message) : err.message);
  } else if (typeof err.data === 'string') {
    Notificator.error(mapError ? mapError(err.data) : err.data);
  } else {
    Object.entries<string>(err.data).forEach(
      ([field, message]) => setError(field, {
        message: mapError ? mapError(message) : message,
      }),
    );
  }
};
