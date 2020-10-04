import { FormikHelpers } from 'formik';
import { UseFormMethods } from 'react-hook-form';

export interface Stylable {
  className?: string;
  style?: React.CSSProperties;
}

export type FormSubmitFunction<T> = (values: T, actions: FormikHelpers<T>) => void;

export interface FormParams<T> {
  initialValues: T;
  handleSubmit: (values: T, actions: FormikHelpers<T>) => void;
}

export interface FormParams2<T> {
  onSubmit: (values: T) => Promise<void> | void;
  form: UseFormMethods<T>;
}
