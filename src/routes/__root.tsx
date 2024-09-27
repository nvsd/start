import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

import type { PropsWithChildren } from "react";

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
    </Providers>
  ),
});

const queryClient = new QueryClient();
const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <TanStackRouterDevtools />
      <ReactQueryDevtools buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
};
