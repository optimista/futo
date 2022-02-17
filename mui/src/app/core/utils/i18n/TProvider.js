import { createContext, useEffect, useState } from 'react'

const TContext = createContext();

const TProvider = props => <TContext.Provider {...props} />

export { TProvider as default, TContext };
