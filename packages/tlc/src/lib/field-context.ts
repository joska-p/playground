import { createContext, useContext } from 'react';

interface FieldContextValue {
    id: string;
}

const FieldContext = createContext<FieldContextValue | null>(null);

function useFieldContext(): FieldContextValue | null {
    return useContext(FieldContext);
}

export { FieldContext, useFieldContext };
