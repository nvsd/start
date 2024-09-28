import { Layout } from "@/features/layout/layout";
import { isAuthenticated } from "@/lib/auth";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component() {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  },
  async beforeLoad({ location }) {
    if (!(await isAuthenticated())) {
      throw redirect({
        to: "/login",
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
});
