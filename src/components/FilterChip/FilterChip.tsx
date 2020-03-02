import React, { FC, ReactElement } from 'react';
import { Chip } from '@material-ui/core';

interface FilterProps {
  enabled?: boolean;
  label: string;
  handleClick: () => void;
  icon: ReactElement;
}

export const FilterChip: FC<FilterProps> = ({
  enabled, handleClick, label, icon,
}): ReactElement => (
  <Chip
    color={enabled ? 'primary' : 'default'}
    icon={icon}
    label={label}
    onClick={handleClick}
    variant="outlined"
  />
);
