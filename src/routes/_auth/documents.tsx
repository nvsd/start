import { HoaDocumentDashboard } from "@/components/hoa-document-dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/documents")({
  component: () => <HoaDocumentDashboard />,
});
