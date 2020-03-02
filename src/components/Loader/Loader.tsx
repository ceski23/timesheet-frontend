import React, { FC, ReactElement } from 'react';
import { useDebounce } from 'use-lodash-debounce';

interface LoaderProps {
  delay?: number;
  loader: ReactElement;
  loading: boolean;
}

export const Loader: FC<LoaderProps> = ({
  delay = 300, children, loading, loader,
}): ReactElement => {
  const delayedLoading = useDebounce(loading, delay);

  if (delayedLoading) return loader;
  return <>{children}</>;
};
