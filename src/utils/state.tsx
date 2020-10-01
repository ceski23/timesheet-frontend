import React, { useEffect } from 'react';

export const createState = <S extends object>(initialState: S, persistenceKey?: string) => {
  const stateContext = React.createContext<S | undefined>(undefined);
  const setStateContext = React.createContext<React.Dispatch<Partial<S>> | undefined>(undefined);

  const getInitialState = () => {
    if (persistenceKey) {
      const localData = window.localStorage.getItem(persistenceKey);
      return localData ? JSON.parse(localData) : initialState;
    }
    return initialState;
  };

  const StateProvider: React.FC = ({ children }) => {
    const [state, setState] = React.useState(getInitialState());

    const updateState = (delta: Partial<S>) => {
      setState({ ...state, ...delta });
    };

    useEffect(() => {
      if (persistenceKey) {
        window.localStorage.setItem(persistenceKey, JSON.stringify(state));
      }
    }, [state]);

    return (
      <setStateContext.Provider value={updateState}>
        <stateContext.Provider value={state}>
          {children}
        </stateContext.Provider>
      </setStateContext.Provider>
    );
  };

  const useState = () => {
    const context = React.useContext(stateContext);
    if (context === undefined) {
      throw new Error(`${useState.name} must be used within a proper Provider`);
    }
    return context;
  };

  const useSetState = () => {
    const context = React.useContext(setStateContext);
    if (context === undefined) {
      throw new Error(`${useSetState.name} must be used within a proper Provider`);
    }
    return context;
  };

  return [StateProvider, useState, useSetState] as const;
};
