/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, InputAdornment, styled, TextField,
} from '@material-ui/core';
import { FormParams2, Stylable } from 'utils/types';
import { AddUserParams } from 'api/users';

// #region styles
const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  '& > *:first-child': {
    marginTop: 0,
  },
});

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));
// #endregion

export const AddEmployeeForm: FC<FormParams2<AddUserParams> & Stylable> = ({
  onSubmit, form, ...props
}) => {
  const { t } = useTranslation();
  const {
    handleSubmit, errors, formState, register, watch,
  } = form;
  const norm = watch('norm');

  return (
    <StyledForm {...props} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id="employee-name"
        type="text"
        name="name"
        label={t('form:fields.name')}
        required
        variant="outlined"
        inputRef={register}
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message || ''}
      />
      <TextField
        id="employee-email"
        type="email"
        name="email"
        label={t('form:fields.email')}
        required
        variant="outlined"
        inputRef={register}
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message || ''}
      />
      <TextField
        id="employee-norm"
        type="number"
        name="norm"
        label={t('form:fields.norm')}
        required
        variant="outlined"
        inputRef={register}
        margin="normal"
        error={!!errors.norm}
        helperText={errors.norm?.message || ''}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {t('form:extra.hours', { count: Number(norm) })}
            </InputAdornment>
          ),
        }}
      />
      <SubmitButton
        variant="contained"
        color="primary"
        disabled={formState.isSubmitting}
        type="submit"
      >
        {formState.isSubmitting ? t('form:loading.add_employee') : t('form:submit.add_employee')}
      </SubmitButton>
    </StyledForm>
  );
};
