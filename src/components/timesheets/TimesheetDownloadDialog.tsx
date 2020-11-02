/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ChangeEvent, FC, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  useTheme, useMediaQuery, styled, IconButton, TextField, Button,
} from '@material-ui/core';
import Notificator from 'utils/Notificator';
import {
  User, useUsers,
} from 'api/users';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import { ColoredIcon } from 'components/shared/ColoredIcon';
import { Autocomplete } from '@material-ui/lab';
import { useDebounce } from 'use-lodash-debounce';
import { DatePicker } from '@material-ui/pickers';
import { pdf } from 'api/archive';
import { startOfDay, format } from 'date-fns';
import fileDownload from 'js-file-download';
import { useDateLocale } from 'hooks/useDateFormatter';
import TimesheetIcon from '@material-ui/icons/DescriptionOutlined';

// #region styles
const StyledDialogContent = styled(DialogContent)({
  display: 'flex',
  flexDirection: 'column',
  '& > *': {
    marginBottom: 16,
  },
});

const DialogHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingRight: theme.spacing(3),
}));

const StyledIcon = styled(ColoredIcon)(({ theme }) => ({
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(-1),
}));

const StyledTitle = styled(DialogTitle)({
  flex: 1,
});
// #endregion

interface Props {
  isOpen: boolean;
  setClose: () => void;
}

export const TimesheetDownloadDialog: FC<Props> = ({
  isOpen, setClose,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const users = useUsers({ query: debouncedQuery });
  const [month, setMonth] = useState(new Date());
  const [error, setError] = useState('');
  const [selectedEmployee, setSelected] = useState<User>();
  const locale = useDateLocale();

  const handleQueryChange = (_event: ChangeEvent<{}>, value: string) => {
    setQuery(value);
  };

  const handleUserChange = (_event: ChangeEvent<{}>, user: User | null) => {
    setSelected(user || undefined);
    setError('');
  };

  const handleDownload = async () => {
    if (!selectedEmployee) setError(t('ui:archive.employees.required'));
    else {
      try {
        const file = await pdf(startOfDay(month));
        const fileName = `${selectedEmployee.name} ${format(month, 'LLLL yyyy', { locale })}`.replaceAll(' ', '_');
        fileDownload(file, `${fileName}.pdf`);
        setSelected(undefined);
        setClose();
      } catch (err) {
        Notificator.error(t('ui:notifications.failure.archive'));
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setClose()}
      aria-labelledby="download-timesheet-dialog"
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
    >
      <DialogHeader>
        <StyledIcon icon={TimesheetIcon} color={theme.palette.primary.main} />
        <StyledTitle>{t('ui:timesheets.timesheet')}</StyledTitle>
        <IconButton title={t('ui:navigation.close')} onClick={() => setClose()}><CloseIcon /></IconButton>
      </DialogHeader>

      <StyledDialogContent>
        <Autocomplete
          style={{ minWidth: 200, marginTop: 16 }}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={handleUserChange}
          onInputChange={handleQueryChange}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={option => option.name}
          options={users.resolvedData?.data || []}
          loading={users.isFetching}
          loadingText={t('ui:admin_worktime.loading')}
          noOptionsText={t('ui:admin_worktime.no_options')}
          renderInput={({ inputProps, ...params }) => (
            <TextField
              helperText={error}
              error={!!error}
              label={t('form:fields.employee')}
              inputProps={{
                ...inputProps,
                'aria-label': t('ui:admin_worktime.select_user'),
              }}
              {...params}
              variant="outlined"
            />
          )}
        />

        <DatePicker
          id="download-timesheets-month"
          label={t('form:fields.month')}
          autoOk
          required
          format="LLLL yyyy"
          inputVariant="outlined"
          autoFocus
          views={['year', 'month']}
          disableFuture
          value={month}
          onChange={date => setMonth(date ? new Date(date?.toISOString()) : new Date())}
          style={{ flex: 1 }}
        />

        <Button
          color="primary"
          variant="contained"
          style={{ flex: 1 }}
          onClick={handleDownload}
        >
          {t('ui:timesheets.download')}
        </Button>
      </StyledDialogContent>

      <DialogActions />

    </Dialog>
  );
};
