import {
  ListItem, ListItemIcon, ListItemText, Paper, Typography,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { useQuickMonthStats } from 'api/stats';
import { MonthTimesheetTiles } from 'components/home/MonthTimesheetTiles';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import React, { useState } from 'react';
import TimesheetIcon from '@material-ui/icons/DescriptionOutlined';
import { useTranslation } from 'react-i18next';
import { format, startOfDay } from 'date-fns';
import { timesheetPdf } from 'api/archive';
import fileDownload from 'js-file-download';
import Notificator from 'utils/Notificator';
import { useAuth } from 'contexts/auth';
import { useDateLocale } from 'hooks/useDateFormatter';

export const TimesheetsScreen = () => {
  const [month, setMonth] = useState(new Date());
  const quickMonthStats = useQuickMonthStats();
  const { t } = useTranslation();
  const { user } = useAuth();
  const locale = useDateLocale();

  const handleClick = async () => {
    try {
      const file = await timesheetPdf(startOfDay(month));
      const fileName = `${user?.name} ${format(month, 'LLLL yyyy', { locale })}`.replaceAll(' ', '_');
      fileDownload(file, `${fileName}.pdf`);
    } catch (error) {
      Notificator.error('Wystąpił błąd podczas pobierania karty');
    }
  };

  return (
    <ScreenWrapper title={t('ui:timesheets.title')}>
      <Paper style={{ margin: 16, padding: 16 }}>
        <DatePicker
          id="timesheets-month"
          label={t('form:fields.month')}
          margin="dense"
          autoOk
          required
          format="LLLL yyyy"
          inputVariant="outlined"
          autoFocus
          views={['year', 'month']}
          disableFuture
          value={month}
          onChange={date => setMonth(date ? new Date(date?.toISOString()) : new Date())}
        />
      </Paper>

      <Typography variant="h6" component="h2" style={{ margin: 16, marginBottom: 0 }}>
        {t('ui:timesheets.timesheet')}
      </Typography>
      <Paper style={{ margin: 16 }}>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <TimesheetIcon />
          </ListItemIcon>
          <ListItemText primary={t('ui:timesheets.download_timesheet')} secondary="PDF" />
        </ListItem>
      </Paper>

      {quickMonthStats.data && (
        <>
          <Typography variant="h6" component="h2" style={{ margin: 16, marginBottom: 0 }}>
            {t('ui:timesheets.stats')}
          </Typography>
          <MonthTimesheetTiles data={quickMonthStats.data} />
        </>
      )}
    </ScreenWrapper>
  );
};
