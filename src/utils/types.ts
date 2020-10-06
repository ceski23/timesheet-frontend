import { UseFormMethods } from 'react-hook-form';

export interface Stylable {
  className?: string;
  style?: React.CSSProperties;
}

export interface FormParams2<T> {
  onSubmit: (values: T) => Promise<void> | void;
  form: UseFormMethods<T>;
}
