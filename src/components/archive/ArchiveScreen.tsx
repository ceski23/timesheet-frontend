import React from 'react';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import { useTranslation } from 'react-i18next';
import { ArchiveEmployees } from './ArchiveEmployees';
import { ArchiveSchedules } from './ArchiveSchedules';
import { ArchiveRecords } from './ArchiveRecords';

export const ArchiveScreen = () => {
  const { t } = useTranslation();

  return (
    <ScreenWrapper title={t('ui:archive.title')}>
      <ArchiveEmployees />
      <ArchiveSchedules />
      <ArchiveRecords />
    </ScreenWrapper>
  );
};
