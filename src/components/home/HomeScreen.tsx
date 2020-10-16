import React, { FC, ReactElement, useMemo } from 'react';
import { useAppScreen } from 'hooks/useAppScreen';
import {
  AddRecordParams, RECORD_TYPES, useAddRecord, useRecords,
} from 'api/records';
import {
  addHours, differenceInHours, endOfDay, endOfMonth, set, startOfDay,
  startOfMonth,
} from 'date-fns';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import { useTranslation } from 'react-i18next';
import { Paper, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addRecordSchema } from 'components/worktime/add/schema';
import { formErrorHandler } from 'utils/errorHandlers';
import Notificator from 'utils/Notificator';
import { QuickAddRecordForm } from './QuickAddRecordForm';
import { MonthTimesheetTiles } from './MonthTimesheetTiles';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
}

export const HomeScreen: FC<Props> = (): ReactElement => {
  useAppScreen('home');
  const { t } = useTranslation();
  // const theme = useTheme();
  // const locale = useDateLocale();

  const records = useRecords({
    dateFrom: startOfMonth(startOfDay(new Date())),
    dateTo: endOfMonth(endOfDay(new Date())),
  });

  const data = useMemo(() => RECORD_TYPES.map(type => {
    const value = (records.data || [])
      .filter(record => record.type === type)
      .map(record => {
        const x = differenceInHours(new Date(record.dateTo), new Date(record.dateFrom));
        return x;
      })
      .reduce((a, b) => a + b, 0);

    return ({ name: t(`ui:records.type.${type}`), type, value });
  }), [records.data]);

  const [addRecord] = useAddRecord();

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
            default: return t('ui:notifications.failure.add_record');
          }
        });
      },
    });
  };

  // const renderTooltip = ({ label, payload, active }: TooltipProps) => (active ? (
  //   <Paper style={{ padding: 16 }}>
  //     <Typography variant="caption">{label}</Typography>
  //     <Typography variant="subtitle1" color="primary">
  // eslint-disable-next-line max-len
  //       {formatDuration({ hours: Number.parseInt(`${payload && payload[0].value}`, 10) }, { locale })}
  //     </Typography>
  //   </Paper>
  // ) : null);

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

      <MonthTimesheetTiles data={data} />

      {/* <Paper style={{ display: 'grid', margin: 16, paddingBottom: 16 }}>
        <Typography
          variant="h6"
          style={{ margin: 24 }}
          component="h2"
        >Czas pracy w tym tygodniu
        </Typography>
        <Divider style={{ marginBottom: 32 }} />
        <ResponsiveContainer height={500} width="98%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis unit="h" />
            <Tooltip content={renderTooltip} isAnimationActive={false} cursor={false} />
            <Bar dataKey="value" fill={theme.palette.primary.main} />
          </BarChart>
        </ResponsiveContainer>
      </Paper> */}
    </ScreenWrapper>
  );
};
