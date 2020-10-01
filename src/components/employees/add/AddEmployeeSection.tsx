import React from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, styled,
} from '@material-ui/core';
import { TitleWithIcon } from 'components/shared/TitleWithIcon';
import AddEmployeeIcon from '@material-ui/icons/PersonAddOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AddUserParams } from 'store/users/types';
import { useTranslation } from 'react-i18next';
import { FormSubmitFunction } from 'utils/types';
import { useAddUser } from 'api/users';
import Notificator from 'utils/Notificator';
import { errorHandler } from 'utils/errorHandlers';
import { ApiError } from 'utils/api';
import { AddEmployeeForm } from './AddEmployeeForm';

// #region styles
const StyledEmployeeForm = styled(AddEmployeeForm)({
  flex: 1,
});
// #endregion

export const AddEmployeeSection = () => {
  const { t } = useTranslation();
  const [addUser] = useAddUser();

  const handleSubmit: FormSubmitFunction<AddUserParams> = async (values, actions) => {
    await addUser(values, {
      onSuccess: user => {
        Notificator.success(t('employees.employeeAdded', { name: user.name }));
        actions.resetForm();
      },
      onError: error => {
        errorHandler(error as ApiError, actions.setErrors);
      },
    });
  };

  const initialValues = {
    name: '',
    email: '',
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="addemployee-content"
          id="addemployee-header"
        >
          <TitleWithIcon icon={AddEmployeeIcon} text={t('employees.add.title')} />
        </AccordionSummary>
        <AccordionDetails>
          <StyledEmployeeForm
            handleSubmit={handleSubmit}
            initialValues={initialValues}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
