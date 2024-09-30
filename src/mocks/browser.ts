import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { sessionHandlers } from "./handlers/session";
import { documentHandlers } from "./handlers/documents";

export const worker = setupWorker(
  ...handlers,
  ...sessionHandlers,
  ...documentHandlers
);
