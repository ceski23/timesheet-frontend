import React, { FC, ReactElement, useEffect } from 'react';
import { useThunkDispatch } from 'store';
import { setScreen } from 'features/appState/slice';
import { useDateFormatter } from 'hooks/useDateFormatter';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
}

export const HomeScreen: FC<Props> = (): ReactElement => {
  const dispatch = useThunkDispatch();
  const { format } = useDateFormatter();

  useEffect(() => {
    dispatch(setScreen('home'));
  }, []);

  return (
    <>Hello World, dzisiaj jest: {format(new Date(), 'EEEE, do LLLL yyyy')}</>
  );
};
