import React, { FC, ReactElement } from 'react';
import { CircularProgress, styled, Typography } from '@material-ui/core';
import { useIsFetching } from 'react-query';
import { Helmet } from 'react-helmet';

// #region styles
const StyledProgress = styled(CircularProgress)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));
// #endregion

interface Props {
  title?: string;
}

export const DefaultToolbar: FC<Props> = ({ title = 'Timesheet' }): ReactElement => {
  const isFetching = useIsFetching();
  return (
    <>
      <Typography
        variant="h6"
        component="h1"
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {title}
        {isFetching ? <StyledProgress size={24} /> : null}
      </Typography>

      {title && (
        <Helmet>
          <title>{title} — zarządzanie czasem pracy</title>
        </Helmet>
      )}
    </>
  );
};
