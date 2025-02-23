import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React from 'react';

export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
