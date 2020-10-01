import { CircularProgress, styled } from '@material-ui/core';
import React, { FC, ReactElement } from 'react';
import { useDebounce } from 'use-lodash-debounce';

// #region style
const SpinnerContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
}));
// #endregion

interface LoaderProps {
  delay?: number;
  loader?: ReactElement;
  loading: boolean;
}

export const Loader: FC<LoaderProps> = ({
  delay = 300, children, loading, loader,
}): ReactElement => {
  const delayedLoading = useDebounce(loading, delay);

  if (delayedLoading) {
    return (
      loader || (
      <SpinnerContainer>
        <CircularProgress />
      </SpinnerContainer>
      )
    );
  }
  return <>{children}</>;
};
