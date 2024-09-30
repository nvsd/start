import { delay, http, HttpResponse } from "msw";
import { HOADocument } from "@/api/documents";

const success: HOADocument[] = [
  {
    id: "1",
    name: "HOA Bylaws.docx",
    type: "Document",
    status: "Approved",
    uploadDate: "2023-09-15",
    size: "2.5 MB",
    uploader: "Board Secretary",
  },
  {
    id: "2",
    name: "Community Map.png",
    type: "Image",
    status: "Approved",
    uploadDate: "2023-09-14",
    size: "1.2 MB",
    uploader: "Facilities Manager",
  },
  {
    id: "3",
    name: "Annual Budget.xlsx",
    type: "Spreadsheet",
    status: "Approved",
    uploadDate: "2023-09-13",
    size: "3.7 MB",
    uploader: "Treasurer",
  },
  {
    id: "4",
    name: "Maintenance Schedule.pdf",
    type: "PDF",
    status: "Approved",
    uploadDate: "2023-09-12",
    size: "5.1 MB",
    uploader: "Maintenance Supervisor",
  },
  {
    id: "5",
    name: "Meeting Minutes.docx",
    type: "Document",
    status: "Pending Approval",
    uploadDate: "2023-09-11",
    size: "1.8 MB",
    uploader: "Board Secretary",
  },
];

export type HOADocumentResponseBody = HOADocument[];

export const documentHandlers = [
  http.get<never, never, HOADocumentResponseBody, "/documents">(
    "/documents",
    async () => {
      await delay();
      return HttpResponse.json(success);
    }
  ),
];
