import { useState, useEffect } from "react";
export const useStoreState = (store) => {
    const [state, setState] = useState(store.getState());
    useEffect(() => {
        const unsubscribe = store.subscribe(setState);
        return unsubscribe;
    }, [store]);
    return state;
};
export const useStoreDispatch = (store) => {
    return store.setState.bind(store);
};
