import {
  ListItem, ListItemSecondaryAction, IconButton, styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { FC, useMemo } from 'react';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import CalendarStart from '@material-ui/icons/EventAvailable';
import CalendarEnd from '@material-ui/icons/EventBusy';
import { useDateFormatter } from 'hooks/useDateFormatter';
import { Record } from 'api/records';
import { useTranslation } from 'react-i18next';
import { ColoredIcon } from 'components/shared/ColoredIcon';
import { getRecordData } from 'utils/records';
import { useAuth } from 'contexts/auth';

// #region styles
const DatesContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  color: theme.palette.text.secondary,
}));

const ScheduleDate = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  '& > svg': {
    fontSize: '1.2rem',
  },
});

const Divider = styled('div')(({ theme }) => ({
  marginLeft: 16,
  marginRight: 16,
  [theme.breakpoints.down('xs')]: {
    marginLeft: 8,
    marginRight: 8,
  },
}));

const DateText = styled('p')(({ theme }) => ({
  marginTop: 8,
  marginBottom: 8,
  marginLeft: 8,
  fontSize: '0.8rem',
  [theme.breakpoints.down('xs')]: {
    marginLeft: 0,
  },
}));

const Name = styled(Typography)({
  fontSize: '1.1rem',
});

const StyledIcon = styled(ColoredIcon)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const CalendarIcon = styled(CalendarStart)({
  marginRight: 8,
});
// #endregion

interface Props {
  data: Record;
  onDelete: () => void;
  onClick: () => void;
}

export const RecordListItem: FC<Props> = ({ data, onDelete, onClick }) => {
  const { format } = useDateFormatter();
  const { t } = useTranslation();
  const { color, icon } = useMemo(() => getRecordData(data), [data]);
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

  const isDisabled = data.approved && user?.role === 'user';

  return (
    <ListItem
      button
      onClick={onClick}
      disabled={isDisabled}
      title={isDisabled ? (t('ui:records.edit_disabled') as string) : ''}
    >
      <StyledIcon color={color} icon={icon} />

      <div>
        <Name variant="h6">{t(`ui:records.type.${data.type}`)}</Name>

        {data.details && (
        <Typography variant="body2" style={{ marginBottom: 8 }}>{data.details}</Typography>
        )}

        <DatesContainer>
          {isMobile && <CalendarIcon color="disabled" />}

          <ScheduleDate>
            {isMobile ? (
              <DateText>{format(new Date(data.dateFrom), 'dd.MM.yyyy')}</DateText>
            ) : (
              <>
                <CalendarStart color="disabled" />
                <DateText>{format(new Date(data.dateFrom), 'dd MMMM yyyy')}</DateText>
              </>
            )}
          </ScheduleDate>

          <Divider>—</Divider>

          <ScheduleDate>
            {isMobile ? (
              <DateText>{format(new Date(data.dateTo), 'dd.MM.yyyy')}</DateText>
            ) : (
              <>
                <CalendarEnd color="disabled" />
                <DateText>{format(new Date(data.dateTo), 'dd MMMM yyyy')}</DateText>
              </>
            )}
          </ScheduleDate>
        </DatesContainer>
      </div>

      <ListItemSecondaryAction>
        <IconButton
          title={t('ui:tooltips.delete')}
          edge="end"
          aria-label="delete"
          onClick={() => onDelete()}
          disabled={isDisabled}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
