import { useCAStore } from './context.ts';

const useActions = () => {
  const store = useCAStore();
  return store.getState();
};

export { useActions };
