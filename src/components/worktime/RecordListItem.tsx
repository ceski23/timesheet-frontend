/* eslint-disable no-underscore-dangle */
import {
  ListItem, ListItemSecondaryAction, IconButton, styled,
  Typography,
} from '@material-ui/core';
import React, { FC, useMemo } from 'react';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import CalendarStart from '@material-ui/icons/EventAvailable';
import { useDateFormatter } from 'hooks/useDateFormatter';
import { Record } from 'api/records';
import { useTranslation } from 'react-i18next';
import { ColoredIcon } from 'components/shared/ColoredIcon';
import { getRecordData } from 'utils/records';
import { useAuth } from 'contexts/auth';
import ApprovedIcon from '@material-ui/icons/DoneOutlined';
import DisapprovedIcon from '@material-ui/icons/CloseOutlined';

// #region styles
const ScheduleDate = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  '& > svg': {
    fontSize: '1.2rem',
  },
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
  onApprove?: (id: string) => void;
  onDisapprove?: (id: string) => void;
}

export const RecordListItem: FC<Props> = ({
  data, onDelete, onClick, onApprove, onDisapprove,
}) => {
  const { format } = useDateFormatter();
  const { t } = useTranslation();
  const { color, icon } = useMemo(() => getRecordData(data.type), [data]);
  const { user } = useAuth();

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

        <ScheduleDate>
          <CalendarStart color="disabled" />
          <DateText>{format(new Date(data.dateFrom), 'dd MMMM yyyy')}</DateText>
        </ScheduleDate>
      </div>

      <ListItemSecondaryAction>
        {user?.role === 'admin' && data.approved && onDisapprove && (
          <IconButton
            title={t('ui:records.disapprove_button')}
            edge="end"
            aria-label="disapprove"
            onClick={() => onDisapprove(data._id)}
            disabled={isDisabled}
          >
            <DisapprovedIcon />
          </IconButton>
        )}

        {user?.role === 'admin' && !data.approved && onApprove && (
        <IconButton
          title={t('ui:records.approve_button')}
          edge="end"
          aria-label="approve"
          onClick={() => onApprove(data._id)}
          disabled={isDisabled}
        >
          <ApprovedIcon />
        </IconButton>
        )}

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
