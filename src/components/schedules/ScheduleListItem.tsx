import {
  ListItem, ListItemSecondaryAction, IconButton, styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Schedule } from 'api/schedules';
import React, { FC } from 'react';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import CalendarStart from '@material-ui/icons/EventAvailable';
import CalendarEnd from '@material-ui/icons/EventBusy';
import { useDateFormatter } from 'hooks/useDateFormatter';

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

const CalendarIcon = styled(CalendarStart)({
  marginRight: 8,
});
// #endregion

interface Props {
  data: Schedule;
  onDelete: () => void;
}

export const ScheduleListItem: FC<Props> = ({ data, onDelete }) => {
  const { format } = useDateFormatter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <ListItem button>
      <div>
        <Name variant="h6">{data.name}</Name>
        <DatesContainer>
          {isMobile && <CalendarIcon color="disabled" />}

          <ScheduleDate>
            {isMobile ? (
              <DateText>{format(new Date(data.fromDate), 'dd.MM.yyyy')}</DateText>
            ) : (
              <>
                <CalendarStart color="disabled" />
                <DateText>{format(new Date(data.fromDate), 'dd MMMM yyyy')}</DateText>
              </>
            )}
          </ScheduleDate>

          <Divider>—</Divider>

          <ScheduleDate>
            {isMobile ? (
              <DateText>{format(new Date(data.toDate), 'dd.MM.yyyy')}</DateText>
            ) : (
              <>
                <CalendarEnd color="disabled" />
                <DateText>{format(new Date(data.toDate), 'dd MMMM yyyy')}</DateText>
              </>
            )}
          </ScheduleDate>
        </DatesContainer>
      </div>

      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => onDelete()}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
