import { createContext, useContext, useState } from 'react';

const AppContext = createContext(undefined)

export function AppStateProvider({ children }) {
  const [appstate, setAppState] = useState({})
  return (
    <AppContext.Provider
      value={{
        appstate,
        setAppState,
      }}
    >
    {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext)
  if(!context) 
    throw new Error('useAppState must be used inside AppStateProvider')

  return context
}