import { FormikHelpers } from 'formik';

export interface FormParams<T> {
  initialValues: T;
  handleSubmit: (values: T, actions: FormikHelpers<T>) => void;
}
