import React, { Reducer, useEffect } from 'react';

export const createStore = <S, A>(
  reducer: Reducer<S, A>, initialState: S, persistenceKey?: string,
) => {
  const storeContext = React.createContext<S | undefined>(undefined);
  const dispatchContext = React.createContext<React.Dispatch<A> | undefined>(undefined);

  const getInitialState = () => {
    if (persistenceKey) {
      const localData = window.localStorage.getItem(persistenceKey);
      return localData ? JSON.parse(localData) : initialState;
    }
    return initialState;
  };

  const StoreProvider: React.FC = ({ children }) => {
    const [store, dispatch] = React.useReducer(reducer, getInitialState());

    useEffect(() => {
      if (persistenceKey) {
        window.localStorage.setItem(persistenceKey, JSON.stringify(store));
      }
    }, [store]);

    return (
      <dispatchContext.Provider value={dispatch}>
        <storeContext.Provider value={store}>
          {children}
        </storeContext.Provider>
      </dispatchContext.Provider>
    );
  };

  const useStore = () => {
    const context = React.useContext(storeContext);
    if (context === undefined) {
      throw new Error(`${useStore.name} must be used within a proper Provider`);
    }
    return context;
  };

  const useDispatch = () => {
    const context = React.useContext(dispatchContext);
    if (context === undefined) {
      throw new Error(`${useDispatch.name} must be used within a proper Provider`);
    }
    return context;
  };

  return [StoreProvider, useStore, useDispatch] as const;
};
