import React, { FC, ReactElement } from 'react';
import { CircularProgress, styled, Typography } from '@material-ui/core';
import { useIsFetching } from 'react-query';

// #region styles
const StyledProgress = styled(CircularProgress)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));

const Title = styled(Typography)({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
});
// #endregion

interface Props {
  title?: string;
}

export const DefaultToolbar: FC<Props> = ({ title = 'Timesheet' }): ReactElement => {
  const isFetching = useIsFetching();
  return (
    <>
      <Title variant="h6">
        {title}
        {isFetching ? <StyledProgress size={24} /> : null}
      </Title>
    </>
  );
};
