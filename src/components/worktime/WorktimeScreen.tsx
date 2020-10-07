import React, { FC, ReactElement } from 'react';
import { Timesheet } from 'components/Timesheet/Timesheet';
import {
  startOfDay, parse,
} from 'date-fns';
import { useAppScreen } from 'hooks/useAppScreen';
import { ScreenWrapper } from 'components/layout/ScreenWrapper';
import { WorktimeToolbar } from './WorktimeToolbar';

const generateEvents = () => {
  const today = startOfDay(new Date());

  const data = [
    {
      start: parse('04:45', 'HH:mm', today),
      end: parse('06:40', 'HH:mm', today),
      title: '#Koronaria',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lacinia lorem, in vestibulum nisl. Maecenas in imperdiet justo, vel dignissim risus. Nullam nulla ligula, pharetra at erat eget, viverra volutpat dui.',
    },
    {
      start: parse('06:40', 'HH:mm', today),
      end: parse('10:00', 'HH:mm', today),
      title: 'Pisanie pracy dyplomowej',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lacinia lorem, in vestibulum nisl. Maecenas in imperdiet justo, vel dignissim risus. Nullam nulla ligula, pharetra at erat eget, viverra volutpat dui.',
    },
    {
      start: parse('10:45', 'HH:mm', today),
      end: parse('19:00', 'HH:mm', today),
      title: 'Odpoczynek 🎧',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lacinia lorem, in vestibulum nisl. Maecenas in imperdiet justo, vel dignissim risus. Nullam nulla ligula, pharetra at erat eget, viverra volutpat dui.',
    },
  ];

  return data;
};

export const WorktimeScreen: FC = (): ReactElement => {
  useAppScreen('worktime');

  return (
    <ScreenWrapper toolbar={<WorktimeToolbar />}>
      <Timesheet events={generateEvents()} />
    </ScreenWrapper>
  );
};
