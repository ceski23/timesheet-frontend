import { useEffect } from 'react';
import { ScreenType, useSetAppState } from 'contexts/appState';

export const useAppScreen = (screenName: ScreenType) => {
  const setAppState = useSetAppState();

  useEffect(() => {
    setAppState({ screen: screenName });
  }, []);
};
