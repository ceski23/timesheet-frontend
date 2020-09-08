import { ScreenType, setScreen } from 'store/appState/slice';
import { useThunkDispatch } from 'store';
import { useEffect } from 'react';

export const useAppScreen = (screenName: ScreenType) => {
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(setScreen(screenName));
  }, []);
};
