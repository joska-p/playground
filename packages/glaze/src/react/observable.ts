type Notify = () => void;
type Unsubscribe = () => void;

export function createObservable() {
    const listeners = new Set<Notify>();

    return {
        notify() {
            listeners.forEach((fn) => {
                fn();
            });
        },
        subscribe(fn: Notify): Unsubscribe {
            listeners.add(fn);
            return () => listeners.delete(fn);
        }
    };
}
