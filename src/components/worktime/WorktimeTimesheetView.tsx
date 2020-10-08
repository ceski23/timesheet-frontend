import { Record } from 'api/records';
import { Timesheet } from 'components/Timesheet/Timesheet';
import { DialogHook } from 'hooks/useDialog';
import React, { FC } from 'react';

interface Props {
  deleteDialog: DialogHook<Record>;
}

export const WorktimeTimesheetView: FC<Props> = ({ deleteDialog }) => (
  <Timesheet deleteDialog={deleteDialog} />
);
