import React, { useState, useEffect, useContext } from "react";
export const createStoreContext = () => {
    const Context = React.createContext(undefined);
    const StoreProvider = ({ store, children, }) => {
        const [state, setState] = useState(store.getState());
        useEffect(() => {
            const unsubscribe = store.subscribe(setState);
            return unsubscribe;
        }, [store]);
        return React.createElement(Context.Provider, { value: store }, children);
    };
    const useStore = () => {
        const context = useContext(Context);
        if (context === undefined) {
            throw new Error("useStore must be used within a StoreProvider");
        }
        return context;
    };
    return { StoreProvider, useStore };
};
