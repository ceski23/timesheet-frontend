import React, { FC, ReactElement, useEffect } from 'react';
import { Timesheet } from 'components/Timesheet/Timesheet';
import { isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { Event } from 'components/Timesheet/Content';
import { useAppScreen } from 'hooks/useAppScreen';
import { ScreenWrapper } from 'components/ScreenWrapper';
import { WorktimeToolbar } from './WorktimeToolbar';

export const WorktimeScreen: FC = (): ReactElement => {
  useAppScreen('worktime');
  // const dispatch = useThunkDispatch();
  // const { firstDay, numOfDays, lastDay } = useSelector(selectWorktimeState);

  useEffect(() => {
    // dispatch(nowDay());
  }, []);

  const events: Event[] = [
    {
      start: new Date(2020, 2, 10, 4, 45),
      end: new Date(2020, 2, 10, 6, 40),
      title: '#Koronaria',
      color: '#b52222',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lacinia lorem, in vestibulum nisl. Maecenas in imperdiet justo, vel dignissim risus. Nullam nulla ligula, pharetra at erat eget, viverra volutpat dui.',
    },
    {
      start: new Date(2020, 2, 10, 6, 40),
      end: new Date(2020, 2, 10, 10, 0),
      title: 'Pisanie pracy dyplomowej',
      color: '#c1b81c',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lacinia lorem, in vestibulum nisl. Maecenas in imperdiet justo, vel dignissim risus. Nullam nulla ligula, pharetra at erat eget, viverra volutpat dui.',
    },
    {
      start: new Date(2020, 2, 10, 10, 45),
      end: new Date(2020, 2, 10, 19, 0),
      title: 'Odpoczynek 🎧',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lacinia lorem, in vestibulum nisl. Maecenas in imperdiet justo, vel dignissim risus. Nullam nulla ligula, pharetra at erat eget, viverra volutpat dui.',
    },
  ];

  // const eventsTmpFilter = (event: Event) => (
  //   isWithinInterval(event.start, {
  //     start: startOfDay(firstDay),
  //     end: endOfDay(lastDay),
  //   })
  // );

  return (
    <ScreenWrapper toolbar={<WorktimeToolbar />}>
      {/* <Timesheet
        firstDate={firstDay}
        lastDate={lastDay}
        numOfDays={numOfDays}
        events={events.filter(eventsTmpFilter)}
      /> */}
    </ScreenWrapper>
  );
};
