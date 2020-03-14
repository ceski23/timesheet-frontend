import React, { FC } from 'react';
import {
  Paper, IconButton, Typography, styled,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import { useDateFormatter } from 'hooks/useDateFormatter';
import { useAppTheme } from 'hooks/useAppTheme';
import { useTranslation } from 'react-i18next';
import { Event } from './Content';

interface Props {
  event: Event;
  close: () => void;
}

const Container = styled(Paper)({
  minWidth: 400,
  maxWidth: 500,
});

const Header = styled('div')({
  padding: 8,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
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
  flexDirection: 'row',
  alignItems: 'center',
});

const ColoredBox = styled('div')({
  width: 20,
  height: 20,
  marginRight: 16,
  borderRadius: '50%',
});

const CloseButton = styled(IconButton)({
  marginLeft: 24,
});

export const EventInfo: FC<Props> = ({ event, close }) => {
  const { format } = useDateFormatter();
  const theme = useAppTheme();
  const { t } = useTranslation();

  return (
    <Container>
      <Header>
        <IconButton title={t('worktime.event.edit')}>
          <EditIcon />
        </IconButton>
        <IconButton title={t('worktime.event.delete')}>
          <DeleteIcon />
        </IconButton>
        <CloseButton title={t('worktime.event.close')} onClick={close}>
          <CloseIcon />
        </CloseButton>
      </Header>

      <Content>
        <Details>
          <ColoredBox style={{ background: event.color ?? theme.palette.secondary.main }} />

          <Typography variant="h5">
            {event.title}
          </Typography>
        </Details>

        <Typography variant="subtitle1" style={{ marginLeft: 36 }}>
          {`${format(event.start, 'PPPP • p')} – ${format(event.end, 'p')}`}
        </Typography>

        <Description>
          {event.desc}
        </Description>
      </Content>
    </Container>
  );
};
