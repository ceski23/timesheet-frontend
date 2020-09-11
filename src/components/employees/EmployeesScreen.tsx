/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-props-no-spreading */
import React, {
  FC, ReactElement, ChangeEvent, useState, useEffect,
} from 'react';
import {
  styled, Paper, List, ListItem, ListItemIcon,
  ListItemText, Avatar, CircularProgress, ListItemSecondaryAction, IconButton,
  withStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { User } from 'store/users/types';
import Pagination from '@material-ui/lab/Pagination';
import { Loader } from 'components/Loader';
import { useTranslation } from 'react-i18next';
import { useDialog } from 'hooks/useDialog';
import { ConfirmDialog } from 'components/ConfirmDialog';
import { gridSpacingVertical, gridSpacingHorizontal } from 'utils/styles';
import { useUsers, useDeleteUser } from 'api/users';
import { ScreenWrapper } from 'components/ScreenWrapper';
import { useDebounce } from 'use-lodash-debounce';
import Notificator from 'utils/Notificator';
import { AddEmployeeSection } from './AddEmployeeSection';
import { EmployeesToolbar } from './EmployeesToolbar';

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
  const { t } = useTranslation();
  const { isOpen, setClose, setOpen, data } = useDialog<User>();
  const [{ page, query }, setReqParams] = useState({
    page: 1,
    query: '',
  });
  const [tmpQuery, setTmpQuery] = useState(query);
  const debouncedQuery = useDebounce(tmpQuery, 800);
  const users = useUsers({ query, page });
  const [deleteUser, { isError, isSuccess, status }] = useDeleteUser();

  useEffect(() => {
    setReqParams({ page: 1, query: debouncedQuery });
  }, [debouncedQuery]);

  useEffect(() => {
    if (users.isError) Notificator.error(t('employees.findError'));
  }, [users.isError]);

  useEffect(() => {
    if (isError) Notificator.error(t('employees.deleteError'));
    if (isSuccess && data) Notificator.success(t('employees.employeeDeleted', { name: data.name }));
  }, [status]);

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setReqParams({ query, page: value });
  };

  const handleEmployeeDelete = async () => {
    // eslint-disable-next-line no-underscore-dangle
    await deleteUser(data?._id);
  };

  return (
    <ScreenWrapper toolbar={(
      <EmployeesToolbar query={tmpQuery} setQuery={setTmpQuery} />
    )}
    >
      <Container>
        <AddEmployeeSection />

        <ListContainer>
          <UsersList>
            <Loader
              loading={users.isLoading}
              loader={(
                <SpinnerContainer>
                  <CircularProgress />
                </SpinnerContainer>
              )}
            >
              {users.resolvedData?.data.map(({ name, email, ...rest }, i) => (
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

          {users.resolvedData?.currentPage && (
            <UsersPagination
              count={users.resolvedData?.totalPages}
              page={users.resolvedData?.currentPage}
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
    </ScreenWrapper>
  );
};
