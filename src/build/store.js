class Store {
    constructor(initialState) {
        this.listeners = [];
        this.state = initialState;
    }
    getState() {
        return this.state;
    }
    setState(newState) {
        this.state = newState;
        this.listeners.forEach((listener) => listener(this.state));
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }
}
export default Store;
