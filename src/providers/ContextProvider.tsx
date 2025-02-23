import type { PropsWithChildren } from 'react';
import React, { createContext, useContext, useMemo, useState } from 'react';

interface AppState {
    actions: {
      setCustomerEvents: (customerEvents: any) => void;
    };
    state: {
      customerEvents: any;
    };
  }
  
  const AppContext = createContext<AppState | undefined>(undefined);
  
  export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error('useAppContext must be used within an AppProvider');
    }
  
    return context;
  };

  export const AppContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [customerEvents, setCustomerEvents] = useState<any>(null);

    const appContextValue = useMemo(
      () => ({
        actions: { setCustomerEvents },
        state: { customerEvents },
      }),
      [customerEvents],
    );
  
    return <AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>;
  };
  
  