import { isAuthenticated } from "@/lib/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: () => <div>Hello /login!</div>,
  async beforeLoad({ location }) {
    if (await isAuthenticated()) {
      throw redirect({
        to: "/",
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
