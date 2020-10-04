import { styled, Paper, List } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { withStyles } from '@material-ui/styles';
import React, { ChangeEvent, FC } from 'react';
import { Loader } from './Loader';

// #region styles
const ListContainer = styled(Paper)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const UsersList = styled(List)(() => ({
  overflow: 'auto',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const ListPagination = styled(withStyles({
  ul: {
    justifyContent: 'center',
  },
})(Pagination))(({ theme }) => ({
  margin: `${theme.spacing(1)}px 0`,
}));
// #endregion

interface Props {
  header: React.ReactNode;
  loading: boolean;
  pagination: {
    count?: number;
    page?: number;
  };
  onPageChange: (event: ChangeEvent<unknown>, page: number) => void;
}

export const SimpleList: FC<Props> = ({
  header, loading, children, pagination, onPageChange,
}) => (
  <ListContainer>
    {header}

    <UsersList>
      <Loader loading={loading}>
        {children}
      </Loader>
    </UsersList>

    {pagination.page && (
      <ListPagination
        count={pagination.count}
        page={pagination.page}
        onChange={onPageChange}
      />
    )}
  </ListContainer>
);
