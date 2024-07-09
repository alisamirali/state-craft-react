import React, { ReactNode, useState, useEffect, useContext } from "react";
import Store from "./store";

interface StoreProviderProps<T> {
  store: Store<T>;
  children: ReactNode;
}

export const createStoreContext = <T,>() => {
  const Context = React.createContext<Store<T> | undefined>(undefined);

  const StoreProvider: React.FC<StoreProviderProps<T>> = ({
    store,
    children,
  }) => {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
      const unsubscribe = store.subscribe(setState);
      return unsubscribe;
    }, [store]);

    return <Context.Provider value={store}>{children}</Context.Provider>;
  };

  const useStore = (): Store<T> => {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error("useStore must be used within a StoreProvider");
    }
    return context;
  };

  return { StoreProvider, useStore };
};
