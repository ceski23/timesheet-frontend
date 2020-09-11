import { TextField } from 'formik-material-ui';
import React, { FC } from 'react';
import { Field, FieldAttributes } from 'formik';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FormField: FC<FieldAttributes<any>> = ({ ...props }) => (
  <Field
    component={TextField}
    variant="outlined"
    margin="normal"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);