/* eslint-disable no-underscore-dangle */
import React, { FC, useMemo } from 'react';
import {
  Paper, IconButton, Typography, styled, Tooltip,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { useDateFormatter } from 'hooks/useDateFormatter';
import { useTranslation } from 'react-i18next';
import { Record } from 'api/records';
import { useTimesheetState } from 'contexts/timesheet';
import { getRecordData } from 'utils/records';
import { ColoredIcon } from 'components/shared/ColoredIcon';
import { useAuth } from 'contexts/auth';
import ApprovedIcon from '@material-ui/icons/DoneOutlined';
import DisapprovedIcon from '@material-ui/icons/CloseOutlined';

interface Props {
  event: Record;
  close: () => void;
  onApprove?: (id: string) => void;
  onDisapprove?: (id: string) => void;
}

// #region styles
const Container = styled(Paper)({
  minWidth: 400,
  maxWidth: 500,
});

const Header = styled('div')({
  padding: 8,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
});

const Content = styled('div')({
  padding: '0px 24px 24px',
  display: 'flex',
  flexDirection: 'column',
});

const Description = styled(Typography)({
  textAlign: 'justify',
  marginTop: 16,
  marginLeft: 0,
});

const Details = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const DetailsWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const ColoredBox = styled(ColoredIcon)({
  marginRight: 16,
  borderRadius: '50%',
});

const CloseButton = styled(IconButton)({
  marginLeft: 24,
});
// #endregion

export const EventInfo: FC<Props> = ({
  event, close, onApprove, onDisapprove,
}) => {
  const { format } = useDateFormatter();
  const { t } = useTranslation();
  const { deleteDialog, editDialog } = useTimesheetState();
  const { color, icon } = useMemo(() => getRecordData(event.type), [event]);
  const { user } = useAuth();

  const isDisabled = event.approved && user?.role === 'user';

  return (
    <Container>
      <Header>
        {event.approved && user?.role === 'user' && (
          <Tooltip title={isDisabled ? (t('ui:records.edit_disabled') as string) : ''} placement="left">
            <ApprovedIcon color="primary" style={{ marginRight: 16 }} />
          </Tooltip>
        )}

        {user?.role === 'admin' && event.approved && onDisapprove && (
        <IconButton
          title={t('ui:records.disapprove_button')}
          aria-label="disapprove"
          onClick={() => onDisapprove(event._id)}
          disabled={isDisabled}
        >
          <DisapprovedIcon />
        </IconButton>
        )}

        {user?.role === 'admin' && !event.approved && onApprove && (
        <IconButton
          title={t('ui:records.approve_button')}
          aria-label="approve"
          onClick={() => onApprove(event._id)}
          disabled={isDisabled}
        >
          <ApprovedIcon />
        </IconButton>
        )}

        <IconButton
          title={t('ui:tooltips.edit')}
          onClick={() => {
            // eslint-disable-next-line no-unused-expressions
            editDialog?.setOpen({
              dateFrom: new Date(event.dateFrom),
              dateTo: new Date(event.dateTo),
              type: event.type,
              details: event.details,
              id: event._id,
            });
            close();
          }}
          disabled={isDisabled}
        >
          <EditIcon />
        </IconButton>

        <IconButton
          title={t('ui:tooltips.delete')}
          onClick={() => {
            // eslint-disable-next-line no-unused-expressions
            deleteDialog?.setOpen(event);
            close();
          }}
          disabled={isDisabled}
        >
          <DeleteIcon />
        </IconButton>

        <CloseButton title={t('ui:tooltips.close')} onClick={close}>
          <CloseIcon />
        </CloseButton>
      </Header>

      <Content>
        <DetailsWrapper>
          <ColoredBox color={color} icon={icon} />
          <Details>

            <Typography variant="h5">
              {t(`ui:records.type.${event.type}`)}
            </Typography>

            <Typography variant="subtitle1">
              {`${format(new Date(event.dateFrom), 'PPPP • p')} – ${format(new Date(event.dateTo), 'p')}`}
            </Typography>
          </Details>
        </DetailsWrapper>

        <Description>
          {event.details}
        </Description>
      </Content>
    </Container>
  );
};
