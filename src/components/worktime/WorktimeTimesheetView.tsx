import { Record, UpdateRecordParams } from 'api/records';
import { Timesheet } from 'components/Timesheet/Timesheet';
import { DialogHook } from 'hooks/useDialog';
import React, { FC } from 'react';

interface Props {
  deleteDialog: DialogHook<Record>;
  editDialog: DialogHook<UpdateRecordParams>;
}

export const WorktimeTimesheetView: FC<Props> = ({ deleteDialog, editDialog }) => (
  <Timesheet deleteDialog={deleteDialog} editDialog={editDialog} />
);
