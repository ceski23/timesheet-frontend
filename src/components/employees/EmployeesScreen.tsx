/* eslint-disable react/jsx-props-no-spreading */
import React, {
  FC, ReactElement, useEffect, ChangeEvent,
} from 'react';
import {
  styled, Paper, List, ListItem, ListItemIcon,
  ListItemText, Avatar, CircularProgress, ListItemSecondaryAction, IconButton,
  withStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { useThunkDispatch } from 'store';
import { useSelector } from 'react-redux';
import { User } from 'store/users/types';
import Pagination from '@material-ui/lab/Pagination';
import { Loader } from 'components/Loader';
import { useTranslation } from 'react-i18next';
import { useDialog } from 'hooks/useDialog';
import { ConfirmDialog } from 'components/ConfirmDialog';
import Notificator from 'utils/Notificator';
import {
  fetchUsers, selectUsersData, selectUsersStatus,
  selectUsersPagination, selectUsersQuery, removeUser,
} from 'store/users/slice';
import { gridSpacingVertical, gridSpacingHorizontal } from 'utils/styles';
import { useAppScreen } from 'hooks/useAppScreen';
import { AddEmployeeSection } from './AddEmployeeSection';

// #region styles
const Container = styled('div')(({ theme }) => ({
  ...gridSpacingVertical(theme.spacing(2)),
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  [theme.breakpoints.up('sm')]: {
    ...gridSpacingHorizontal(theme.spacing(2), true),
    flexDirection: 'row-reverse',
  },
}));

const ListContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const SpinnerContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
}));

const UsersList = styled(List)(() => ({
  overflow: 'auto',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const UsersPagination = styled(withStyles({
  ul: {
    justifyContent: 'center',
  },
})(Pagination))(({ theme }) => ({
  margin: `${theme.spacing(1)}px 0`,
}));
// #endregion

export const EmployeesScreen: FC = (): ReactElement => {
  useAppScreen('employees');
  const dispatch = useThunkDispatch();
  const query = useSelector(selectUsersQuery);
  const users = useSelector(selectUsersData);
  const { fetching } = useSelector(selectUsersStatus);
  const { currentPage, totalPages } = useSelector(selectUsersPagination);
  const { t } = useTranslation();
  const {
    isOpen, setClose, setOpen, data,
  } = useDialog<User>();

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, query })).catch(() => Notificator.error(t('employees.findError')));
  }, [query]);

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    dispatch(fetchUsers({ page: value, query })).catch(() => Notificator.error(t('employees.findError')));
  };

  const handleEmployeeDelete = () => {
    if (data) {
      // eslint-disable-next-line no-underscore-dangle
      dispatch(removeUser(data._id))
        .then(() => Notificator.success(t('employees.employeeDeleted', { name: data.name })))
        .catch(() => Notificator.error(t('employees.deleteError')))
        .then(() => dispatch(fetchUsers({ page: 1, query })));
    }
  };

  return (
    <Container>

      <AddEmployeeSection />

      <ListContainer>
        <UsersList>
          <Loader
            loading={fetching}
            loader={(
              <SpinnerContainer>
                <CircularProgress />
              </SpinnerContainer>
              )}
          >
            {users && users.map(({ name, email, ...rest }, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <ListItem button key={i}>
                <ListItemIcon>
                  <Avatar>{name[0]}</Avatar>
                </ListItemIcon>
                <ListItemText primary={name} secondary={email} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => setOpen({ name, email, ...rest })}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </Loader>
        </UsersList>

        {currentPage && (
        <UsersPagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
        )}

        <ConfirmDialog
          isOpen={isOpen}
          onConfirm={handleEmployeeDelete}
          confirmText={t('employees.deleteDialog.confirm')}
          title={t('employees.deleteDialog.title')}
          close={setClose}
        >
          {t('employees.deleteDialog.text', { name: data?.name })}
        </ConfirmDialog>

      </ListContainer>

    </Container>
  );
};
