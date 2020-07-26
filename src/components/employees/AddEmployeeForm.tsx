import React, { FC } from 'react';
import {
  Formik, Form,
} from 'formik';
import { FormParams } from 'shared/types';
import { FormField } from 'components/shared/FormField';
import { useTranslation } from 'react-i18next';
import { AddUserParams } from 'store/users/types';
import { Button, styled } from '@material-ui/core';
import { Stylable } from 'utils/types';
import { addEmployeeSchema } from './schema';

const StyledForm = styled(Form)({
  display: 'flex',
  flexDirection: 'column',
  '& > *:first-child': {
    marginTop: 0,
  },
});

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

export const AddEmployeeForm: FC<FormParams<AddUserParams> & Stylable> = ({
  handleSubmit, initialValues, ...props
}) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={addEmployeeSchema}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <StyledForm {...props}>
          <FormField
            type="text"
            name="name"
            label={t('employees.form.name')}
            required
          />
          <FormField
            type="email"
            name="email"
            label={t('employees.form.email')}
            required
          />
          <SubmitButton
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? t('employees.form.add.loading') : t('employees.form.add.submit')}
          </SubmitButton>
        </StyledForm>
      )}
    </Formik>
  );
};
