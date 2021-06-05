import { createContext } from 'react'

const AutosaveContext = createContext({ dispatch: () => {} });

export default AutosaveContext;
