import { FormikHelpers } from 'formik';

export interface FormParams<T> {
  initialValues: T;
  error?: string;
  handleSubmit: (values: T, actions: FormikHelpers<T>) => void;
  className?: string;
}
