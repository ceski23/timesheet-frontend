import { Typography, Paper, styled } from '@material-ui/core';
import { RecordType } from 'api/records';
import { ColoredIcon } from 'components/shared/ColoredIcon';
import { formatDuration } from 'date-fns';
import { useDateLocale } from 'hooks/useDateFormatter';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { getRecordData } from 'utils/records';

// #region styles
const TilesContainer = styled('div')(({ theme }) => ({
  margin: 16,
  display: 'grid',
  gap: '16px',
  gridTemplateColumns: 'repeat(4, auto)',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(3, auto)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, auto)',
  },
  [theme.breakpoints.down('xs')]: {
    gridTemplateColumns: 'repeat(1, auto)',
  },
}));

const Tile = styled(Paper)({
  padding: 16,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});

const Details = styled('div')({
  flex: 1,
});
// #endregion

interface Props {
  data: Array<{
    type: RecordType;
    value: number;
  }>;
}

export const MonthTimesheetTiles: FC<Props> = ({ data }) => {
  const locale = useDateLocale();
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h6" component="h2" style={{ margin: 16, marginBottom: 0 }}>
        Ewidencja w tym miesiącu
      </Typography>

      <TilesContainer>
        {data.map(({ type, value }) => {
          const { color, icon } = getRecordData(type);

          return (
            <Tile>
              <Details>
                <Typography variant="overline" component="h2">
                  {t(`ui:records.type.${type}`)}
                </Typography>
                <Typography variant="h5" component="p">
                  {value === 1 && `${value} `}
                  {formatDuration({ hours: value }, { locale, zero: true })}
                </Typography>
              </Details>

              <ColoredIcon icon={icon} color={color} />
            </Tile>
          );
        })}
      </TilesContainer>
    </>
  );
};
