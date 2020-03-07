import React, { FC, ReactElement } from 'react';
import { Typography } from '@material-ui/core';

interface Props {
  title?: string;
}

export const DefaultToolbar: FC<Props> = ({ title = 'Timesheet' }): ReactElement => (
  <>
    <Typography variant="h6" style={{ flex: 1 }}>{title}</Typography>
  </>
);
