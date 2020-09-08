import React, { FC } from 'react';
import { ScreenType } from 'store/appState/slice';
import { EmployeesToolbar } from 'components/employees/EmployeesToolbar';
import { DefaultToolbar } from 'components/DefaultToolbar';
import { WorktimeToolbar } from 'components/WorktimeScreen/WorktimeToolbar';
import { useTranslation } from 'react-i18next';

interface Props {
  screenId: ScreenType;
}

export const ToolbarRenderer: FC<Props> = ({ screenId }) => {
  const { t } = useTranslation();

  switch (screenId) {
    case 'employees':
      return <EmployeesToolbar />;

    case 'notfound':
      return <DefaultToolbar title={t('notfound.title')} />;

    case 'worktime':
      return <WorktimeToolbar />;

    default:
      return <DefaultToolbar title="Timesheet" />;
  }
};
