import React, { FC, ReactElement, useState } from 'react';
import { useAppScreen } from 'hooks/useAppScreen';
import { AddRecordParams, useAddRecord } from 'api/records';
import { addHours, set } from 'date-fns';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import { useTranslation } from 'react-i18next';
import { Paper, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addRecordSchema } from 'components/worktime/add/schema';
import { formErrorHandler } from 'utils/errorHandlers';
import Notificator from 'utils/Notificator';
import { useQuickMonthStats } from 'api/stats';
import { useAuth } from 'contexts/auth';
import { QuickAddRecordForm } from './QuickAddRecordForm';
import { MonthTimesheetTiles } from './MonthTimesheetTiles';

export const HomeScreen: FC = (): ReactElement => {
  useAppScreen('home');
  const { t } = useTranslation();
  const [month] = useState(new Date());
  const quickMonthStats = useQuickMonthStats({ month, onlyApproved: false });
  const [addRecord] = useAddRecord();
  const { user } = useAuth();

  const addRecordForm = useForm<AddRecordParams>({
    defaultValues: {
      dateFrom: set(new Date(), { seconds: 0, milliseconds: 0 }),
      dateTo: addHours(set(new Date(), { seconds: 0, milliseconds: 0 }), 1),
      details: '',
      type: 'normal',
    },
    resolver: yupResolver(addRecordSchema),
  });

  const handleSubmit = async (values: AddRecordParams) => {
    await addRecord(values, {
      onSuccess: () => {
        Notificator.success(t('ui:notifications.success.record_added'));
        addRecordForm.reset();
      },
      onError: error => {
        formErrorHandler(error, addRecordForm.setError, e => {
          switch (e) {
            case 'Dates should not overlap': return t('ui:notifications.failure.records_overlap');
            case 'Must not be day off': return t('ui:notifications.failure.records_dayoff');
            default: return t('ui:notifications.failure.add_record');
          }
        });
      },
    });
  };

  return (
    <ScreenWrapper>
      <Paper style={{ display: 'grid', margin: 16, padding: 16 }}>
        <Typography
          variant="h6"
          style={{ marginBottom: 16 }}
          component="h2"
        >{t('ui:dashboard.quick_records_title')}
        </Typography>
        <QuickAddRecordForm form={addRecordForm} onSubmit={handleSubmit} />
      </Paper>

      {user && user.role === 'user' && (
        <Paper style={{ display: 'grid', margin: 16, padding: 16 }}>
          <Typography style={{ }}>
            {t('ui:home.your_norm')}
            <b>{t('ui:extra.hours', { count: user.norm })}</b>
          </Typography>
        </Paper>
      )}

      {quickMonthStats.data && (
        <>
          <Typography variant="h6" component="h2" style={{ margin: 16, marginBottom: 0 }} color="textPrimary">
            {t('ui:quickMonthStats.title')}
          </Typography>
          <MonthTimesheetTiles data={quickMonthStats.data} />
        </>
      )}
    </ScreenWrapper>
  );
};
