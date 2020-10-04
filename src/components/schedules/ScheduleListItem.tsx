import {
  ListItem, ListItemSecondaryAction, IconButton, styled,
  Typography,
} from '@material-ui/core';
import { Schedule } from 'api/schedules';
import React, { FC } from 'react';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import CalendarStart from '@material-ui/icons/EventAvailable';
import CalendarEnd from '@material-ui/icons/EventBusy';
import { useDateFormatter } from 'hooks/useDateFormatter';
import { DatePicker } from 'formik-material-ui-pickers';

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
// #endregion

interface Props {
  data: Schedule;
}

export const ScheduleListItem: FC<Props> = ({ data }) => {
  const { format } = useDateFormatter();
  return (
    <ListItem button>
      <div>
        <Name variant="h6">{data.name}</Name>
        <DatesContainer>
          <ScheduleDate>
            <CalendarStart color="disabled" />
            <DateText>{format(new Date(data.fromDate), 'dd MMMM yyyy')}</DateText>
          </ScheduleDate>

          <Divider>—</Divider>

          <ScheduleDate>
            <CalendarEnd color="disabled" />
            <DateText>{format(new Date(data.toDate), 'dd MMMM yyyy')}</DateText>
          </ScheduleDate>
        </DatesContainer>
      </div>

      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
