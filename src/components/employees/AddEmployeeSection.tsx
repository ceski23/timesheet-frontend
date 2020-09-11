import React from 'react';
import {
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, styled,
} from '@material-ui/core';
import { TitleWithIcon } from 'components/shared/TitleWithIcon';
import AddEmployeeIcon from '@material-ui/icons/PersonAddOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AddUserParams } from 'store/users/types';
import { useThunkDispatch } from 'store';
import { addUser, selectUsersQuery, fetchUsers } from 'store/users/slice';
import Notificator from 'utils/Notificator';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ApiError } from 'utils/api';
import { errorHandler } from 'utils/errorHandlers';
import { FormSubmitFunction } from 'utils/types';
import { AddEmployeeForm } from './AddEmployeeForm';

// #region styles
const StyledEmployeeForm = styled(AddEmployeeForm)({
  flex: 1,
});
// #endregion

export const AddEmployeeSection = () => {
  const dispatch = useThunkDispatch();
  const query = useSelector(selectUsersQuery);
  const { t } = useTranslation();

  const handleSubmit: FormSubmitFunction<AddUserParams> = async (values, actions) => {
    const result = await dispatch(addUser(values));
    if (addUser.fulfilled.match(result)) {
      Notificator.success(t('employees.employeeAdded', { name: values.name }));
      dispatch(fetchUsers({ page: 1, query }));
      actions.resetForm();
    } else errorHandler(result.payload as ApiError, actions.setErrors);
  };

  const initialValues = {
    name: '',
    email: '',
  };

  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="addemployee-content"
          id="addemployee-header"
        >
          <TitleWithIcon icon={AddEmployeeIcon} text={t('employees.add.title')} />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <StyledEmployeeForm
            handleSubmit={handleSubmit}
            initialValues={initialValues}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};