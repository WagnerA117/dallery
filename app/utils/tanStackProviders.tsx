"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

function TanStackProviders({ children }: React.PropsWithChildren) {
  //Don't need to update state, remember to USEMMEMEMOMSMSO
  const client = React.useMemo(
    () => new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } }),
    []
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      {/*<ReactQueryDevtools initialIsOpen={false} />*/}
    </QueryClientProvider>
  );
}

export default TanStackProviders;
