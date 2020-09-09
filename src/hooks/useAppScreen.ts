import { ScreenType } from 'store/appState/slice';
import { useEffect } from 'react';
import { useSetAppState } from 'contexts/appState';

export const useAppScreen = (screenName: ScreenType) => {
  const setAppState = useSetAppState();

  useEffect(() => {
    setAppState({ screen: screenName });
  }, []);
};
