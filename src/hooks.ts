import { useState, useEffect } from "react";
import Store from "./store";

export const useStoreState = <T>(store: Store<T>): T => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(setState);
    return unsubscribe;
  }, [store]);

  return state;
};

export const useStoreDispatch = <T>(
  store: Store<T>
): ((newState: T) => void) => {
  return store.setState.bind(store);
};
