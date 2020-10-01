import { FormikHelpers } from 'formik';

export interface Stylable {
  className?: string;
  style?: React.CSSProperties;
}

export type FormSubmitFunction<T> = (values: T, actions: FormikHelpers<T>) => void;

export interface FormParams<T> {
  initialValues: T;
  handleSubmit: (values: T, actions: FormikHelpers<T>) => void;
}
