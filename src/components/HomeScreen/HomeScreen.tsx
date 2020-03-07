import React, { FC, ReactElement, useEffect } from 'react';
import { useThunkDispatch } from 'store';
import { setScreen } from 'features/appState/slice';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
}

export const HomeScreen: FC<Props> = (): ReactElement => {
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(setScreen('home'));
  }, []);

  return (
    <>Hello World</>
  );
};
