import React from 'react';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import { ArchiveEmployees } from './ArchiveEmployees';
import { ArchiveSchedules } from './ArchiveSchedules';
import { ArchiveRecords } from './ArchiveRecords';

export const ArchiveScreen = () => (
  <ScreenWrapper>
    <ArchiveEmployees />
    <ArchiveSchedules />
    <ArchiveRecords />
  </ScreenWrapper>
);
