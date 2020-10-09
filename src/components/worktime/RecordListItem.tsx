import {
  ListItem, ListItemSecondaryAction, IconButton, styled,
  Typography,
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

const Divider = styled('div')({
  marginLeft: 16,
  marginRight: 16,
});

const DateText = styled('p')({
  marginTop: 8,
  marginBottom: 8,
  marginLeft: 8,
  fontSize: '0.8rem',
});

const Name = styled(Typography)({
  fontSize: '1.1rem',
});

const StyledIcon = styled(ColoredIcon)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));
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

  const isDisabled = data.approved && user?.role === 'user';

  return (
    <ListItem button onClick={onClick} disabled={isDisabled}>
      <StyledIcon color={color} icon={icon} />

      <div>
        <Name variant="h6">{t(`ui:records.type.${data.type}`)}</Name>

        {data.details && (
        <Typography variant="body2" style={{ marginBottom: 8 }}>{data.details}</Typography>
        )}

        <DatesContainer>
          <ScheduleDate>
            <CalendarStart color="disabled" />
            <DateText>{format(new Date(data.dateFrom), 'dd MMMM yyyy')}</DateText>
          </ScheduleDate>

          <Divider>—</Divider>

          <ScheduleDate>
            <CalendarEnd color="disabled" />
            <DateText>{format(new Date(data.dateTo), 'dd MMMM yyyy')}</DateText>
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
