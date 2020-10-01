import React, { FC, ReactElement } from 'react';
import { useDateFormatter } from 'hooks/useDateFormatter';
import { useAppScreen } from 'hooks/useAppScreen';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
}

export const HomeScreen: FC<Props> = (): ReactElement => {
  useAppScreen('home');
  const { format } = useDateFormatter();

  return (
    <>Hello World, dzisiaj jest: {format(new Date(), 'EEEE, do LLLL yyyy')}</>
  );
};
