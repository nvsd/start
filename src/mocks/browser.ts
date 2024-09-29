import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { sessionHandlers } from "./handlers/session";

export const worker = setupWorker(...handlers, ...sessionHandlers);
